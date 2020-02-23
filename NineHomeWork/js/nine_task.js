window.addEventListener('DOMContentLoaded',function () {
    'use strict';

    //Собираем все дочерние табы, берем родителя табов, так же сам блок с контентом

    let tab = document.querySelectorAll('.info-header-tab'),
        info = document.querySelector('.info-header'),
        tabContent = document.querySelectorAll(".info-tabcontent");

    // Прячем весь контент,кроме первого.

    function hideContent(hide) {
        for (let i = hide; i < tabContent.length;i++){
            tabContent[i].classList.remove('show');
            tabContent[i].classList.add('hide');
        }
    }
    //Вызываем на выполнения
    hideContent(1);

    //По передаче нужного таба,проверятся, спрятан ли он
    // В случае,если он спрятан,то он показывается.

    function showTabContent(show,) {
        if (tabContent[show].classList.contains('hide')){
            tabContent[show].classList.remove('hide');
            tabContent[show].classList.add('show');
        }
    }

    /*
    События по клику таба,используется делегирования.
    Проверяется,произошел ли клик по табу,в случае подтверждения,
    пробегаемся по циклу,чтобы найти контент,соотвествующий клику по табу,
    Закрываем текущий таб-контент - (hideContent(0)),
    открываем таб-контент  - showTabContent(i),по которому произошёл клик.
    */

    info.addEventListener('click',function (event) {
        let target = event.target;
        if (target && target.classList.contains('info-header-tab')) {
            for (let i = 0; i < tab.length; i++) {
                if (target === tab[i]) {
                    hideContent(0);
                    showTabContent(i);
                    break;
                }
            }
        }
    });

    //****************************************************************

    /*

        Собираем все картинки из родительского тега wrap;

        Берем родительский тег,по отношению к картинкам,к которому они прикреплены;

        Собираем  теги dot из родительского тега slider-dots,находящийся под
        картинками(для показа текущего расположения среди картинок);

        Берем родительский тег,по отношению к dot, к которому они прикреплены;

    */

    let sliderTab = document.querySelectorAll('.slider-item'),
        wrapTab = document.querySelector('.wrap'),
        dotTab = document.querySelectorAll('.dot'),
        sliderDot = document.querySelector('.slider-dots'),
        countImages = 0;

    //Прячем все картинки,кроме первой;

    function hideImages(hide) {
        for (let i = hide; i < sliderTab.length;i++){
            sliderTab[i].style.display = 'none';
        }
    }
    hideImages(1);

    //Показываем картинку,согласно по её индексу;

    function showImages(show) {
        sliderTab[show].style.display = 'flex';
    }

    /*

    Данная функция активируется при помощи функции currentImages, обновляет dot
    по позиции картинки;

     */
    function dotActive() {
        for(let i = 0; i  < dotTab.length; i++)
        {
            dotTab[i].classList.remove('dot-active');
        }
        dotTab[countImages].classList.add('dot-active');
    }

    /*

    Показываем следующую картинку,ставим dot-active по этой картинке;
    Если картинки закончились,возвращаемся к первой;

    */

    function NextImages() {
        if (countImages+1 < sliderTab.length) {
                hideImages(0);
                showImages(countImages+1);
                dotTab[countImages+1].classList.add('dot-active');
                dotTab[countImages].classList.remove('dot-active');
                ++countImages;
        }
        else {
            dotTab[countImages].classList.remove('dot-active');
            countImages = 0;
            hideImages(0);
            showImages(countImages);
            dotTab[countImages].classList.add('dot-active');
        }
    }

    /*

    Показываем предыдущую картинку,ставим dot-active по этой картинке;

    Если картинки закончились,возвращаемся к последней;

    */

    function PrevImages() {
        if (countImages > 0) {
            hideImages(0);
            showImages(countImages - 1);
            dotTab[countImages - 1].classList.add('dot-active');
            dotTab[countImages].classList.remove('dot-active');
            --countImages;
        }
        else {
            dotTab[countImages].classList.remove('dot-active');
            countImages = dotTab.length-1;
            hideImages(0);
            showImages(countImages);
            dotTab[countImages].classList.add('dot-active');
        }
    }

    /*

     Данная функция позволяет перемещаться по картинкам при помощи dot'ов;

     Закрываем текущую картинку,включаем картинку,по индексу,
     переходим в функцию для активации dot'а;

     */

    function currentImages() {
            hideImages(0);
            showImages(countImages);
            dotActive();
    }

    /*

      Событие,если происходит клик по дочернему тегу  arrow-right или родительскому
      next, то перемещаемся на следующую картинку;

      Событие,если происходит клик по дочернему тегу  arrow-left или родительскому
      prev, то перемещаемся на предыдущую картинку;

    */

    wrapTab.addEventListener('click',function (event) {
        let target = event.target;
        if (target && (target.classList.contains('arrow-right') ||
            (target.classList.contains('next'))))
        {
            NextImages();
        }
        else if (target && (target.classList.contains('arrow-left') ||
            (target.classList.contains('prev'))))
        {
            PrevImages();
        }
    });

    /*

    События по клику dot, ставится индекс по dot,на которой произошел клик;

    Вызов функции currentImages,для отображения картинки,согласно по dot'у;

     */

    sliderDot.addEventListener('click',function (event) {
        let target = event.target;
        if (target && target.classList.contains('dot'))
        {
            for (let i = 0; i < dotTab.length; i++) {
                if (dotTab[i] === target) {
                    countImages = i;
                    currentImages();
                }
            }
        }
    })
});