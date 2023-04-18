const API_URL = "https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/";
/**
 * Класс карточки товара
 * @constructor
 */
class GoodsItem {
    /**
     * @param {String} title 
     * @param {Number} price 
     */
    constructor(title, price) {
        this.title = title;
        this.price = price;
    }
    /**
     * Создает карточку товара
     * @returns {String} элемент DOM дерева, содержащий карточку товара
     */
    render() {
        return `<div class="goods-item"><h3>${this.title}</h3><p>${this.price}</p></div>`
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
     * Добавляет товар
     * @param good товар
     */

    add(good) {
        fetch(`${API_URL}addToBasket.json`)
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

    }

    /**
     * Удаляет товар
     * @param id идентификатор товара
     */
    remove(id) {


        fetch(`${API_URL}deleteFromBasket.json`)
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
    }

    render() {

    }
}


class Cart extends List {
    constructor() {
        //вызывает метод родителя
        super()
    }

    load() {
        fetch()
            .then((request) => {
                return request.json()
            })
            .then((data) => {
                super.load(data)
            })


    }

    getPrice() {
        let acc = 0;

        for (let good of this.list) {
            acc += good.price;
        }

        return acc;
    }

    render() {

    }


}

class GoodsList extends List {
    constructor() {
        //вызывает метод родителя
        super()
        this.goods = [];
    }

    /**
     * Получает список товаров
     */
    fetchGoods() {
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
    }

    filter() {

    }

    /**
     * Создает список товаров
     */
    render() {
        let listHtml = '';
        this.goods.forEach(good => {
            const goodItem = new GoodsItem(good.title, good.price);
            listHtml += goodItem.render();
        });
        document.querySelector('.goods-list').innerHTML = listHtml;
    }
}



const list = new GoodsList();
list.fetchGoods();
list.render();