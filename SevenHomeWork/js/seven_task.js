let BIG_INFO = {

    // Получить кнопку "Начать расчет" через id
    start : document.getElementById("start"),

    /* Получить все блоки в правой части программы через классы (которые имеют класс название-value, начиная с
    и заканчивая
    */
    budget : document.getElementsByClassName("budget-value")[0],
    dayBudget : document.getElementsByClassName("daybudget-value")[0],
    level : document.getElementsByClassName("level-value")[0],
    expenses : document.getElementsByClassName("expenses-value")[0],
    optionalExpenses : document.getElementsByClassName("optionalexpenses-value")[0],
    income : document.getElementsByClassName("income-value")[0],
    monthSavings : document.getElementsByClassName("monthsavings-value")[0],
    yearSavings : document.getElementsByClassName("yearsavings-value")[0],
    year : document.getElementsByClassName("year-value")[0],
    month : document.getElementsByClassName("month-value")[0],
    day : document.getElementsByClassName("day-value")[0],

    /* Получить поля(input) c обязательными расходами через класс. (class=”expenses-item”)*/
    chooseExpenses : document.getElementsByClassName("expenses-item"),

    //Получить кнопки “Утвердить” и “Рассчитать” через Tag, каждую в своей переменной.
    OkButton : document.getElementsByTagName("button")[0],
    secondOkButton : document.getElementsByTagName("button")[1],
    calculateButton : document.getElementsByTagName("button")[2],

    //Получить поля для ввода необязательных расходов (optionalexpenses-item) при помощи querySelectorAll
    optionalExpensesElements : document.querySelectorAll('.optionalexpenses-item'),

    /*
        Получить оставшиеся поля через querySelector
    (статьи возможного дохода, чекбокс, сумма, процент, год, месяц, день)
    */
    chooseIncome : document.querySelectorAll(".choose-income"),
    savingsCheckBox : document.querySelectorAll("#savings"),
    sum : document.querySelectorAll(".choose-sum"),
    percent : document.querySelectorAll(".choose-percent"),
    year_value : document.querySelectorAll(".year-value"),
    month_value :document.querySelectorAll(".month-value"),
    day_value : document.querySelectorAll(".day-value"),
};

// Вывод доступных свойств
console.log(Object.keys(BIG_INFO));

// Вывод значений доступных свойств
console.log(Object.values(BIG_INFO));