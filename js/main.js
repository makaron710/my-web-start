/* //проверка прогрузки html
document.addEventListener("DOMContentLoaded", function(event){

  //объект документа с классом modal
  const modal = document.querySelector('.modal'); 
  //все объекты документа с селектором data-toggle=modal
  const modalBtn = document.querySelectorAll('[data-toggle=modal]');
  // объект документа с класссом modal_close
  const closeBtn = document.querySelector('.modal__close'); 
  // объект документа с класссом modal__over
  const closeOver = document.querySelector('.modal__over');

  //функция toggle переключает наличие/отсутствие класса
  const switchModal = () => {
    modal.classList.toggle('modal--visible');
  }
  //для каждого modalBtn отслеживать элементы с событием "клик"
  //при наступлении вызвать функццию switchModal чтобы открыть окно
  modalBtn.forEach(element => {
    element.addEventListener('click', switchModal);
  });
  
  // при клике по объекту closeBtn вызвать функццию switchModal чтобы закрыть окно
  closeBtn.addEventListener('click', switchModal);

  // при клике по объекту closeBtn вызвать функццию switchModal чтобы закрыть окно
  closeOver.addEventListener('click', switchModal);

  // при нажатии клавиши escape, открытие/закрытие вызов функции switchModal
  document.addEventListener('keydown', (event) => {
    if (event.keyCode == 27) {
      modal.classList.toggle('modal--visible');
    }
  });
}); */

//jQuery
//проверка прогрузки html
$(document).ready(function(){

  //объект документа с классом modal
  var modal = $('.modal'),
  //все объекты документа с селектором data-toggle=modal
      modalBtn = $('[data-toggle=modal]'),
  // объект документа с класссом modal_close
      closeBtn = $('.modal__close'),
  // объект документа с класссом modal__over
      closeOver = $('.modal__over');

  //функция toggle переключает наличие/отсутствие класса
    var switchModal = () => {
    modal.toggleClass('modal--visible');
  };

  //для modalBtn отслеживать событие "клик"
  //при наступлении вызвать функццию switchModal чтобы открыть окно
  modalBtn.on('click', switchModal);
  
  // при клике по объекту closeBtn вызвать функццию switchModal чтобы закрыть окно
  closeBtn.on('click', switchModal);

  // при клике по объекту closeBtn вызвать функццию switchModal чтобы закрыть окно
  closeOver.on('click', switchModal);

  // при нажатии клавиши escape - удаление класса .modal--visible
  $(document).keyup(function(e) {
    if (e.key === "Escape" || e.keyCode === 27) {
      modal.removeClass('modal--visible');
    }
  });
  
  
});