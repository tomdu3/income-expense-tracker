// setup data structure

let expenseTrackerData = {
    income: [],
    expenses: []
};

const totalIncome = document.querySelector('#totalIncome');
const totalExpenses = document.querySelector('#totalExpenses');
const balance = document.querySelector('#balance');
let totalIncomeAmount = 0;
let totalExpensesAmount = 0;
let balanceAmount = 0;

// load data from local storage if it exists
if (localStorage.getItem('expenseTrackerData')) {
    expenseTrackerData = JSON.parse(localStorage.getItem('expenseTrackerData'));
    console.log(expenseTrackerData);  // TODO: Remove in final version
    // display data on header
    updateCurrentState();
}

// get data from the form on submit
const form = document.querySelector('form');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const type = formData.get('type');
    const description = formData.get('description');
    const amount = formData.get('amount');
    console.log(type, description, amount);  // TODO: Remove in final version, check if the data is correct
    // separate data based on type and add it to the data structure
    if (type === 'income') {
        expenseTrackerData.income.push({ description, amount });
    } else {
        expenseTrackerData.expenses.push({ description, amount });
    }
    // save data to local storage
    localStorage.setItem('expenseTrackerData', JSON.stringify(expenseTrackerData));
    form.reset();
    updateCurrentState();
});

// Reset the form
const resetBtn = document.querySelector('#resetBtn');
resetBtn.addEventListener('click', () => {
    form.reset();
});

// update the total income, total expenses, and balance
function updateCurrentState() {
    if (expenseTrackerData.income.length !== 0){
        totalIncomeAmount = expenseTrackerData.income.reduce((acc, cur) => acc + parseFloat(cur.amount), 0);
        console.log(totalIncomeAmount);
        console.log(expenseTrackerData.income);
        }
    if (expenseTrackerData.expenses.length !== 0){
        totalExpensesAmount = expenseTrackerData.expenses.reduce((acc, cur) => acc + parseFloat(cur.amount), 0);
    }
    balanceAmount = totalIncomeAmount - totalExpensesAmount;
    totalIncome.textContent = `${currencyFormat(totalIncomeAmount)}`;
    totalExpenses.textContent = `${currencyFormat(totalExpensesAmount)}`;
    balance.textContent = `${currencyFormat(balanceAmount)}`;
}

function currencyFormat(num) {
    return num.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
      });
}