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
    displayTransactions(document.querySelector('input[name="filter"]:checked').value, orderListDesc);
});

// Reset the form
const resetBtn = document.querySelector('#resetBtn');
resetBtn.addEventListener('click', () => {
    form.reset();
});

// update the total income, total expenses, and balance
function updateCurrentState() {
    if (expenseTrackerData.income.length !== 0) {
        totalIncomeAmount = expenseTrackerData.income.reduce((acc, cur) => acc + parseFloat(cur.amount), 0);
    }
    if (expenseTrackerData.expense.length !== 0) {
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
displayTransactions('all', orderListDesc);

// toggle order
orderBtn.addEventListener('click', () => {
    let selectedValue = document.querySelector('input[name="filter"]:checked').value;
    orderListDesc = !orderListDesc;
    orderBtn.dataset.desc = orderBtn.dataset.desc === 'desc' ? 'asc' : 'desc';
    orderBtn.innerHTML = orderBtn.dataset.desc === 'desc' ? 
        '<span class="text-xs md:text-sm">Newest</span> <i class="fa-solid fa-arrow-up-wide-short"></i>' : 
        '<span class="text-xs md:text-sm">Oldest</span> <i class="fa-solid fa-arrow-down-wide-short"></i>';
    displayTransactions(selectedValue, orderListDesc);
});

for (let box of transactionsBoxes) {
    box.addEventListener('change', (e) => {
        if (e.target.value === 'all') {
            displayTransactions('all', orderListDesc);
        } else if (e.target.value === 'income') {
            displayTransactions('income', orderListDesc);
        } else if (e.target.value === 'expense') {
            displayTransactions('expense', orderListDesc);
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
                    ${item.type === 'income' ? '+': '-'}${currencyFormat(parseFloat(item.amount))}
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

// Function to delete an entry
function deleteEntry(order) {
    // First delete the entry
    expenseTrackerData.income = expenseTrackerData.income.filter(item => item.order !== order);
    expenseTrackerData.expense = expenseTrackerData.expense.filter(item => item.order !== order);
    
    // Reorder all remaining entries
    reorderEntries();
    
    // Update storage and display
    localStorage.setItem('expenseTrackerData', JSON.stringify(expenseTrackerData));
    updateCurrentState();
    displayTransactions(document.querySelector('input[name="filter"]:checked').value);
}

// Function to reorder entries
function reorderEntries() {
    // Combine all entries and sort them by current order
    let allEntries = [];
    
    // Get income entries with type
    expenseTrackerData.income.forEach(item => {
        allEntries.push({ ...item, type: 'income' });
    });
    
    // Get expense entries with type
    expenseTrackerData.expense.forEach(item => {
        allEntries.push({ ...item, type: 'expense' });
    });
    
    // Sort by current order
    allEntries.sort((a, b) => a.order - b.order);
    
    // Reassign new sequential orders
    allEntries.forEach((item, index) => {
        item.order = index + 1;
    });
    
    // Clear existing arrays
    expenseTrackerData.income = [];
    expenseTrackerData.expense = [];
    
    // Redistribute entries back to their respective arrays
    allEntries.forEach(item => {
        const { type, ...entry } = item;
        if (type === 'income') {
            expenseTrackerData.income.push(entry);
        } else {
            expenseTrackerData.expense.push(entry);
        }
    });
}

// Function to edit an entry
function editEntry(order) {
    let transaction = [...expenseTrackerData.income, ...expenseTrackerData.expense]
        .find(item => item.order === order);
    
    if (!transaction) return;
    
    const element = document.querySelector(`button[onclick="editEntry(${order})"]`).closest('.flex.items-center.justify-between');
    const typeClass = transaction.type === 'income' ? 'text-black' : 'text-black';
    
    element.innerHTML = `
        <div class="flex items-center justify-between w-full">
            <div class="flex-1">
                <input type="text" value="${transaction.description}" 
                       class="bg-transparent w-full text-sm ${typeClass} focus:outline-none"
                       id="edit-description-${order}">
            </div>
            <div class="flex items-center gap-4">
                <input type="number" value="${transaction.amount}" 
                       class="bg-transparent w-24 text-right font-medium ${typeClass} focus:outline-none"
                       id="edit-amount-${order}">
                <button onclick="saveEdit(${order})" class="text-green-600 hover:text-green-800">✏️</button>
                <button onclick="cancelEdit(${order})" class="text-red-600 hover:text-red-800">🗑️</button>
            </div>
        </div>
    `;

    // Add event listeners for enter and escape keys
    const descInput = document.getElementById(`edit-description-${order}`);
    const amountInput = document.getElementById(`edit-amount-${order}`);
    
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            saveEdit(order);
        }
        if (e.key === 'Escape') {
            cancelEdit(order);
        }
    };

    descInput.addEventListener('keyup', handleKeyPress);
    amountInput.addEventListener('keyup', handleKeyPress);

    // Focus on description input
    descInput.focus();
}

// Function to save edited entry
function saveEdit(order) {
    const newDescription = document.getElementById(`edit-description-${order}`).value;
    const newAmount = document.getElementById(`edit-amount-${order}`).value;
    
    if (!newDescription.trim() || !newAmount) {
        return; // Don't save if fields are empty
    }

    ['income', 'expense'].forEach(type => {
        const index = expenseTrackerData[type].findIndex(item => item.order === order);
        if (index !== -1) {
            expenseTrackerData[type][index].description = newDescription;
            expenseTrackerData[type][index].amount = newAmount;
        }
    });
    
    localStorage.setItem('expenseTrackerData', JSON.stringify(expenseTrackerData));
    updateCurrentState();
    displayTransactions(document.querySelector('input[name="filter"]:checked').value);
}

// Function to cancel editing
function cancelEdit(order) {
    displayTransactions(document.querySelector('input[name="filter"]:checked').value);
}