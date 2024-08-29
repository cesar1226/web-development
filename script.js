// Simulated user token (in a real app, this would come from your authentication process)
// En script.js manejarías las solicitudes al backend para:
// - Verificar credenciales al iniciar sesión
// - Obtener el saldo del usuario
// - Realizar transacciones (depósitos, retiros, transferencias)

const userToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';

async function performTransaction(fromAccountId, toAccountId, amount, type, description) {
    try {
        const response = await fetch('https://api.securebank.com/transactions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + userToken
            },
            body: JSON.stringify({
                fromAccountId,
                toAccountId,
                amount,
                type,
                description
            })
        });

        if (!response.ok) {
            throw new Error('Transaction failed');
        }

        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

document.getElementById('transactionForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const resultDiv = document.getElementById('result');
    resultDiv.textContent = 'Processing transaction...';

    try {
        const result = await performTransaction(
            this.fromAccountId.value,
            this.toAccountId.value,
            this.amount.value,
            this.transactionType.value,
            this.description.value
        );
        resultDiv.textContent = `Transaction successful! Transaction ID: ${result.transactionId}`;
    } catch (error) {
        resultDiv.textContent = `Transaction failed: ${error.message}`;
    }
});