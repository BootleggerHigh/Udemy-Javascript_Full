"use strict";
let money = +prompt("Ваш бюджет на месяц?",""),
   time = prompt("Введите дату в формате YYYY-MM-DD","");


let appData = {
    budget : money,
    dataTime : time,
    expenses : {},
    optionalExpenses : {},
    income : [],
    savings : false,
};

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

//let i = 0;
//----- do while -----
/*
do {
    i++;
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
        console.log("Error")
    }
}while(i > 2);
*/

//----- while -----
/*
while (i > 2) {
    i++;
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
        console.log("Error")
    }
}
*/

appData.moneyPerDay = appData.budget / 30;

alert(`Ежедневный бюджет: ${appData.moneyPerDay} `);

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