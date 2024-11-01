let points = 0;
let level = 1;
let levelUpCost = 100;

const pointsDisplay = document.getElementById('points');
const levelDisplay = document.getElementById('level');
const levelUpCostDisplay = document.getElementById('levelUpCost');
const clickButton = document.getElementById('clickButton');
const levelUpButton = document.getElementById('levelUpButton');

pointsDisplay.textContent = points;
levelDisplay.textContent = level;
levelUpCostDisplay.textContent = levelUpCost;

clickButton.addEventListener('click', () => {
    points += level; // Добавляем очки в зависимости от уровня
    pointsDisplay.textContent = points; // Обновляем отображение очков

    // Проверяем, если хватает очков для повышения уровня, добавляем класс pulsing
    if (points >= levelUpCost) {
        levelUpButton.classList.add('pulsing');
    } else {
        levelUpButton.classList.remove('pulsing');
    }
});

levelUpButton.addEventListener('click', () => {
    if (points >= levelUpCost) {
        points -= levelUpCost; // Снимаем очки, необходимые для прокачки
        level++; // Увеличиваем уровень
        levelUpCost = Math.floor(levelUpCost * 1.5); // Увеличиваем стоимость прокачки

        pointsDisplay.textContent = points;
        levelDisplay.textContent = level;
        levelUpCostDisplay.textContent = levelUpCost;

        // Убираем анимацию после повышения уровня
        levelUpButton.classList.remove('pulsing');
    } else {
        alert('Недостаточно очков для прокачки уровня!');
    }
});
