const arrayOfNumbers = []; //Массив с числами;
const mainInput = document.querySelector('#section-game__input'); //Основной инпут
const horizontalInput = document.querySelector('#section-game__horizontal'); //Инпут горизонтальный
const verticalInput = document.querySelector('#section-game__vertical'); //Инпут вертикальный
const errorFiled = document.querySelector('.section-game__error'); //Поле с ошибкой
const gameForm = document.querySelector('.section-game__form'); //Форма
const gameField = document.querySelector('.section-game__field'); //Игровое поле
let limiter; 
const pushingNumbersToArray = (inputValue_one, inputValue_two) => {
    if(inputValue_one == 10 || inputValue_two == 10 ) {
        limiter = inputValue_one * inputValue_two / 2
    } else {
        limiter = inputValue_one * inputValue_two 
    }
    for(i=1;i<=limiter;i++) {
        for(a=0;a<2;a++){
            arrayOfNumbers.push(i);
        };
    } 
} //Пушим в массив нужные цифры
const inputValidator = (input) => {
    if (input.value < 2 || input.value > 10 || input.value % 2 !== 0) {
        input.value = "4";
        errorFiled.textContent = "Only even number between 2 and 10!"
        input.classList.add('section-game__field-item_error')
        setTimeout(() => {
            errorFiled.textContent = '';
            input.classList.remove('section-game__field-item_error');
        }, 3000);
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
    let gameItem = document.createElement('li');
    for(item=value; item > 0; item--) {
        let cloneItem = gameItem;
        cloneItem.textContent = item;
        cloneItem.classList.add('seciton-game__field-item_clone');
        gameField.appendChild(cloneItem)
        console.log(cloneItem)
    }
}

gameForm.addEventListener("submit", (event) =>{
    event.preventDefault();
    if(mainInput.value !== '') {
        if(!inputValidator(mainInput)) {
            gameStart(mainInput.value);
        }
    };
    if(horizontalInput.value !== '') {
        inputValidator(mainInput)
    };
    if(verticalInput.value !== '') {
        inputValidator(mainInput)
    };
}); 