const arrayOfNumbers = []; // Массив с числами;
const arrayOfAttempts = []; //Массив попыток пользователя
const mainInput = document.querySelector('#section-game__input'); //Основной инпут
const errorFiled = document.querySelector('.section-game__error'); //Поле с ошибкой
const gameForm = document.querySelector('.section-game__form'); //Форма
const gameField = document.querySelector('.section-game__field'); //Игровое поле
const timerShow = document.getElementById("timer"); // Берём блок для показа времени
const timerShowModal = document.getElementById("timer_modal"); // Берём блок для показа времени
const overlay = document.querySelector('.overlay'); // Определяем оверлей
const overlayText = document.querySelector('.overlay__text'); // Определяём текст
const button = document.querySelector('.section-game__button');
const restartButton = document.querySelector('.section-game__button_restart');
let limiter; //Ограничитель количества попыток
let wrongOptions = false; // Состояние "Наличие ошибок"
let gameOver = false; // Состояние "Игра закончилась"
let gameStarted = false; // Состояние "Игра закончилась"
let restart = false
let timer = 60; // Таймер
let timerCooldown;
timerShow.innerHTML = 60; // Отображение таймера
timerShowModal.innerHTML = 60; // Отображение таймера
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
  if (wrongOptions) {
    wrongOptions = false;
    return
  }
  let items = []
  limiter = value;
  while (value !== 0) {
    items.push(value)
    items.push(value)
    value -= 1;
  }
  shuffle(items)

  for (let item = 0; item < items.length; item++) {
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
  timerShow.innerHTML = 60
  timerShowModal.innerHTML = 60
  button.classList.add('none')
  restartButton.classList.remove('none')
  let start = Date.now();
  timerFunction = () => {
    let delta = Date.now() - start;
    console.log(Math.floor(delta / 1000))
    timerShow.innerHTML = timer - (Math.floor(delta / 1000));
    timerShowModal.innerHTML = timer - (Math.floor(delta / 1000));
    if (timerShow.innerHTML <= 0 || timerShowModal.innerHTML <= 0) {
      clearInterval(timerCooldown);
      gameOver = true
      overlay.classList.remove("d-none");
      overlay.classList.add("d-flex");
      overlayText.textContent = 'Game Over!'
      gameStarted = false
    }
  }
  if (gameStarted) {
    clearInterval(timerCooldown)
  }
  timerCooldown = setInterval(timerFunction, 1000);
  let game = () => {
    gameStarted = true;
    while (arrayOfAttempts.length) { // Чистим массив попыток, чтобы при начале следующей игры он был пуст
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
    if (mainInput.value !== "" && !wrongOptions) { //Если инпут не пуст и нет ошибок
      if (!inputValidator(mainInput)) { //Если значения отвалидировались, то начинаем игру
        gameStart(mainInput.value);
      }
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
              gameStarted = false;
              if (gameOver) {
                clearInterval(timerCooldown);
              }
            }
          }, 200);
        });
      });
    }, 100);
  }
  game()
  restartButton.addEventListener("click", () => {
    clearInterval(timerCooldown);
    button.classList.remove('none')
    restartButton.classList.add('none')
    timerShow.innerHTML = 60;
    timerShowModal.innerHTML = 60;
    start = Date.now();
    timerCooldown = setInterval(timerFunction, 1000);
    game()
  })
});
