// const goods = [{
//         title: "Shirt",
//         price: 150,
//     },
//     {
//         title: "Socks",
//         price: 50,
//     },
//     {
//         title: "Jacket",
//         price: 350,
//     },
//     {
//         title: "Shoes",
//         price: 250,
//     },
// ];

// const $goodsList = document.querySelector('.goods-list');

// const renderGoodsItem = ({
//     title,
//     price
// }) => {
//     return `<div class="goods-item"><h3>${title}</h3><p>${price}</p></div>`;
// };

// const renderGoodsList = (list = goods) => {
//     let goodsList = list.map(
//         (item) => {
//             return renderGoodsItem(item);
//         }
//     ).join('');

//     $goodsList.insertAdjacentHTML('beforeend', goodsList);

// }
// renderGoodsList();

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


/**
 * Класс корзины товаров / списка товаров
 * @constructor
 */
class GoodsList {
    constructor() {
        this.goods = [];
    }

    /**
     * Получает список товаров
     */
    fetchGoods() {
        this.goods = [{
                title: 'Short',
                price: 150
            },
            {
                title: 'Socks',
                price: 50
            },
            {
                title: 'Jacked',
                price: 350
            },
            {
                title: 'Shoes',
                price: 250
            },
        ];
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