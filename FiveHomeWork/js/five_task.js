"use strict";
let money, time;

function start() {
    money = +prompt("Ваш бюджет на месяц?","");
    time = prompt("Введите дату в формате YYYY-MM-DD","");

    while (isNaN(money) || money === "" || money ==null){
        money = +prompt("Ваш бюджет на месяц?","");
    }
}


start();

let appData = {
    budget : money,
    dataTime : time,
    expenses : {},
    optionalExpenses : {},
    income : [],
    savings : true,
    chooseExpenses : function () {
            for(let i = 0; i < 2; i++) {
            let a = prompt("Введите обязательную статью расходов в этом месяце",""),
                b = +prompt("Во сколько обойдется?","");

            if ( (typeof (a) != null) && (typeof (a) === "string")
                &&  (typeof (b) != "undefined") && typeof (b) === "number"
                && a.length < 50 )
            {
                console.log("Done");
                appData.expenses[a] = b;
            }
            else {
                i = i-1;
            }
        }
    },
    detectDayBudget : function () {
        appData.moneyPerDay = (appData.budget / 30).toFixed();
        alert(`Ежедневный бюджет: ${appData.moneyPerDay} `);
    },
    detectLevel : function () {
        if (appData.moneyPerDay < 100) {
        console.log("Минимальный уровень достатка");
        }
        else if (appData.moneyPerDay > 100 && appData.moneyPerDay < 2000) {
            console.log("Средний уровень достатка");
        }
        else if (appData.moneyPerDay > 2000) {
            console.log("Высокий уровень достатка");
        }
        else {
            console.log("Error")
        }
    },
    checkSavings : function () {
            if (appData.savings === true) {
            let save = +prompt("Какова сумма накоплений?"),
                percent = +prompt("Под какой процент?");

            appData.monthIncome = save/100/12*percent;
            alert(`Доход в месяц  с вашего депозита: ${appData.monthIncome} `);
            }
    },
    chooseOptExpenses: function () {
            for(let i = 0; i < 3; i++) {
            appData.optionalExpenses[i] =  prompt("Статья необязательных расходов", "");
        }
    },
    chooseIncome : function () {
        let items = prompt("Что несет дополнительный доход? (Перечислите через запятую)","");
        appData.income = items.split(', ');
        appData.income.push(prompt("Может что-то ещё?",""));
        appData.income.sort();
        while ( typeof (items) !== "string" || items ==="" || typeof (items) == null){
            items = prompt("Что несет дополнительный доход? (Перечислите через запятую)","");
        }
        alert("Способы доп. заработка: ");
        appData.income.forEach(function(element,i){
            alert(`${i+1} : ${element}`)
        });
    }
};

console.log("Наша программа включает в себя данные: ");
console.log(Object.keys(appData));
