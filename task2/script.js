const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');

const localStorageTransactions = JSON.parse(
  localStorage.getItem('transactions')
);

let transactions =
  localStorage.getItem('transactions').length === 0 
  ? []
  : localStorageTransactions; 

// Add transaction
function addTransaction(e) {
  e.preventDefault();

  if (!text.value && !amount.value) {
    alert('Transaction name and amount are required');
  } else if (!text.value) {
    alert('Transaction name is required');
  } else if (!amount.value) {
    alert('Transaction amount is required');
  } else {
    const transaction = {
      id: generateID(),
      text: text.value,
      amount: +amount.value
    };

    transactions.push(transaction);

    addTransactionDOM(transaction);

    updateValues();

    updateLocalStorage();

    text.value = '';
    amount.value = '';
  }
}

// Generate random ID
function generateID() {
  return Math.ceil(Math.random() * 999);
}

// Add transactions to DOM list
function addTransactionDOM(transaction) {
  // Get sign
  const sign = transaction.amount < 0 ? '- ' : '+ ';

  const item = document.createElement('li');

  // Add class based on value
  item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');

  item.innerHTML = `
    ${transaction.text}
    <span>${sign}${Math.abs(
    transaction.amount
  )}</span>
  <button class="delete-btn" onclick="removeTransaction(${
    transaction.id
  })">Delete</button>
  `;

  list.appendChild(item);
}

// Update the balance, income and expense
function updateValues() {
  const amounts = transactions.map(transaction => transaction.amount);
  const total = amounts.reduce((sum, item) => (sum += item), 0).toFixed(2);

  const income = amounts
    .filter(item => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);

  const expense = (
    amounts
      .filter(item => item < 0)
      .reduce((sum, item) => (sum += item), 0) * -1
  ).toFixed(2);

  balance.innerText = `Rp ${Number(total).toLocaleString(['ban', 'id'])}`;
  money_plus.innerText = `Rp ${Number(income).toLocaleString(['ban', 'id'])}`;
  money_minus.innerText = `Rp ${Number(expense).toLocaleString(['ban', 'id'])}`;
}

// Remove transaction by ID
function removeTransaction(id) {
  transactions = transactions.filter(transaction => transaction.id !== id);

  updateLocalStorage();

  init();
}

// Update local storage transactions
function updateLocalStorage() {
  localStorage.setItem('transactions', JSON.stringify(transactions));
}

// Init app
function init() {
  list.innerHTML = '';

  transactions.forEach(addTransactionDOM);
  updateValues();
}

init();

form.addEventListener('submit', addTransaction);