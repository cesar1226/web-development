import json
import boto3

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('YOUR_DYNAMODB_TABLE')

def lambda_handler(event, context):
    try:
        body = json.loads(event['body'])
        user_id = body.get('user_id')
        name = body.get('name')
        email = body.get('email')
        phone = body.get('phone')
        address = body.get('address')
        
        if not user_id:
            return {
                'statusCode': 400,
                'body': json.dumps({'message': 'User ID is required'})
            }
        
        update_expression = "set name=:n, email=:e, phone=:p, address=:a"
        expression_values = {
            ':n': name,
            ':e': email,
            ':p': phone,
            ':a': address
        }
        
        table.update_item(
            Key={'user_id': user_id},
            UpdateExpression=update_expression,
            ExpressionAttributeValues=expression_values
        )
        
        return {
            'statusCode': 200,
            'body': json.dumps({'message': 'User information updated successfully'})
        }
    
    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps({'message': str(e)})
        }
