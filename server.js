const express = require('express');
const mongoose = require('mongoose');
const { Client, Intents } = require('discord.js');

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb+srv://user:pw@vouches.db.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log(err));

// Define schema for messages
const messageSchema = new mongoose.Schema({
  content: String,
  author: String,
  timestamp: Date,
});

// Create message model
const Message = mongoose.model('Message', messageSchema);

// Initialize Discord bot
const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

client.once('ready', () => {
  console.log('Ready!');
});

// Define route for retrieving messages
app.get('/messages', async (req, res) => {
  try {
    // Retrieve messages from MongoDB
    const messages = await Message.find();
    // Send messages as response to client
    res.send(messages);
  } catch (err) {
    console.log(err);
    res.status(500).send('Internal server error');
  }
});

// Serve static files
app.use(express.static('public'));

// Start server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});

client.login('MTAyMTU0Mjc5MDQ2NDgwMjg1Ng.Gy61d9.BWhg_slh66aqgGInAsVvEbJ25_IRV8-nDNZztE');
