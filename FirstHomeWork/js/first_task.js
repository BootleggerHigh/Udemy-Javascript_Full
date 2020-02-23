"use strict";
let money = +prompt("Ваш бюджет на месяц?",""),
   time = prompt("Введите дату в формате YYYY-MM-DD",""),
   FirstExpenseItem = prompt("Введите обязательную статью расходов в этом месяце",""),
   FirstExpenseMoney = +prompt("Во сколько обойдется?",""),
   SecondExpenseItem = prompt("Введите обязательную статью расходов в этом месяце",""),
   SecondExpenseMoney = +prompt("Во сколько обойдется?","");

let appData = {
    budget : money,
    dataTime : time,
    expenses : {},
    optionalExpenses : {},
    income : [],
    savings : false,
};

appData.expenses.FirstExpenseItem = FirstExpenseMoney;
appData.expenses.SecondExpenseItem = SecondExpenseMoney;

alert(appData.budget / 30);
