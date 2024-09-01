import json
import boto3
import uuid
from decimal import Decimal
from boto3.dynamodb.conditions import Key

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('SecureBankAccounts')

def lambda_handler(event, context):
    try:
        # Parse the incoming event from API Gateway
        from_account_id = str(event['fromAccountId'])
        to_account_id = str(event['toAccountId'])
        amount = Decimal(str(event['amount']))  # Convert to Decimal for DynamoDB
        transaction_type = event['transactionType']
        description = event.get('description', '')

        # Generate a unique transaction ID
        transaction_id = str(uuid.uuid4())

        # Perform the transaction
        if transaction_type == 'transfer':
            # Deduct from the sender's account
            table.update_item(
                Key={'account_id': from_account_id},
                UpdateExpression='SET balance = balance - :amount',
                ConditionExpression='balance >= :amount',
                ExpressionAttributeValues={':amount': amount}
            )
            # Add to the receiver's account
            table.update_item(
                Key={'account_id': to_account_id},
                UpdateExpression='SET balance = balance + :amount',
                ExpressionAttributeValues={':amount': amount}
            )
        elif transaction_type == 'deposit':
            table.update_item(
                Key={'account_id': to_account_id},
                UpdateExpression='SET balance = balance + :amount',
                ExpressionAttributeValues={':amount': amount}
            )
        elif transaction_type == 'withdrawal':
            table.update_item(
                Key={'account_id': from_account_id},
                UpdateExpression='SET balance = balance - :amount',
                ConditionExpression='balance >= :amount',
                ExpressionAttributeValues={':amount': amount}
            )
        else:
            raise ValueError('Invalid transaction type')

        # Record the transaction in a separate transactions table
        transactions_table = dynamodb.Table('SecureBankTransactions')
        transactions_table.put_item(
            Item={
                'transaction_id': transaction_id,
                'from_account_id': from_account_id,
                'to_account_id': to_account_id,
                'amount': amount,
                'type': transaction_type,
                'description': description,
                'timestamp': str(context.get_remaining_time_in_millis())
            }
        )

        return {
            'statusCode': 200,
            'body': json.dumps({'message': 'Transaction successful', 'transactionId': transaction_id})
        }
    except Exception as e:
        return {
            'statusCode': 400,
            'body': json.dumps({'error': str(e)})
        }