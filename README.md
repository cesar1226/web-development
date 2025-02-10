# SecureBank Application

SecureBank is a simple web-based banking application built using HTML, CSS, and JavaScript, with backend services powered by AWS.

## Features

- User authentication (login functionality in development)
- Dashboard for account management
- Perform transactions (deposit, withdrawal, transfer)
- Check account balance

## File Structure

- `index.html`: Main HTML file containing the structure of the application
- `script.js`: JavaScript file handling user interactions and API calls
- `style.css`: CSS file for styling the application
- `config/config.js`: Configuration file containing API endpoints and API key (not included in this repository). 
It contains simple exports to call in the javascript. Create it with this structure
```javascript
export const API_ENDPOINTS = {
  make_transaction: 'endpoint-1',
  get_balance: 'endpoint-2',
  create_user: 'endpoint-3'
};
export const API_KEY = 'your-api-key';
```

- `lambdas`: Python code for the lambdas in AWS. They will be the endpoints for our web app
- `docs`: Complementary information on how to test the api gateway using curl command

## Arquitecture
![alt text](</docs/webserver_infra.png>)

## Setup and Installation

1. Clone this repository to your local machine.
2. Set up your AWS backend services (Lambda functions, API Gateway, DynamoDB).
3. Update the `config/config.js` file with your API endpoints and API key.
4. Open `index.html` in a web browser to run the application.

## Usage

1. Log in to the application (authentication logic to be implemented).
2. Use the dashboard to perform transactions or check your account balance.
3. For transactions, fill in the required fields and click "Submit Transaction".
4. To check your balance, enter your Account ID and click "Check Balance".

## API Endpoints

The application interacts with two main API endpoints url that you need to create first in the api gateway service:

1. Transaction API: `API_ENDPOINTS.transaction`
2. Balance API: `API_ENDPOINTS.balance`

Make sure these endpoints are correctly configured in your AWS setup.

## How to test

You can always launch a curl command to your endpoint mocking the data of the user.
```bash
curl -X POST https://<UNIQUE ID>.execute-api.us-east-1.amazonaws.com/dev/ \
-H "Content-Type: application/json" \
-d '{"Param1":"1", "Param2":"2"}'
```

## Database Schema

The application uses two main tables in DynamoDB:

### 1. Accounts Table

- **Table Name**: `Accounts`
- **Primary Key**: `account_id` (String)
- **Attributes**:
  - `balance` (Number)
  - `user_address` (String)
  - `user_name` (String)

### 2. Transactions Table

- **Table Name**: `Transactions`
- **Primary Key**: `transaction_id` (String)
- **Sort Key (optional)**: `timestamp` (String - ISO8601 timestamp)
- **Attributes**:
  - `from_account_id` (String)
  - `to_account_id` (String)
  - `amount` (Number)
  - `transaction_type` (String - 'deposit', 'withdrawal', or 'transfer')
  - `description` (String)

## Security Considerations

- Ensure that your API key is kept secret and not exposed in client-side code.
- Implement proper authentication and authorization mechanisms.
- Use HTTPS for all API communications.
- Sanitize and validate all user inputs before processing.

## Future Improvements

- Implement user authentication and session management.
- Add more robust error handling and user feedback.
- Enhance the UI/UX with additional features and responsiveness.
- Implement transaction history viewing.

## Contributing

Contributions to improve SecureBank are welcome. Please fork the repository and submit a pull request with your changes.

## License

[Add your chosen license here]
