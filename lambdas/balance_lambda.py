import json
import boto3
from boto3.dynamodb.conditions import Key

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('SecureBankAccounts')

def lambda_handler(event, context):
    try:
        # Parse the account_id from the path parameters
        account_id = str(event['accountId'])
        # account_id = event['pathParameters']['accountId']

        # Query the DynamoDB table for the account balance
        response = table.get_item(
            Key={'account_id': account_id}
        )

        # Check if the account exists
        if 'Item' not in response:
            return {
                'statusCode': 404,
                'body': json.dumps({'error': 'Account not found'})
            }

        # Extract the balance from the response
        balance = response['Item']['balance']

        return {
            'statusCode': 200,
            'body': json.dumps({'accountId': account_id, 'balance': float(balance)})
        }
    except Exception as e:
        return {
            'statusCode': 400,
            'body': json.dumps({'error': str(e)})
        }