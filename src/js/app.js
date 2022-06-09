const arrayOfNumbers = []; // Массив с числами;
const arrayOfAttempts = []; //Массив попыток пользователя
const mainInput = document.querySelector('#section-game__input'); //Основной инпут
const errorFiled = document.querySelector('.section-game__error'); //Поле с ошибкой
const gameForm = document.querySelector('.section-game__form'); //Форма
const gameField = document.querySelector('.section-game__field'); //Игровое поле
const timerShow = document.getElementById("timer"); // Берём блок для показа времени
const overlay = document.querySelector('.overlay'); // Определяем оверлей
const overlayText = document.querySelector('.overlay__text'); // Определяём текст
let limiter; //Ограничитель количества попыток
let gameStarted = false; // Состояние "Игра началась"
let wrongOptions = false; // Состояние "Наличие ошибок"
let gameOver = false; // Состояние "Игра закончилась"
let timer = 59; // Таймер
timerShow.innerHTML = 60; // Отображение таймера
const inputValidator = (input) => { // Валидатор инпута
    if (input.value < 2 || input.value > 10 || input.value % 2 !== 0) {
        input.value = "4";
        errorFiled.textContent = "Only even number between 2 and 10!"
        input.classList.add('section-game__field-item_error')
        setTimeout(() => {
            errorFiled.textContent = '';
            input.classList.remove('section-game__field-item_error');
        }, 3000);
        wrongOptions = true
        return true;
    };
};

const shuffle = (array) => { //алгоритм Фишера-Йетса
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
}

const gameStart = (value) => { //Функция начала игры, которая перемешаивает значения карточек
    gameOver = false
    if(wrongOptions) {
      wrongOptions = false;
      return
    }
    let items = []
    limiter = value;
    while(value !== 0) {
        items.push(value)
        items.push(value)
        value -= 1;
    }
    shuffle(items)

    for(let item = 0; item < items.length; item++) {
        let gameItem = document.createElement('li');
        gameItem.classList.add('section-game__field-item');
        gameField.appendChild(gameItem);
    };

    document.querySelectorAll('.section-game__field-item').forEach((element) => {
        element.textContent = items[0];
        items.splice(0, 1);
      });
    }

    
    gameForm.addEventListener("submit", (event) => { // Функция, которая отрабатывает по нажатию кнопки сабмит
      event.preventDefault(); //Прерываем дефолтное действие
      timer = 59 // Перезадаём значение таймера, это нужно в том случае, если игрок ещё раз нажал на кнопку сабмита
      while(arrayOfAttempts.length) { // Чистим массив попыток, чтобы при начале следующей игры он был пуст
        arrayOfAttempts.forEach((element, index) => {
          arrayOfAttempts.splice(index, 1);
        })
      }
      while (gameField.firstChild) { // Убираем карточки для новой игры
        gameField.removeChild(gameField.firstChild);
      }
      if ( //Если игрок ничего не написал в инпут, то дефолтное значение = 4
      mainInput.value == ""
      ) {
        mainInput.value = 4;
      }
      const timerFunction = () => { //Функция, которая работает вместе с setInterval
        console.log(gameStarted)
        if (timer <= 0) {
            clearInterval(timerCooldown);
            gameOver = true
            overlay.classList.remove("d-none");
            overlay.classList.add("d-flex");
            overlayText.textContent = 'Game Over!'
          } else {
            timerShow.innerHTML = timer;
          }
          --timer;
      };  
  let timerCooldown = setInterval(timerFunction, 1000); //Запускаем наш таймер
  if (mainInput.value !== "" && !wrongOptions) { //Если пнпут не пуст и нет ошибок
    if (!inputValidator(mainInput)) { //Если значения отвалидировались, то начинаем игру
      gameStart(mainInput.value);
      if (gameStarted) { 
        clearInterval(timerCooldown);
      } 
    }
  } else {
    clearInterval(timerCooldown);
  }
  setTimeout(() => {
    let gameItems = document.querySelectorAll(".section-game__field-item");
    gameItems.forEach((element) => {
      element.addEventListener("click", () => {
        if (!element.classList.contains("match")) {
          element.classList.add("Cover-remove");
          arrayOfNumbers.push(element);
        } else {
            overlay.classList.remove("d-none");
            overlay.classList.add("d-flex");
            overlayText.textContent = 'Уже угадали :)'
        }
        if (arrayOfNumbers.length == 2) {
          if (arrayOfNumbers[0].textContent == arrayOfNumbers[1].textContent) {
            arrayOfNumbers.forEach((element) => {
              element.classList.add("match");
              element.classList.remove("section-game__field-item");
            });
            arrayOfAttempts.push("1");
            arrayOfNumbers.splice(0, 2);
          } else {
            setTimeout(() => {
              arrayOfNumbers.forEach((element) => {
                element.classList.toggle("Cover-remove");
              });
              arrayOfNumbers.splice(0, 2);
              overlay.classList.remove("d-none");
              overlay.classList.add("d-flex");
              savedTimwe = timerShow.innerHTML - 1;
              overlayText.textContent = 'Не совпало :('
            }, 200);
          }
        }
        setTimeout(() => {
          if (arrayOfAttempts.length == limiter) {
            overlay.classList.remove("d-none");
            overlay.classList.add("d-flex");
            overlayText.textContent = 'Отлично!'
            gameField.innerHTML = "";
            gameOver = true
            if(gameOver) {
              clearInterval(timerCooldown);
            }
          }
        }, 200);
      });
    });
  }, 100);
}); 
