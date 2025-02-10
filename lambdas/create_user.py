import json
import boto3

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('YOUR_DYNAMODB_TABLE')

def lambda_handler(event, context):
    try:
        body = json.loads(event['body'])
        user_id = body.get('id')
        name = body.get('name')
        surname = body.get('surname')
        dob = body.get('dob')
        address = body.get('address')
        
        if not user_id or not name or not surname or not dob or not address:
            return {
                'statusCode': 400,
                'body': json.dumps({'message': 'All fields are required'})
            }
        
        table.put_item(
            Item={
                'user_id': user_id,
                'name': name,
                'surname': surname,
                'dob': dob,
                'address': address
            }
        )
        
        return {
            'statusCode': 201,
            'body': json.dumps({'message': 'User created successfully'})
        }
    
    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps({'message': str(e)})
        }