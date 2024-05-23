import pika
import json
from pymongo import MongoClient
import os
import time

QUEUE_NAME = 'userQueue'
RABBITMQ_HOST = os.getenv('RABBITMQ_HOST', 'localhost')
MONGODB_URI = os.getenv('MONGODB_URI', 'mongodb://localhost:27017/userdb')
# MongoDB setup

client = MongoClient(MONGODB_URI)
db = client['userdb']
collection = db['users']

def callback(ch, method, properties, body):
    user_data = json.loads(body)
    print(f"Received user data: {user_data}")

    collection.insert_one(user_data)
    print("User data inserted into MongoDB")

def connect_to_rabbitmq():
    while True:
        try:
            connection = pika.BlockingConnection(pika.ConnectionParameters(RABBITMQ_HOST))
            channel = connection.channel()
            channel.queue_declare(queue=QUEUE_NAME, durable=True)  # Make queue durable
            return channel
        except pika.exceptions.AMQPConnectionError as e:
            print(f"Connection to RabbitMQ failed: {e}. Retrying in 10 seconds...")
            time.sleep(10)

# Connect to RabbitMQ with retry mechanism
channel = connect_to_rabbitmq()

channel.basic_consume(queue=QUEUE_NAME, on_message_callback=callback, auto_ack=True)

print('Waiting for messages. To exit press CTRL+C')
channel.start_consuming()