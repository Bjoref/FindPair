(function() {
  const wrap = document.getElementsByClassName('section-game__field-item');

  const cardСounter = [];

  const togglePseudoElement = (element, cardСounter) => {
    if(element.classList.contains('section-game__field-item')) {
      element.classList.toggle('Cover-remove');
      function getRandom() {
        return Math.random();
      }

      if(cardСounter.length != 2) {
        cardСounter.push(getRandom());
      }

      return cardСounter
    }
  }

  document.addEventListener('click', e => togglePseudoElement(e.target, cardСounter))

    const createTodoItemForm= () => {
        const gameField = document.querySelector('.section-game__container');
        let buttonWrapper = document.createElement('div');
        let button = document.createElement('button');


    }; //Функция создания формы для игры

})();
