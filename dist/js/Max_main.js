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
'use strict';

$(document).ready(function () {
  var _this = this;

  //объект документа с классом modal
  var modal = $('.modal'),

  //все объекты документа с селектором data-toggle=modal
  modalBtn = $('[data-toggle=modal]'),

  // объект документа с класссом modal_close
  closeBtn = $('.modal__close'),

  // объект документа с класссом modal__over
  closeOver = $('.modal__over');

  //функция toggle переключает наличие/отсутствие класса
  var switchModal = function switchModal() {
    modal.toggleClass('modal--visible');
  };

  //для modalBtn отслеживать событие "клик"
  //при наступлении вызвать функццию switchModal чтобы открыть окно
  modalBtn.on('click', switchModal);

  // при клике по объекту closeBtn вызвать функццию switchModal чтобы закрыть окно
  closeBtn.on('click', function () {
    $('.modal').removeClass('modal--visible modal-thank--visible');
  });

  // при клике по объекту closeBtn вызвать функццию switchModal чтобы закрыть окно
  closeOver.on('click', function () {
    $('.modal').removeClass('modal--visible modal-thank--visible');
  });

  // при нажатии клавиши escape - удаление класса .modal--visible
  $(document).keyup(function (e) {
    if (e.key === "Escape" || e.keyCode === 27) {
      modal.removeClass('modal--visible');
    }
  });

  // Кнопка "Листайте вниз"
  $(function () {
    $('.hero__scroll-down').click(function () {
      $('html').animate({
        scrollTop: $('#section-projects').offset().top + 50
      }, 500);
    });
  });

  // кнопка прокрутки вверх
  $(function () {
    $('.scroll-up').hide();

    $(window).scroll(function () {
      if ($(_this).scrollTop() > 600) {
        $('.scroll-up').fadeIn();
      } else {
        $('.scroll-up').fadeOut();
      }
    });

    $('.scroll-up').click(function () {
      $('html').animate({
        scrollTop: 0
      }, 500);
    });
  });

  //initialize swiper when document ready
  var mySwiper = new Swiper('.swiper-container', {
    // Optional parameters
    loop: true,
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets'
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    }
  });
  // Позиционирование стрелок слайдера
  var next = $('.swiper-button-next');
  var prev = $('.swiper-button-prev');
  var bullets = $('.swiper-pagination');
  var container = $('.container');
  var wind = $(window);

  bullets.css('left', prev.width() + 8);
  next.css('left', prev.width() + 8 + bullets.width());

  if (wind.width() < 992) {
    prev.css('left', (container.width() - prev.width() - 8 - bullets.width() - next.width()) / 2 + 8);
    bullets.css('left', (container.width() - prev.width() - 8 - bullets.width() - next.width()) / 2 + prev.width() + 8);
    next.css('left', (container.width() - prev.width() - 8 - bullets.width() - next.width()) / 2 + prev.width() + 8 + bullets.width());
  }

  // Иинициализация wow
  new WOW().init();

  // Валидация формы
  $('.form').each(function validateForm() {
    $(this).validate({
      // Класс, который будет присваиваться для элементов (полей) с ошибкой
      errorClass: "invalid",
      //onclick: false,
      // Error label устанавливается у соответствующего label
      /*       errorLabelContainer: ".label-error",
            wrapper: "label",
            submitHandler: function() { alert("Submitted!") }, */
      /*       errorPlacement: function(error, element) {
              error.appendTo("label");
            }, */
      errorPlacement: function errorPlacement(error, element) {
        if (element.attr("type") == "checkbox") {
          return element.next('label').append(error);
        }

        error.insertAfter($(element));
      },

      // Правила
      rules: {
        userName: {
          required: true,
          minlength: 2,
          maxlength: 15
        },
        // строчное правило
        userPhone: {
          required: true,
          minlength: 17
        },
        // правило-объект (блок)
        userEmail: {
          required: true,
          email: true
        },
        policyCheckbox: {
          required: true
        }
      },
      // сообщения
      messages: {
        userName: {
          required: "* Заполните поле",
          minlength: "* Должно быть не менее 2 символов",
          maxlength: "* Должно быть не более 15 символов"
        },
        userPhone: "* Заполните поле",
        userEmail: {
          required: "* Заполните поле",
          email: "* Введите корректный email"
        },
        policyCheckbox: {
          required: "* Поставте галочку"
        }
      },

      submitHandler: function submitHandler(form) {
        $.ajax({
          type: 'POST',
          url: 'send.php',
          data: $(form).serialize(), // Склеивание всех данных с формы
          success: function success(response) {
            // Сценарий для удачной отправки
            console.log('данные ' + response);
            $(form)[0].reset();
            $('.modal').removeClass('modal--visible');
            $('.modal-thank').toggleClass('modal-thank--visible');
          },
          error: function error(jqXHR, textStatus, errorThrown) {
            // Сценарий для не удачной отправки
            console.error(jqXHR + " " + textStatus);
          }

        });
        return false;
      }
    });
  });

  // Маска для телефона
  $('[type=tel]').mask('+7(000) 000-00-00', { placeholder: "Ваш номер телефона:" });
  $('[type=telTextHold]').mask('+7(000) 000-00-00');

  // End
});

// отложенная загрузка яндекс карты
setTimeout(function () {
  var elemYaMap = document.createElement('script');
  elemYaMap.async = true;
  elemYaMap.type = 'text/javascript';
  elemYaMap.src = 'https://api-maps.yandex.ru/2.1/?apikey=28850313-e4da-46be-8c91-b9c747dedcf8&lang=ru_RU&onload=init';
  document.getElementsByTagName('body')[0].appendChild(elemYaMap);
}, 2000);
//обязательно onload в конце src вместо ymaps.ready(init);

// Функция ymaps.ready() будет вызвана, когда
// загрузятся все компоненты API, а также когда будет готово DOM-дерево.
//ymaps.ready(init);
function init() {
  // Создание карты.
  var myMap = new ymaps.Map("map", {
    center: [47.233497, 39.691180],
    zoom: 18,
    controls: ['routeButtonControl', 'zoomControl']
  }, {
    searchControlProvider: 'yandex#search'
  }),

  // Создаём макет содержимого.
  MyIconContentLayout = ymaps.templateLayoutFactory.createClass('<div style="color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>'),
      myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
    hintContent: 'Repair Design',
    balloonContent: 'Пн - Пт: с 9:00 до 18:00'
  }, {
    // Опции.
    // Необходимо указать данный тип макета.
    iconLayout: 'default#image',
    // Своё изображение иконки метки.
    iconImageHref: 'img/footer/map-marker.png',
    // Размеры метки.
    iconImageSize: [26, 42],
    // Смещение левого верхнего угла иконки относительно
    // её "ножки" (точки привязки).
    iconImageOffset: [-10, -50]
  });
  myMap.geoObjects.add(myPlacemark);

  myMap.behaviors.disable('scrollZoom'); // Отключение масштабирования прокруткой

  // Добавим элемент управления (построитель маршрута) в левый угол карты
  // и зададим начальную и конечную точки маршрута.
  myMap.controls.add('routeButtonControl', {
    size: "large",
    float: "left",
    floatIndex: 1000
  });
  myMap.controls.get('routeButtonControl').routePanel.state.set({
    fromEnabled: true,
    to: [47.233497, 39.691180],
    type: "auto"
  });
}

// Видео с youtube
var player;
$('.video__play').on('click', function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    height: '450',
    width: '100%',
    videoId: 'cD0qpac2gqw',
    events: {
      'onReady': videoPlay
    }
  });
});
function videoPlay(event) {
  event.target.playVideo();
}