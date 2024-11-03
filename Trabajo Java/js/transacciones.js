export let balance = 50000;
export let transactions = [];
const transactionHistory = document.getElementById("transactionHistory");
export function addFunds() {
    Swal.fire({
        title: 'Ingresa el monto a añadir:',
        input: 'number',
        inputAttributes: {
            min: 0,
            step: 0.01
        },
        showCancelButton: true,
        confirmButtonText: 'Añadir',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.value) {
            const amount = parseFloat(result.value);
            balance += amount;
            addTransaction("Depósito", amount);
            updateTransactionHistory();
            Swal.fire('Añadido', `Se ha añadido $${amount.toLocaleString("es-CL")} a tu cuenta.`, 'success');
            actualizarSaldoUI();
        }
    });
}
export function removeFunds() {
    Swal.fire({
        title: 'Ingresa el monto a quitar:',
        input: 'number',
        inputAttributes: {
            min: 0,
            step: 0.01
        },
        showCancelButton: true,
        confirmButtonText: 'Quitar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.value) {
            const amount = parseFloat(result.value);
            if (amount <= balance) {
                balance -= amount;
                addTransaction("Retiro", -amount);
                updateTransactionHistory();
                Swal.fire('Quitado', `Se ha quitado $${amount.toLocaleString("es-CL")} de tu cuenta.`, 'success');
                actualizarSaldoUI();
            } else {
                Swal.fire('Saldo insuficiente', 'No puedes realizar esta operación.', 'warning');
            }
        }
    });
}
export function simulatePurchase(item, price) {
    if (balance >= price) {
        balance -= price;
        addTransaction(`Compra de ${item}`, -price);
        updateTransactionHistory();
        Swal.fire('Compra realizada', `Has comprado ${item} por $${price.toLocaleString("es-CL")}.`, 'success');
        actualizarSaldoUI();
    } else {
        Swal.fire('Saldo insuficiente', 'No tienes suficiente saldo para esta compra.', 'warning');
    }
}
export function addTransaction(concept, amount) {
    const transaction = {
        concept: concept,
        amount: amount,
        date: new Date().toLocaleString(),
        id: transactions.length + 1
    };
    transactions.push(transaction);
    localStorage.setItem("transactions", JSON.stringify(transactions));
    updateTransactionHistory();
}
export function updateTransactionHistory() {
    transactionHistory.innerHTML = "";
    transactions.forEach((transaction) => {
        const transactionItem = document.createElement("li");
        transactionItem.innerText = `${transaction.date} - ${transaction.concept}: $${transaction.amount.toLocaleString("es-CL")}`;
        transactionHistory.appendChild(transactionItem);
    });
}
export function loadTransactions() {
    const savedTransactions = localStorage.getItem("transactions");
    if (savedTransactions) {
        transactions = JSON.parse(savedTransactions);
        updateTransactionHistory();
    }
}
export function actualizarSaldoUI() {
    document.getElementById("saldo").textContent = `Saldo: $${balance.toLocaleString("es-CL")}`;
}
loadTransactions();
actualizarSaldoUI();