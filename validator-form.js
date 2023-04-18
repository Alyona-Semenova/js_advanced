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