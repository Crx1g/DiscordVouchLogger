const express = require('express');
const mongoose = require('mongoose');
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

// Define route for displaying messages
app.get('index.html', async (req, res) => {
  try {
    // Retrieve messages from MongoDB
    const messages = await Message.find();
    // Render messages in EJS template
    res.render('index', { messages });
  } catch (err) {
    console.log(err);
    res.status(500).send('Internal server error');
  }
});

// Start server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});
