// Simulated user token (in a real app, this would come from your authentication process)
// En script.js manejarías las solicitudes al backend para:
// - Verificar credenciales al iniciar sesión
// - Obtener el saldo del usuario
// - Realizar transacciones (depósitos, retiros, transferencias)

function login() {
    // Aquí iría la lógica de autenticación
    document.getElementById('loginScreen').classList.remove('active');
    document.getElementById('dashboardScreen').classList.add('active');
}


function performTransaction(event) {

    const fromAccountId = document.getElementById('fromAccountId').value;
    const toAccountId = document.getElementById('toAccountId').value;
    const amount = document.getElementById('amount').value;
    const transactionType = document.getElementById('transactionType').value;
    const description = document.getElementById('description').value;
    const resultDiv = document.getElementById('transactionResult');

    resultDiv.textContent = 'Processing transaction...';

    const transactionApi = 'https://gauwee1jg9.execute-api.us-east-1.amazonaws.com/dev/transactions'
    
    var requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': 'QaIni1usrL2NLwj5BSmZ53YrUonoODhcazzdD0vR'
/*          'Access-Control-Allow-Origin': '*'
            'Access-Control-Allow-Methods': 'POST',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Credentials': true */
        },
        body: JSON.stringify({
            fromAccountId,
            toAccountId,
            amount,
            transactionType,
            description
        })
    }
    
    fetch(transactionApi, requestOptions)
        .then(response => response.json())
        .then(result => {
            resultDiv.textContent = 'Transaction Successful: ' + result.body;
        })
        .catch(error => {
            resultDiv.textContent = 'Transaction Failed: ' + error.message;
            });
    }


function getAccountBalance() {
    const accountId = document.getElementById('accountIdForBalance').value;
    const balanceResult = document.getElementById('balanceResult');
    balanceResult.textContent = 'Fetching balance...';

    const balanceApi = 'https://gauwee1jg9.execute-api.us-east-1.amazonaws.com/dev/balance'

    var requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': 'QaIni1usrL2NLwj5BSmZ53YrUonoODhcazzdD0vR'
/*          'Access-Control-Allow-Origin': 'https://ejercicio-web-development.s3.amazonaws.com',
            */
        },
        body: JSON.stringify({
            "accountId":accountId
        })
    }

    fetch(balanceApi, requestOptions)
        .then(response=> response.json())
        .then(result => {
            const parsedBody = JSON.parse(result.body)
            balanceResult.textContent = `Current balance: $${parsedBody.balance.toFixed(2)}`;
        })
        .catch(error => {
            balanceResult.textContent = `Failed to retrieve balance: ${error.message}`;
            console.error('Error:', error)
            throw error;
        });
    }

// Add event listeners when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const transactionForm = document.getElementById('transactionForm');
    const balanceButton = document.getElementById('checkBalance');

    transactionForm.addEventListener('submit', performTransaction);
    balanceButton.addEventListener('click', getAccountBalance);
});
