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
            autoclickers++;
            pointsPerSecond += 1;
            autoclickerPrice = Math.round(autoclickerPrice * 1.5);
            item.setAttribute('data-price', autoclickerPrice);
            event.target.textContent = `${autoclickerPrice}$`;
            updateDisplay();
            showNotification('Успешно!');
        } else {
            alert('Недостаточно очков для покупки!');
        }
    });
});

// Автокликеры добавляют очки
setInterval(() => {
    if (autoclickers > 0) {
        points += autoclickers;
        updateDisplay();
    }
}, 1000);
