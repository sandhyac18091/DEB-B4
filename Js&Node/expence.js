let expenses = [];

function submit() {
    const amount = document.getElementById('amt').value;
    const date = document.getElementById('date').value;
    const expenseType = document.getElementById('typexpence').value; 

    if (amount!=0 && date!=0 && isNaN(amount) && amount <= 0) {
        alert('Please enter a valid amount and date.');
        return;
    }

    expenses.push({ expenseType, amount, date });

    alert('Expense added successfully!');
    document.getElementById('amt').value = '';
    document.getElementById('date').value = '';
    document.getElementById('inputs').innerHTML = '';
}

function showExpense() {
    if (expenses.length == 0) {
        alert('No expenses found!');
        return;
    }

    
    let expenseList = 'expenses:\n';
    expenses.forEach((expense, index) => {
        expenseList += `${index + 1}. ${expense.expenseType}, Amount: ${expense.amount}, Date: ${expense.date}\n`;
    });

    alert(expenseList);
}
