//проверка прогрузки html
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
});