const { connectionToRabbitMq } = require("../utils/functions");

const QUEUE_NAME = "userQueue"

exports.getUserDetailsController = async (req, res) => {
  const { name, email, age } = req.body;

  if (!name || !email || !age) {
    return res.status(400).send("Name, email, and age are required.");
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).send("Invalid email format.");
  }

  const channelPromise  = connectionToRabbitMq(); 

  try {
    const channel = await channelPromise;
    await channel.sendToQueue(
      QUEUE_NAME,
      Buffer.from(JSON.stringify({ name, email, age }))
    );
    res.status(200).send("User data received and queued.");
  } catch (error) {
    res.status(500).send("Error processing request.");
  }
};
