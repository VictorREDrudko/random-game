// Контейнер с карточками
const containerCards = document.querySelector('.wrapper');

const levelGame = document.querySelector('.level__game');
const sec = document.querySelector('.time_sec');
const min = document.querySelector('.time_minutes');
let n = 1;



// Проигрование звука
function clock() {
	let audio = new Audio(); 
	audio.src = 'sound/clock.mp3';
	audio.autoplay = true; 
}

function click() {
	let audio = new Audio(); 
	audio.src = 'sound/click.mp3';
	audio.autoplay = true;
}

// function soundGame() {
// 	let audio = new Audio(); 
// 	audio.src = 'sound/game.mp3';
// 	audio.autoplay = true;
// }

function winGame() {
	let audio = new Audio(); 
	audio.src = 'sound/win.mp3';
	audio.autoplay = true;
}



// Возобнавление игры
function playGame (containerCards, cardsCount) {
	let seconds = 0;
	let minutes = 0;
	let interval;

	function updateTime () {
		seconds++;
		sec.textContent = seconds;
		if (seconds > 59) {
			minutes++;
			min.innerHTML = '0' + minutes
			seconds = 0
		}

		if (seconds < 10) {
			sec.innerHTML = '0' + seconds
		}

		if (minutes === 5) {
			setTimeout(() => {
				containerCards.innerHTML = '';
				clearInterval(interval);
				seconds = 0;
				minutes = 0;
				min.innerHTML = '00';
				sec.innerHTML = '00';
				alert('ПОРАЖЕНИЕ!!! ВРЕМЯ ВЫШЛО!!!');
				
				let cardsCount = Number(prompt('Выберете уровнь игры', 1));
				playGame(containerCards, cardsCount);
			}, 100);
		}
	}

	// Функция запуска секундомера
	function startTimeGame () {
		interval = setInterval(updateTime, 1000);
	}
	clearInterval(interval);
	startTimeGame () 



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
			clock()
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
					click();
					cardFirst.classList.add('win');
					cardSecond.classList.add('win');
				}
			}

			// Завершение игры
			if (cardsArray.length === document.querySelectorAll('.win').length) {
				winGame();
				setTimeout(() => {
					let resultGame = {level: `${levelGame.textContent}`, time: `${min.textContent}:${sec.textContent}`};
					
					localStorage.setItem(String(n), JSON.stringify(resultGame));
					n = n + 1;
					if (n > 10) {
						n = 1;
					}

					containerCards.innerHTML = '';
					clearInterval(interval);
					alert(`ПОБЕДА!!! Уровень: ${levelGame.textContent}, Время: ${min.textContent}:${sec.textContent}`);
					seconds = 0;
					minutes = 0;
					min.innerHTML = '00';
					sec.innerHTML = '00';
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




