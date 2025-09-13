const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const { Schema } = mongoose;

const app = express();
const PORT = process.env.PORT || 5000;

const allowedOrigins = [
  'https://biblemining.in', // మీ లైవ్ డొమైన్
  'https://bible-mining-frontend.vercel.app', // Vercel ఇచ్చే URL
  'http://localhost:3000'
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
};

app.use(cors(corsOptions));
app.use(express.json());
app.use('/uploads', express.static('uploads'));

mongoose.connect(process.env.MONGO_URI, {})
.then(() => {
  console.log('MongoDB connected...');
})
.catch(err => console.log(err));

// Note: పాత్‌లను సరిచేశాను, ఇది index.js యొక్క కొత్త లొకేషన్‌కు సరిపోతుంది
const songsRouter = require('../routes/songs');
app.use('/api/songs', songsRouter);

const sermonsRouter = require('../routes/sermons');
app.use('/api/sermons', sermonsRouter);

const galleryRouter = require('../routes/gallery');
app.use('/api/gallery', galleryRouter);

const videosRouter = require('../routes/videos');
app.use('/api/videos', videosRouter);

const contactRouter = require('../routes/contact');
app.use('/api/contact', contactRouter);

const homepageRouter = require('../routes/homepage');
app.use('/api/homepage', homepageRouter);

const logoRouter = require('../routes/logo');
app.use('/api/logo', logoRouter);

const blogRouter = require('../routes/blog');
app.use('/api/blog', blogRouter);

const aboutRouter = require('../routes/about');
app.use('/api/about', aboutRouter);

const authRouter = require('../routes/auth');
app.use('/api/auth', authRouter);

// Vercel కోసం, మనం express app ను export చేయాలి
module.exports = app;