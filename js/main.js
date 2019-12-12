document.addEventListener("DOMContentLoaded", function(event){  /* проверка чтобы все прогрузилось */
  
  const modal = document.querySelector('.modal'); /* объект документа с селектором modal */
  const modalBtn = document.querySelectorAll('[data-toggle=modal]'); /* все объекты документа с селектором data-toggle=modal */
  const closeBtn = document.querySelector('.modal__close'); /* объект документа с селектором modal_close */
  const closeOver = document.querySelector('.modal__over');
    
  const switchModal = () => {
    modal.classList.toggle('modal--visible'); /* функция toggle переключает наличие/отсутствие класса */
  }

  modalBtn.forEach(element => { /* для каждого modalBtn отслеживать элементы с событием "клик" */
    element.addEventListener('click', switchModal); /* при наступлении вызвать функццию switchModal чтобы открыть окно*/
  });
  

  closeBtn.addEventListener('click', switchModal); /* при клике по объекту closeBtn вызвать функццию switchModal чтобы закрыть окно*/

  closeOver.addEventListener('click', switchModal);
  
  document.addEventListener("keydown", function(event) {
    if (event.keyCode == 27) {
      modal.classList.toggle('modal--visible');
    }
  });


});