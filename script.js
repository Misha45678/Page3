let points = 0;
let level = 1;
let autoclickerPrice = 100;
let autoclickers = 0;
let pointsPerSecond = 0;

const pointsDisplay = document.getElementById('points');
const levelDisplay = document.getElementById('level');
const levelUpCostDisplay = document.getElementById('levelUpCost');
const pointsPerSecondDisplay = document.getElementById('pointsPerSecond');
const clickButton = document.getElementById('clickButton');
const levelUpButton = document.getElementById('levelUpButton');
const openShopButton = document.getElementById('openShopButton');
const closeShopButton = document.getElementById('closeShopButton');
const shopContainer = document.getElementById('shopContainer');
const notification = document.getElementById('notification');
const buttonsContainer = document.querySelector('.buttons-container');

// Обновляем отображение очков и уровня
function updateDisplay() {
    pointsDisplay.textContent = points;
    levelDisplay.textContent = level;
    levelUpCostDisplay.textContent = 100 * Math.pow(2, level - 1);
    pointsPerSecondDisplay.textContent = `${pointsPerSecond}`;
    updateLevelUpButton();
}

// Проверка, нужно ли добавить пульсацию на кнопку повышения уровня
function updateLevelUpButton() {
    const levelUpCost = 100 * Math.pow(2, level - 1);
    if (points >= levelUpCost) {
        levelUpButton.classList.add('pulsing');
    } else {
        levelUpButton.classList.remove('pulsing');
    }
}

// Показать уведомление
function showNotification(message) {
    notification.textContent = message;
    notification.style.display = 'block';
    setTimeout(() => {
        notification.style.display = 'none';
    }, 2000);
}

// Обработчик клика по кнопке
clickButton.addEventListener('click', () => {
    points += level;
    updateDisplay();
});

// Обработчик повышения уровня
levelUpButton.addEventListener('click', () => {
    const levelUpCost = 100 * Math.pow(2, level - 1);
    if (points >= levelUpCost) {
        points -= levelUpCost;
        level++;
        updateDisplay();
        showNotification('Уровень повышен!');
    } else {
        alert('Недостаточно очков для прокачки уровня!');
    }
});

// Открыть/закрыть магазин
openShopButton.addEventListener('click', () => {
    shopContainer.classList.add('open');
});
closeShopButton.addEventListener('click', () => {
    shopContainer.classList.remove('open');
});

// Покупка автокликера и других предметов
const buyButtons = document.querySelectorAll('.buy-button');
buyButtons.forEach(button => {
    button.addEventListener('click', (event) => {
        const item = event.target.closest('.shop-item');
        const price = parseInt(item.getAttribute('data-price'));

        if (points >= price) {
            points -= price;

            // Проверяем, если это не автокликер
            if (!item.getAttribute('data-autoclicker')) {
                // Замена основной кнопки на новую с изображением купленного предмета
                const newButton = document.createElement('button');
                newButton.id = 'clickButton';
                newButton.classList.add('image-button');
                newButton.innerHTML = `<img src="${item.querySelector('.shop-image').src}" alt="${item.querySelector('p').textContent}">`;

                // Добавление обработчика клика для новой кнопки
                newButton.addEventListener('click', () => {
                    points += level; // Количество очков за клик можно менять
                    updateDisplay();
                });

                // Заменяем старую кнопку новой
                buttonsContainer.replaceChild(newButton, clickButton);

                // Устанавливаем текст кнопки "Куплено" и отключаем её
                event.target.textContent = 'Куплено';
                event.target.disabled = true;

                // Обновляем ссылку на новую кнопку
                clickButton = newButton;
            } else {
                autoclickers++;
                pointsPerSecond += 1;
                autoclickerPrice = Math.round(autoclickerPrice * 1.5);
                item.setAttribute('data-price', autoclickerPrice);
                event.target.textContent = `${autoclickerPrice}$`;
            }

            updateDisplay();
            showNotification('Успешно!');

            // Обновляем доступность скинов после покупки
            updateSkinsAvailability(item.getAttribute('data-skin'));

        } else {
            alert('Недостаточно очков для покупки!');
        }
    });
});

openSkinsButton.addEventListener('click', () => {
    skinsContainer.classList.add('open');
});
closeSkinsButton.addEventListener('click', () => {
    skinsContainer.classList.remove('open');
});

// Обработчик выбора скина
const selectSkinButtons = document.querySelectorAll('.select-skin-button');
selectSkinButtons.forEach(button => {
    button.addEventListener('click', (event) => {
        const skinItem = event.target.closest('.skin-item');
        const isPurchased = skinItem.getAttribute('data-purchased') === 'true';

        if (isPurchased) {
            const skinImage = skinItem.getAttribute('data-skin');
            clickButton.querySelector('img').src = skinImage;
            showNotification('Скин изменен!');
        } else {
            showNotification('Скин не куплен!');
        }
    });
});

// Функция для обновления статуса доступности скинов после покупки
function updateSkinsAvailability(skin) {
    const skinItems = document.querySelectorAll('.skin-item');
    skinItems.forEach(skinItem => {
        if (skinItem.getAttribute('data-skin') === skin) {
            skinItem.setAttribute('data-purchased', 'true');
            skinItem.querySelector('.select-skin-button').disabled = false;
        }
    });
}

// Автокликеры добавляют очки
setInterval(() => {
    if (autoclickers > 0) {
        points += autoclickers;
        updateDisplay();
    }
}, 1000);
