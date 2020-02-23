    startBtn = document.getElementById("start"),

    /* Получить все блоки в правой части программы через классы (которые имеют класс название-value, начиная с
    и заканчивая
    */
    budget = document.getElementsByClassName("budget-value")[0],
    dayBudget = document.getElementsByClassName("daybudget-value")[0],
    level = document.getElementsByClassName("level-value")[0],
    expensesvalue = document.getElementsByClassName("expenses-value")[0],
    optionalExpenses = document.getElementsByClassName("optionalexpenses-value")[0],
    income = document.getElementsByClassName("income-value")[0],
    monthSavings = document.getElementsByClassName("monthsavings-value")[0],
    yearSavings = document.getElementsByClassName("yearsavings-value")[0],
    year = document.getElementsByClassName("year-value")[0],
    month = document.getElementsByClassName("month-value")[0],
    day = document.getElementsByClassName("day-value")[0],

    /* Получить поля(input) c обязательными расходами через класс. (class=”expenses-item”)*/
    expensesItem = document.getElementsByClassName("expenses-item"),

    //Получить кнопки “Утвердить” и “Рассчитать” через Tag, каждую в своей переменной.
    OkButton = document.getElementsByTagName("button")[0],
    secondOkButton = document.getElementsByTagName("button")[1],
    calculateButton = document.getElementsByTagName("button")[2],

    //Получить поля для ввода необязательных расходов (optionalexpenses-item) при помощи querySelectorAll
    optionalExpensesElements = document.querySelectorAll('.optionalexpenses-item'),

    /*
        Получить оставшиеся поля через querySelector
    (статьи возможного дохода, чекбокс, сумма, процент, год, месяц, день)
    */
    chooseIncome = document.querySelectorAll(".choose-income")[0],
    savingsCheckBox = document.querySelectorAll("#savings")[0],
    sum = document.querySelectorAll(".choose-sum")[0],
    percent = document.querySelectorAll(".choose-percent")[0],
    year_value = document.querySelectorAll(".yearsavings-value")[0],
    month_value =document.querySelectorAll(".monthsavings-value")[0];


let money, time;


startBtn.addEventListener('click',function() {
    appData.buttonActive = true;
    buttonActive();
    money = +prompt("Ваш бюджет на месяц?", "");
    time = prompt("Введите дату в формате YYYY-MM-DD", "");

    while (isNaN(money) || money === "" || money == null) {
        money = +prompt("Ваш бюджет на месяц?", "");
    }
    appData.budget = money;
    appData.dataTime = time;
    budget.textContent = money.toFixed();
    year.value = new Date(Date.parse(time)).getFullYear();
    month.value = new Date(Date.parse(time)).getMonth() + 1;
    day.value = new Date(Date.parse(time)).getDay() +1;
});

OkButton.addEventListener('click',function () {
    let sum = 0;
    for(let i = 0; i < expensesItem.length; i++) {
        let a = expensesItem[i].value,
            b = expensesItem[++i].value;

        if ( (typeof (a) != null) && (typeof (b) != "undefined")
            && a.length < 50 )
        {
            appData.expenses[a] = +b;
            sum += +b
        }
        else {
            i-=1;
        }
    }
    expensesvalue.textContent = sum;
});

secondOkButton.addEventListener('click',function () {
    let opt = '';
    for(let i = 0; i < optionalExpensesElements.length; i++) {
       opt = optionalExpensesElements[i].value;
       appData.optionalExpenses[i] = opt;
       optionalExpenses.textContent +=  appData.optionalExpenses[i] + ' ';
    }
});

calculateButton.addEventListener('click',function () {
    if(appData.budget !== undefined) {
        appData.moneyPerDay =  ( (appData.budget - +expensesvalue.innerText ) / 30).toFixed();
        console.log(budget.value);
        console.log(expensesvalue.value);
        dayBudget.textContent = appData.moneyPerDay;
        if (appData.moneyPerDay < 100) {
            level.textContent = "Минимальный уровень достатка";
        } else if (appData.moneyPerDay > 100 && appData.moneyPerDay < 2000) {
            level.textContent = "Средний уровень достатка";
        } else if (appData.moneyPerDay > 2000) {
            level.textContent = "Высокий уровень достатка";
        } else {
            level.textContent = "Error";
        }
    }
    else {
        dayBudget.textContent = 'Произошла ошибка';
    }
});

chooseIncome.addEventListener('input',function () {
    let items = chooseIncome.value;
    appData.income = items.split(', ');
    income.textContent = appData.income;
});

savingsCheckBox.addEventListener('click',function () {
    appData.savings = appData.savings !== true;
});

sum.addEventListener('input',function () {
    console.log(appData.savings);
    if (appData.savings === true) {
        let sumCurrent = +sum.value,
            percent_value = +percent.value;

        appData.yearIncome = sumCurrent/100/12*percent_value;
        appData.monthIncome = sumCurrent/100*percent_value;

        year_value.textContent = appData.yearIncome.toFixed(1);
        month_value.textContent = appData.monthIncome.toFixed(1);
    }
});


percent.addEventListener('input',function () {
    if (appData.savings === true) {
        let sumCurrent = +sum.value,
            percent_value = +percent.value;

        appData.yearIncome = sumCurrent/100/12*percent_value;
        appData.monthIncome = sumCurrent/100*percent_value;

        year_value.textContent = appData.yearIncome.toFixed(1);
        month_value.textContent = appData.monthIncome.toFixed(1);
    }
});

function buttonActive() {
    if (appData.buttonActive === false)
    {
        OkButton.disabled = true;
        secondOkButton.disabled = true;
        calculateButton.disabled = true;
    }
    else {
        OkButton.disabled = false;
        secondOkButton.disabled = false;
        calculateButton.disabled = false;
    }
}
let appData = {
    budget: money,
    dataTime: time,
    expenses: {},
    optionalExpenses: {},
    income: [],
    savings: false,
    buttonActive : false,
};
buttonActive();