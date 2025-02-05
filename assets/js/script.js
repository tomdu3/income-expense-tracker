// setup data structure

let expenseTrackerData = {
    income: [],
    expense: []
};

const totalIncome = document.querySelector('#totalIncome');
const totalExpenses = document.querySelector('#totalExpenses');
const balance = document.querySelector('#balance');
let totalIncomeAmount = 0;
let totalExpensesAmount = 0;
let balanceAmount = 0;
let orderListDesc = true;

// load data from local storage if it exists
if (localStorage.getItem('expenseTrackerData')) {
    expenseTrackerData = JSON.parse(localStorage.getItem('expenseTrackerData'));
    console.log(expenseTrackerData);  // TODO: Remove in final version

    // Assign 'order' to existing transactions if missing
    let orderCounter = 1;
    // expenseTrackerData.income.forEach(transaction => {
    //     if (!transaction.hasOwnProperty('order')) {
    //         transaction.order = orderCounter++;
    //     }
    // });

    // expenseTrackerData.expense.forEach(transaction => {
    //     if (!transaction.hasOwnProperty('order')) {
    //         transaction.order = orderCounter++;
    //     }
    // });
    localStorage.setItem('expenseTrackerData', JSON.stringify(expenseTrackerData));
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
    
    const currentTotal = expenseTrackerData.income.length + expenseTrackerData.expense.length;
    const order = currentTotal + 1;

    if (type === 'income') {
        expenseTrackerData.income.push({ description, amount, order });
    } else {
        expenseTrackerData.expense.push({ description, amount, order });
    }
    localStorage.setItem('expenseTrackerData', JSON.stringify(expenseTrackerData));
    form.reset();
    updateCurrentState();
    displayTransactions(document.querySelector('input[name="filter"]:checked').value);
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
    if (expenseTrackerData.expense.length !== 0){
        totalExpensesAmount = expenseTrackerData.expense.reduce((acc, cur) => acc + parseFloat(cur.amount), 0);
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



const transactionsBoxes = document.querySelectorAll("input[name='filter']");
const transactionsList = document.querySelector('#transactionsList');
const orderBtn = document.querySelector('#order');
// load transactions on page load
displayTransactions();

// toggle order
orderBtn.addEventListener('click', () => {
    // get value of the radio button
    let selectedValue = document.querySelector('input[name="filter"]:checked').value;  
    orderListDesc = !orderListDesc;
    orderBtn.dataset.desc = orderBtn.dataset.desc === 'desc' ? 'asc' : 'desc'
    orderBtn.innerHTML = orderBtn.dataset.desc === 'desc' ? '<span class="text-xs md:text-sm">Newest</span> <i class="fa-solid fa-arrow-up-wide-short"></i>' : '<span class="text-xs md:text-sm">Oldest</span> <i class="fa-solid fa-arrow-down-wide-short"></i>';
    displayTransactions(selectedValue, orderListDesc);
});

for (box of transactionsBoxes) {
    box.addEventListener('change', (e) => {
        if (e.target.value === 'all') {
            console.log('all');
            displayTransactions();
        } else if (e.target.value === 'income') {
            displayTransactions('income');
        } else if (e.target.value === 'expense') {
            displayTransactions('expense');
        }
    });
}

function displayTransactions(value = 'all', sortOrderDesc = true) {
    let displayData = [];

    for (const [key, values] of Object.entries(expenseTrackerData)) {
        for (const item of values) {
            displayData.push({ ...item, type: key });
        }
    }

    let filtered = value === 'all' ? displayData : displayData.filter(item => item.type === value);

    // Add sorting functionality
    filtered.sort((a, b) => {
        const comparison = a.order - b.order;
        return sortOrderDesc ? -comparison : comparison;
    });

    const entriesHtml = filtered.map(item => `
        <div class="flex items-center justify-between bg-gray-50 md:p-4 rounded-lg">
            <div class="flex-1">
                <span class="text-sm ${item.type === 'income' ? 'text-green-600' : 'text-red-600'}">
                    ${item.description}
                </span>
            </div>
            <div class="flex items-center gap-4">
                <span class="font-medium ${item.type === 'income' ? 'text-green-600' : 'text-red-600'}">
                    ${currencyFormat(parseFloat(item.amount))}
                </span>
                <button onclick="editEntry(${item.order})"
                    class="text-blue-600 hover:text-blue-800">
                    ✏️
                </button>
                <button onclick="deleteEntry(${item.order})"
                    class="text-red-600 hover:text-red-800">
                    🗑️
                </button>
            </div>
        </div>
    `).join('');

    transactionsList.innerHTML = entriesHtml;
}
