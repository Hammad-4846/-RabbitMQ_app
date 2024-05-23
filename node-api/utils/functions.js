const amqp = require('amqplib');

const QUEUE_NAME = "userQueue"
const RABBITMQ_HOST = process.env.RABBITMQ_HOST || 'localhost';


exports.connectionToRabbitMq = async function connectRabbitMQ() {
  const connection = await amqp.connect(`amqp://${RABBITMQ_HOST}`);
  const channel = await connection.createChannel();
  await channel.assertQueue(QUEUE_NAME);
  return channel;
};
