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

    function showTabContent(show) {
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
    });

    //Timer;

    let deadLine = '2020-02-25';

    function getTimeRemaining(endtime = deadLine) {
        let t = Date.parse(endtime) - Date.parse(new Date()),
            seconds = Math.floor((t/1000) % 60),
            minutes = Math.floor((t/1000/60) % 60),
            hours = Math.floor((t/(1000*60*60)));
        return {
            'total' : t,
            'hours' : hours,
            'minutes': minutes,
            'seconds' : seconds
        };
    }
    function setLock(id, endtime = deadLine) {
        let timer = document.getElementById(id),
        hours = timer.querySelector('.hours'),
        minutes = timer.querySelector('.minutes'),
        second = timer.querySelector('.seconds'),
        timeInterval = setInterval(updateClock,1000);

        function updateClock() {
            let t = getTimeRemaining(endtime = deadLine);
                hours.textContent = formatTime(t.hours);
                minutes.textContent = formatTime(t.minutes);
                second.textContent = formatTime(t.seconds);
            if (t.total <= 0) {
                clearInterval(timeInterval);
                hours.textContent = '00';
                minutes.textContent = '00';
                second.textContent = '00';
            }
        }
        function formatTime(time) {
            if (time < 10) {
                time = '0' + time;
            }
            return time;
        }
    }
    setLock('timer', deadLine);

    //Создания модального окна;

    // let more = document.querySelector('.more'),
    //     overlay = document.querySelector('.overlay'),
    //     popup_close = document.querySelector('.popup-close');
    //
    // more.addEventListener('click',function () {
    //     overlay.style.display = 'block';
    //     this.classList.add('more-splash');
    //     document.body.style.overflow = 'hidden';
    // });
    // popup_close.addEventListener('click',function () {
    //     overlay.style.display = 'none';
    //     more.classList.remove('more-splash');
    //     document.body.style.overflow = '';
    // })

    //  Создания модального окна функцией.

    function modelWindow(button,windows,closeWindow) {

        let button_call = document.querySelectorAll(button),
            window = document.querySelector(windows),
            close_call = document.querySelector(closeWindow),
            currentButton = 0;

            for (let i = 0; i < button_call.length;i++)
            {
                button_call[i].addEventListener('click',function () {
                    window.style.display = 'block';
                    this.classList.add('more-splash');
                    document.body.style.overflow = 'hidden';
                    currentButton = i;
                });
            }

        close_call.addEventListener('click', function () {
            window.style.display = 'none';
            button_call[currentButton].classList.remove('more-splash');
            document.body.style.overflow = '';
        });

    }
    // Вызов функции;
    modelWindow('.more','.overlay','.popup-close');
    modelWindow('.description-btn','.overlay','.popup-close');

    //Форма;
    let message = {
        loading : 'Загрузка...',
        success : 'Спасибо! Скоро мы с вами свяжемся',
        failure : 'Что-то пошло не так...',
    };

    let form = document.querySelector('.main-form'),
        input = document.getElementsByTagName('input'),
        statusMessage = document.createElement('div');
        statusMessage.classList.add('status');

        form.addEventListener('submit',function (event) {
        event.preventDefault();
        form.appendChild(statusMessage);
        let request = new XMLHttpRequest();
        request.open('POST', '');
        request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');

        let formatData = new FormData(form);

        let obj = {};
        formatData.forEach(function (value,key) {
            obj[key] = value;
        });
        let json = JSON.stringify(obj);
        request.send(json);

        request.addEventListener('readystatechange', function () {
            if (request.readyState < 4){
                statusMessage.innerHTML = message.loading;
            }
            else if (request.readyState === 4 && request.status === 200){
                statusMessage.innerHTML = message.success;
            }
            else {
                statusMessage.innerHTML = message.failure;
            }
        });
        for (let i = 0; i < input.length; i++) {
            input[i].value = '';
        }
    });


    let form_contact = document.getElementById('form');

    let inputContact = form_contact.getElementsByTagName('input');

        form_contact.addEventListener('submit', function (event) {

        event.preventDefault();

        form_contact.appendChild(statusMessage);

        let contact_data = new FormData(form_contact);

         let object_contact = {};

        contact_data.forEach(function (value,key) {
            object_contact[key] = value;
        });

        let json_contact = JSON.stringify(object_contact);

        function postData(data) {
            return new Promise(function (resolve, reject) {
                let request_contact = new XMLHttpRequest();
                request_contact.open('POST', '');
                request_contact.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
                request_contact.onreadystatechange = function () {
                    if (request_contact.readyState < 4) {
                        resolve()
                    } else if (request_contact.readyState === 4) {
                        if (request_contact.status === 200) {
                            resolve();
                        }
                    } else {
                        reject();
                    }
                };
                request_contact.send(json_contact);
            });
        }
        function clearInput() {
            for (let i = 0; i < inputContact.length; i++) {
                inputContact[i].value = '';
            }
        }
        postData(contact_data)
            .then(()=> statusMessage.innerHTML = message.success)
            .catch(() => statusMessage.innerHTML = message.failure)
            .then(clearInput)
        });

        //Калькулятор

    let people = document.querySelectorAll('.counter-block-input')[0],
        days = document.querySelectorAll('.counter-block-input')[1],
        totalValue = document.getElementById('total'),
        select_region = document.getElementById('select'),
        people_sum = 0,
        days_sum = 0,
        total_finish = 0;
        totalValue.innerHTML = 0;

    people.addEventListener('change', function () {

        people_sum = +this.value;

        if (days.value === '') {
            totalValue.innerHTML = 0;
        }
        else {
            total_finish = days_sum  * (people_sum * 4000);
            totalValue.innerHTML =  total_finish;
        }
    });

    days.addEventListener('change',function () {

         days_sum = +this.value;

          if (people.value === '') {
            totalValue.innerHTML = 0;
        }
        else {
            total_finish = days_sum  * (people_sum * 4000);
            totalValue.innerHTML =  total_finish;
        }
        totalValue.click();
    });

    select_region.addEventListener('change',function () {
        if (people.value === '' || days.value === ''){
            totalValue.innerHTML = 0;
        }
        else {
            let a = total_finish;
            totalValue.innerHTML = a * this.options[this.selectedIndex].value;
        }
    });

    function checkIn() {
        if (people.value === '' || days.value === '' ||
            people.value === 0 || days.value === 0){

            totalValue.innerHTML = 0;
        }
        else {
            totalValue.innerHTML = ''+days.value  * (people.value * 4000) * select_region.options[select_region.selectedIndex].value;
        }
        setTimeout(checkIn,1000)
    }
    checkIn();
});
