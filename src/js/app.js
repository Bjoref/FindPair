const arrayOfNumbers = []; //Массив с числами;
const arrayOfAttempts = []; 
const mainInput = document.querySelector('#section-game__input'); //Основной инпут
const horizontalInput = document.querySelector('#section-game__horizontal'); //Инпут горизонтальный
const verticalInput = document.querySelector('#section-game__vertical'); //Инпут вертикальный
const errorFiled = document.querySelector('.section-game__error'); //Поле с ошибкой
const gameForm = document.querySelector('.section-game__form'); //Форма
const gameField = document.querySelector('.section-game__field'); //Игровое поле
const timerShow = document.getElementById("timer"); // Берём блок для показа времени
const overlay = document.querySelector('.overlay');
const overlayText = document.querySelector('.overlay__text');
let limiter;
let gameStarted = false;
let wrongOptions = false;
let gameOver = false;
let timer = 59;
timerShow.innerHTML = 60;
const inputValidator = (input) => {
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
};//Валидация инпута
const shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
} //алгоритм Фишера-Йетса

const gameStart = (value) => {
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

gameForm.addEventListener("submit", (event) => {
  timer = 59
  while (gameField.firstChild) {
    gameField.removeChild(gameField.firstChild);
  }
  event.preventDefault();
  let itemsList = document.querySelectorAll(".section-game__field-item");
  if (itemsList.length) {
    itemsList.forEach((element) => {
      element.parentNode.removeChild(element);
    });
  }
  if (
    mainInput.value == "" &&
    horizontalInput.value == "" &&
    verticalInput.value == ""
  ) {
    mainInput.value = 4;
  }
  if (mainInput.value !== "" && !wrongOptions) {
    if (!inputValidator(mainInput)) {
      gameStart(mainInput.value);
      const timerFunction = () => {
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
      let timerCooldown = setInterval(timerFunction, 1000);
      if (gameStarted) {
        clearInterval(timerCooldown);
        gameStarted = false;
      }
      gameStarted = true;
    }
  } else {
    clearInterval(timerCooldown);
  }
  if (horizontalInput.value !== "") {
    inputValidator(mainInput);
  }
  if (verticalInput.value !== "") {
    inputValidator(mainInput);
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
      });
    });
  }, 100);
}); 
