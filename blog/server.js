const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const PORT = 5000;

mongoose.connect('mongodb://localhost:27017/blogdb', { useNewUrlParser: true, useUnifiedTopology: true });

const blogSchema = new mongoose.Schema({
  author: String,
  title: String,
  category: String,
  content: String,
  createdAt: Date,
  updatedAt: Date
});

const Blog = mongoose.model('Blog', blogSchema);

app.use(cors());
app.use(bodyParser.json());

app.get('/blogs', async (req, res) => {
  const blogs = await Blog.find();
  res.json(blogs);
});

app.post('/blogs', async (req, res) => {
  const blog = new Blog({ ...req.body, createdAt: new Date(), updatedAt: new Date() });
  await blog.save();
  res.json(blog);
});

app.put('/blogs/:id', async (req, res) => {
  const blog = await Blog.findByIdAndUpdate(req.params.id, { ...req.body, updatedAt: new Date() }, { new: true });
  res.json(blog);
});

app.delete('/blogs/:id', async (req, res) => {
  await Blog.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
