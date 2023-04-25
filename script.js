const API_URL = "https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/";

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
            fetch(`${API_URL}addToBasket.json`)
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

        onSearch() {
            const reg = new RegExp(this.searchLine, 'i')
            this.filtered = this.goods.filter((good) => reg.test(good.product_name))
        },
        onToggleCart() {
            this.isVisibleCart = !this.isVisibleCart;
        }
    },

    mounted() {
        fetch(`${API_URL}catalogData.json`)
            .then((res) => {
                return res.json();
            })
            .then((req) => {
                this.goods = req.map(good => ({
                    title: good.product_name,
                    price: good.price
                }))
                this.render();
            })
            .catch((err) => {
                console.log(err);
            })
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
// // list.fetchGoods();
// // list.render();



// // форма обратной связи из ДЗ Урок 4 Регулярные выражения 
const form = document.querySelector('#feedback-form');
const nameInput = form.querySelector('#name');
const phoneInput = form.querySelector('#phone');
const emailInput = form.querySelector('#email');

// Функция для проверки имени
function validateName() {
    const regex = /^[a-zA-Zа-яА-ЯёЁ]+$/;
    if (!regex.test(nameInput.value)) {
        nameInput.classList.add('invalid');
        return false;
    } else {
        nameInput.classList.remove('invalid');
        return true;
    }
}

// Функция для проверки телефона
function validatePhone() {
    const regex = /^\+7\(\d{3}\)\d{3}-\d{4}$/;
    if (!regex.test(phoneInput.value)) {
        phoneInput.classList.add('invalid');
        return false;
    } else {
        phoneInput.classList.remove('invalid');
        return true;
    }
}

// Функция для проверки e-mail
function validateEmail() {
    const regex = /^[\w.-]+@[\w.-]+\.[a-zA-Z]{2,}$/;
    if (!regex.test(emailInput.value)) {
        emailInput.classList.add('invalid');
        return false;
    } else {
        emailInput.classList.remove('invalid');
        return true;
    }
}

// Обработчик отправки формы
form.addEventListener('submit', (event) => {
    event.preventDefault(); // Отменяем стандартное поведение формы

    // Проверяем все поля на валидность
    const isNameValid = validateName();
    const isPhoneValid = validatePhone();
    const isEmailValid = validateEmail();

    // Если все поля валидны, отправляем форму
    if (isNameValid && isPhoneValid && isEmailValid) {
        const formData = new FormData(form);
        fetch(form.action, {
            method: form.method,
            body: formData
        }).then(response => {
            alert('Форма отправлена');
            form.reset();
        }).catch(error => {
            alert('Произошла ошибка при отправке формы.');
        });
    } else {
        alert('Пожалуйста, заполните форму корректно.');
    }
});

// Обработчики изменения полей для удаления класса invalid
nameInput.addEventListener('input', () => {
    nameInput.classList.remove('invalid');
});

phoneInput.addEventListener('input', () => {
    phoneInput.classList.remove('invalid');
});

emailInput.addEventListener('input', () => {
    emailInput.classList.remove('invalid');
});