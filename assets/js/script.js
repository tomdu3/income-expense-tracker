// setup data structure

const expenseTrackerData = {
    income: [],
    expenses: []
};

// get data from the form on submit
const form = document.querySelector('form');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const type = formData.get('type');
    const description = formData.get('description');
    const amount = formData.get('amount');
    console.log(type, description, amount);  // check if the data is correct
    // separate data based on type and add it to the data structure
    if (type === 'income') {
        expenseTrackerData.income.push({ description, amount });
    } else {
        expenseTrackerData.expenses.push({ description, amount });
    }
    // save data to local storage
    localStorage.setItem('expenseTrackerData', JSON.stringify(expenseTrackerData));
    form.reset();
});