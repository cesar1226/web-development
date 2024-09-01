
// In script.js we should handle:
// - Verify the user with some authentication methods
// - Obtain the account balance of the user
// - Being able to perfomr actions such as deposit, transfer and withdrawal

// Import the configuration
import { API_ENDPOINTS, API_KEY } from './config/config.js';

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

    var requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': API_KEY
/*          'Access-Control-Allow-Origin': '*'
            'Access-Control-Allow-Methods': 'POST',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Credentials': true */
        },
        body: JSON.stringify({
            "fromAccountId":fromAccountId,
            "toAccountId": toAccountId,
            "amount": amount,
            "transactionType": transactionType,
            "description": description
        })
    }
    
    fetch(API_ENDPOINTS.transaction, requestOptions)
        .then(response => response.json())
        .then(result => {
            const parsedBody = JSON.parse(result.body)
            resultDiv.textContent = `Transaction Successful: ${parsedBody.transactionId}`;
        })
        .catch(error => {
            resultDiv.textContent = 'Transaction Failed: ' + error.message;
            });
    }

function getAccountBalance() {
    const accountId = document.getElementById('accountIdForBalance').value;
    const balanceResult = document.getElementById('balanceResult');
    balanceResult.textContent = 'Fetching balance...';

    var requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': API_KEY
/*          'Access-Control-Allow-Origin': 'https://bucket_nm.s3.amazonaws.com' */
        },
        body: JSON.stringify({
            "accountId":accountId
        })
    }

    fetch(API_ENDPOINTS.balance, requestOptions)
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
