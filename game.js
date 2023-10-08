// Контейнер с карточками
const containerCards = document.querySelector('.wrapper');



// Возобнавление игры
function playGame (containerCards, cardsCount) {
	// Хранение данных 2-ух открытых карточек
	let cardFirst = null;
	let cardSecond = null;
	// Массив карточек
	const cardsArray = [];

	// Заполнение массива карточек
	for (let i = 1; i <= cardsCount; i++) {
		cardsArray.push(i, i)
	}



	// Перемешивание карточек
	for (let i = 0; i < cardsArray.length; i++) {
		// создаем выборочный индекс
		let indexRandom = Math.floor(Math.random() * cardsArray.length);

		// создаем временную переменную
		let indexTemp = cardsArray[i];

		// перемешиваем индексы массива карточек
		cardsArray[i] = cardsArray[indexRandom];
		cardsArray[indexRandom] = indexTemp;
	}



	// Создание карточек
	for (const cardsCount of cardsArray) {
		// создадим карточку
		let card = document.createElement('div');
		card.textContent = cardsCount;

		// добавляем класс карточке для стилизации
		card.classList.add('style_card');

		// добавляем карточку в контейнер
		containerCards.append(card);

		// клик по карточке
		card.addEventListener("click", () => {
			// исключение клика по одной и той же карточке
			if (card.classList.contains('open') || card.classList.contains('win')) {
				alert('Эта карточка уже открыта');
				return
			}

			// проверка на совпадение карточек
			if (cardFirst !== null && cardSecond !== null) {
				cardFirst.classList.remove('open');
				cardSecond.classList.remove('open');
				cardFirst = null;
				cardSecond = null;
			}

			card.classList.add('open');

			if (cardFirst === null) {
				cardFirst = card;
			} else {
				cardSecond = card;
			}

			// сравнение карточек
			if (cardFirst !== null && cardSecond !== null) {
				let cardFirstNumber = cardFirst.textContent;
				let cardSecondNumber = cardSecond.textContent;

				if (cardFirstNumber === cardSecondNumber) {
					cardFirst.classList.add('win');
					cardSecond.classList.add('win');
				}
			}

			// Завершение игры
			if (cardsArray.length === document.querySelectorAll('.win').length) {
				setTimeout(() => {
					containerCards.innerHTML = '';
					
					alert('ПОБЕДА!!!');
					let cardsCount = Number(prompt('Ввести количество пар', 4));
					playGame(containerCards, cardsCount);
				}, 600);
			}
		})
	}
}

// Счетчик количества пар карточек
let cardsCount = Number(prompt('Ввести количество пар', 4));

playGame(containerCards, cardsCount);


