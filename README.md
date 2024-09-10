# SecureBank Application

SecureBank is a simple web-based banking application built using HTML, CSS, and JavaScript, with backend services powered by AWS.

## Features

- User authentication (login functionality)
- Dashboard for account management
- Perform transactions (deposit, withdrawal, transfer)
- Check account balance

## File Structure

- `index.html`: Main HTML file containing the structure of the application
- `script.js`: JavaScript file handling user interactions and API calls
- `style.css`: CSS file for styling the application
- `config/config.js`: Configuration file containing API endpoints and API key (not included in this repository)

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

The application interacts with two main API endpoints:

1. Transaction API: `API_ENDPOINTS.transaction`
2. Balance API: `API_ENDPOINTS.balance`

Make sure these endpoints are correctly configured in your AWS setup.

## Database Schema

The application uses two main tables in DynamoDB:

### 1. Accounts Table

- **Table Name**: `Accounts`
- **Primary Key**: `accountId` (String)
- **Attributes**:
  - `balance` (Number)
  - `owner` (String)
  - `createdAt` (String - ISO8601 timestamp)
  - `updatedAt` (String - ISO8601 timestamp)

### 2. Transactions Table

- **Table Name**: `Transactions`
- **Primary Key**: `transactionId` (String)
- **Sort Key**: `timestamp` (String - ISO8601 timestamp)
- **Attributes**:
  - `fromAccountId` (String)
  - `toAccountId` (String)
  - `amount` (Number)
  - `transactionType` (String - 'deposit', 'withdrawal', or 'transfer')
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