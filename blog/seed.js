const mongoose = require('mongoose');
const Blog = require('./server').Blog;

mongoose.connect('mongodb://localhost:27017/blogdb', { useNewUrlParser: true, useUnifiedTopology: true });

async function seed() {
  await Blog.deleteMany();

  const users = ['Alice', 'Bob', 'Charlie'];
  const blogs = [
    { author: users[0], title: 'Poszt 1', category: 'Tech', content: 'Első poszt...', createdAt: new Date(), updatedAt: new Date() },
    { author: users[0], title: 'Poszt 2', category: 'Életmód', content: 'Második poszt...', createdAt: new Date(), updatedAt: new Date() },
    { author: users[1], title: 'Poszt 3', category: 'Utazás', content: 'Harmadik poszt...', createdAt: new Date(), updatedAt: new Date() },
    { author: users[1], title: 'Poszt 4', category: 'Kultúra', content: 'Negyedik poszt...', createdAt: new Date(), updatedAt: new Date() },
    { author: users[2], title: 'Poszt 5', category: 'Tech', content: 'Ötödik poszt...', createdAt: new Date(), updatedAt: new Date() },
    { author: users[2], title: 'Poszt 6', category: 'Tudomány', content: 'Hatodik poszt...', createdAt: new Date(), updatedAt: new Date() },
  ];
  await Blog.insertMany(blogs);
  console.log('Adatbázis feltöltve.');
  process.exit();
}

seed();
