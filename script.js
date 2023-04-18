

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



// форма обратной связи из ДЗ Урок 4 Регулярные выражения 
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