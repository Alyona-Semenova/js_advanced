const API_URL = "https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/";

Vue.component('goods-list', {
    props: ['goods'],
    template: `<div class="goods-list">
    <template v-if="this.goods">
        <div class="goods-item" v-for="good in goods" :key="good.id_product">
            <h3 @click="addToCart(good)">{{ good.product_name }}</h3>
            <p>{{ good.price }}</p>
        </div>
    </template>
    <template v-else> Список пуст</template>

</div>`,
    data() {
        return {

        }
    }
});

Vue.component('goods-item', {
    props: ['good'],
    template: `
      <div class="goods-item">
        <h3>{{ good.product_name }}</h3>
        <p>{{ good.price }}</p>
      </div>
    `,
    data() {
        return {

        }
    }
});

Vue.component('cart', {
    props: ["isVisibleCart"],
    template: `
    <div class="modal" v-if="isVisibleCart">
    <span class="close" @click="onToggleCart">x</span>
</div>
    `,
    data() {
        return {

        }
    },

    methods: {
        onToggleCart() {
            this.$emit("on-toggle-cart");
        },
    },
});


Vue.component('search', {
    template: `
    <div>
    <input type="text" class="goods-search" v-model="searchLine">
    <button class="search button" type="button" @click="onSearch">Искать</button>
    </div> `,
    data() {
        return {
            searchLine: '',
        }
    },
    methods: {
        onSearch() {
            this.$emit("on-search", this.searchLine);
        }
    }
});


const app = new Vue({
    el: '#app',
    data: {
        goods: [],
        filteredGoods: [],
        cart: [],
        searchLine: '',
        isVisibleCart: false,

    },

    methods: {
        loadGoods() {
            fetch(`${API_URL}catalogData.json`)
                .then((req) => req.json())
                .then((data) => {
                    this.goods = data;
                    this.filteredGoods = data;
                })
                .catch((err) => {
                    console.log(err);
                })
        },
        loadCart() {
            fetch(`${API_URL}getBasket.json`)
                .then((req) => req.json())
                .then((data) => {
                    this.cart = data.contents;
                })
        },
        addToCart() {
            fetch(`${API_URL}addToBasket.json`, {
                    method: 'POST',
                    body: JSON.stringify(good)
                })
                .then(() => {
                    this.cart.push(good);
                })
        },
        removeFromCart() {
            fetch(`${API_URL}deleteFromBasket.json`)
                .then(() => {
                    const index = this.cart.findIndex((item) => item.id_product == good.id_product)
                    this.cart.splice(index - 1, 1)
                })
        },

        onSearch(searchLine) {
            if (searchLine === '') {
                this.filteredGoods = this.goods;
            } else {
                this.filteredGoods = this.goods.filter((good) => good.product_name == searchLine);
            }

        },
        onToggleCart() {
            this.isVisibleCart = !this.isVisibleCart;
        },
        render() {
            let listHtml = '';
            this.goods.forEach(good => {
                const goodItem = new GoodsItem(good.title, good.price, good.id);
                listHtml += goodItem.render();
            });
            this._el.innerHTML = listHtml;
        }
    },

    mounted() {
        this.loadGoods();
        this.loadCart();
    },

});



/**
 * Класс карточки товара
 * @constructor
 */
class GoodsItem {
    /**
     * @param {String} title 
     * @param {Number} price 
     */
    constructor(title, price, id) {
        this.title = title;
        this.price = price;
        this.id = id;
    }
    /**
     * Создает карточку товара
     * @returns {String} элемент DOM дерева, содержащий карточку товара
     */
    render() {
        return `<div data-id="${this.id}" class="goods-item"><h3>${this.title}</h3><p>${this.price}</p></div>`
    }
}

//прототип для построения объектов, самостоятельно не используется

class List {
    constructor() {
        this.list = [];
    }

    load(list) {
        this.list = list;
    }

    /**
     * Удаляет товар
     * @param id идентификатор товара
     */
    remove(id) {

    }

    render() {

    }
}


class Cart extends List {
    constructor() {
        //вызывает метод родителя
        super()
        this._list = [];
        this._btn = document.querySelector('.cart-button');
        this._el = document.querySelector('.cart');
        this._btn.addEventListener('click', this._onToggleCart.bind(this));
        this._el.addEventListener('click', this._onClick.bind(this));
    };

    add(good) {
        this._list.push(good);
        console.log(good)
        this.render();
    };

    load() {
        fetch(`${API_URL}getBasket.json`)
            .then((response) => {
                return response.json()
            })
            .then((goods) => {
                this._list = goods.contents.map(good => ({
                    title: product_name,
                    price: good.price,
                    id: good.id_product
                }));
                this.render();
            })
    };

    _onClick(e) {
        const id = e.target.getAttribute('data-id');

        fetch(`${API_URL}deleteFromBasket.json`)
            .then(() => {
                const index = this._list.findIndex((good) => good.id == id);
                this._list.splice(index, 1);
                this.render()
            });
    };


    getPrice() {
        let acc = 0;

        for (let good of this.list) {
            acc += good.price;
        }

        return acc;
    }


}

class GoodsList extends List {
    constructor(cart) {
        //вызывает метод родителя
        super()
        this.goods = [];
        this.filtered = [];
        this._cart = cart;
        this._el = document.querySelector('.goods-list');
        this._el.addEventListener("click", this.addToCart(e).bind(this));
    }

    filter(searchString) {
        searchString = searchString.trim();

        if (searchString.length === 0) {
            this.filtered = this.goods;
            this.render();
            return
        }

        const reg = new RegExp(searchString, 'i');
        this.filtered = this.goods.filter((good) => reg.test(good.title));
        this.render();
    }


    /**
     * Получает список товаров
     */
    fetchGoods() {
        fetch(`${API_URL}catalogData.json`)
            .then((req) => req.json())
            .then((data) => {
                this.goods = data;
                this.filteredGoods = data;
            })
            .catch((err) => {
                console.log(err);
            })
    }

    _onClick(e) {
        const id = e.target.getAttribute('data-id');
        if (id) {
            fetch(`${API_URL}addToBasket.json`)
                .then(() => {
                    console.log(id, this.goods);
                    this._cart.add(this.goods.find((good) => good.id == id));
                })
        }
    }



    /**
     * Создает список товаров
     */
    render() {
        let listHtml = '';
        this.goods.forEach(good => {
            const goodItem = new GoodsItem(good.title, good.price, good.id);
            listHtml += goodItem.render();
        });
        this._el.innerHTML = listHtml;
        // document.querySelector('.goods-list').innerHTML = listHtml;
    }
}


const cart = new Cart();
const list = new GoodsList();