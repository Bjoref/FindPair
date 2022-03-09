const arrayOfNumbers = [[1,1], [2,2], [3,3], [4,4], [5,5], [6,6], [7,7], [9,9], [10,10]] //Массив значений, которые присваиваются картам.

const cardСounter = []; //Массив, который поможет ограничивать попытки игрока
const valuesOfOpenedCards = [] //Массив, в который записываем значения открытых карт
const clickController = new AbortController();

const compareValue = () => {
  if(cardСounter.length == 2) {
    const comparableArray = Array.from(document.querySelectorAll('.OpenedCard'));
    if(comparableArray[0].textContent == comparableArray[1].textContent){
      comparableArray.forEach((element) => {
        element.classList.remove('section-game__field-item');
        element.classList.add('section-game__field-item_clone');
      })
    } else {
      comparableArray.forEach((element) => {
        element.classList.toggle('Cover-remove'); //закрываем
      })
    }
  }
} //Функция сравнивающая значения

const togglePseudoElement = (element, cardСounter) => {
  if(element.classList.contains('section-game__field-item')) { //Ищем нужный класс
    element.classList.toggle('Cover-remove'); //Открываем
    element.classList.add('OpenedCard'); //Добавляем класс открытой карты

    function getRandom() {
      return Math.random();
    } //Создаём рандомное число

    if(cardСounter.length < 1) {
      cardСounter.push(getRandom());
      //Если длина массива не равно двум, то пушим рандомное число
    } else {
      cardСounter.push(getRandom());
      clickController.abort()
    }

    compareValue()

    console.log(cardСounter)
    return cardСounter //возвращаем массив
  }
};

document.addEventListener('click', e => togglePseudoElement(e.target, cardСounter)) //Ловим событие клика, чтобы пушить в "ограничивающий массив"
//Добавляем сигнал, который уберёт клик.

function shuffle (array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
} //алгоритм Фишера-Йетса

const toString = (array, desiredArray) => {
  array.forEach((element) => {
  element.forEach((element) => {
    JSON.stringify(element)
    desiredArray.push(element);
  })
})
  return desiredArray;
} //Функция переведёт пары нашего массива к строкам, которые мы присвоим картам.

const input = document.querySelector('.section-game__input') //находим инпут
const errorField = document.querySelector('.section-game__error'); //находим поле, в котором выводим ошибку
input.addEventListener("input", function() {
  errorField.textContent = '';
}); //Валидируем инпут

const desiredArray = [] //Массив с цифрами, который и будем шафлить
const gameField = document.querySelector('.section-game__field'); //находим ul, в котором будут карты
const gameItem = document.createElement('li'); //Создаём айтем
gameItem.classList.add('section-game__field-item'); //Присваеваем ему класс

toString(arrayOfNumbers, desiredArray);

const inputPush = (desiredArray) => {
  amountOfCard = input.value; //Количество карт равно инпуту

  gameNumbers = desiredArray.slice(0, amountOfCard); //Достаём цифры из массива.
  shuffle(gameNumbers); //Шафлим их

  gameNumbers.forEach((element) => {
    gameItem.innerText = element;
    let othersItems = gameItem.cloneNode(true)
    gameField.append(othersItems)
  });
}

document.querySelector('.section-game__form').addEventListener("submit", function(event) { //Находим нашу форму
  event.preventDefault();//Отменяем дефолтное действие сабмита

  if(input.value <= 2 && input.value >= 10 || input.value % 2 != 0) {
    errorField.textContent = 'Only even numbers from 2 to 10!'
    input.value = '4'
    return
  };

  const desiredArray = [] //Массив с цифрами, который и будем шафлить
  const gameField = document.querySelector('.section-game__field'); //находим ul, в котором будут карты
  const gameItem = document.createElement('li'); //Создаём айтем
  gameItem.classList.add('section-game__field-item'); //Присваеваем ему класс

  if(document.querySelectorAll('.section-game__field-item')) {
    const removedItems = Array.from(document.querySelectorAll('.section-game__field-item'));
    removedItems.forEach((element) => {
      element.remove();
    })
  };

  toString(arrayOfNumbers, desiredArray);

  inputPush(desiredArray)

  input.value = '';

});

let card = document.querySelector(".section-game__field");




