
    let inputRub = document.getElementById('rub'),
            inputUsd = document.getElementById('usd');

    inputRub.addEventListener('input', () => {
        const promise = () => {
            return new Promise((resolve, reject) => {

                let request = new XMLHttpRequest();
                request.open('GET', 'js/current.json');
                request.setRequestHeader('Content-type', 'application/json; charset=utf-8');

               request.onreadystatechange = function () {
                    if (request.readyState === 4 ){
                        if (request.status === 200) {
                            resolve(request.response);
                        }
                        else {
                            reject();
                        }
                    }
                };
               request.send();
            });
        };

        promise()
            .then((response) => {
                let data = JSON.parse(response);
        inputUsd.value = (inputRub.value / data.usd).toFixed(2);
            })
            .catch(() => {
                inputUsd.value = "Что-то пошло не так!";
            });
    });