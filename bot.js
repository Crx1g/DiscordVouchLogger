const { Client, Intents } = require('discord.js');
const mongoose = require('mongoose');

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

client.on('messageCreate', async message => {
  // Only retrieve messages from a specific channel
  if (message.channelId === '1097180694863683584') {
    // Save message to MongoDB
    const newMessage = new Message({
      content: message.content,
      author: message.author.username,
      timestamp: message.createdTimestamp,
    });
    newMessage.save()
      .then(() => {
        console.log('Message saved to MongoDB');
      })
      .catch(err => {
        console.log(err);
      });
  }
});

client.login('MTAyMTU0Mjc5MDQ2NDgwMjg1Ng.Gy61d9.BWhg_slh66aqgGInAsVvEbJ25_IRV8-nDNZztE');
