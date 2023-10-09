// Контейнер с карточками
const containerCards = document.querySelector('.wrapper');

const levelGame = document.querySelector('.level__game');
const time = document.querySelector('.time');



// Возобнавление игры
function playGame (containerCards, cardsCount) {
	let seconds = 0;
	let minutes = 0;
	let interval = 0;

	function updateTime () {
		seconds++;
		time.textContent = seconds;
	}

	// Функция запуска секундомера
	function startTimeGame () {
		interval = setInterval(updateTime, 1000);
	}



	// Хранение данных 2-ух открытых карточек
	let cardFirst = null;
	let cardSecond = null;
	// Массив карточек
	const cardsArray = [];

	levelGame.textContent = cardsCount;

	// Заполнение массива карточек
	for (let i = 1; i <= cardsCount * 4; i++) {
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
					
					let cardsCount = Number(prompt('Выберете уровнь игры', 1));
					playGame(containerCards, cardsCount);
				}, 600);
			}
		})
	}
}

// Счетчик количества пар карточек
let cardsCount = Number(prompt('Выберете уровнь игры', 1));

playGame(containerCards, cardsCount);




