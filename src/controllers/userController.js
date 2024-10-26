import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

export const registerPage = (req, res) => {
  res.render('index');
};

export const register = async (req, res) => {
  try {
    // Get user data
    const { name, email, password } = req.body;
    // Check if data is provided
    if ([name, email, password].some((field) => !field || field.trim() == '')) {
      res.render('index', { message: 'Please enter all details!' });
    }
    // Check if user not registered
    const user = await User.findOne({ email });
    if (user) {
      res.render('index', { message: 'User already exists!' });
    }

    // Create user and save
    await User.create({ name, email, password });

    // send response
    res.render('index', { message: 'User registered successfully!' });
  } catch (error) {
    console.log(error.message);
    res.render('index', { message: 'User registration Failed!' });
  }
};

export const login = async (req, res) => {
  // get credentials
  const { email, password } = req.body;
  // Check if data is provided
  if ([email, password].some((field) => !field || field.trim() == '')) {
    res.render('index', { message: 'Please enter all details!' });
  }

  // Check if user is registered
  const user = await User.findOne({ email });
  if (!user) {
    return res.render('index', { message: 'User not found! Please register' });
  }

  // Verify password
  if (user.isPasswordCorrect(password)) {
    // Set token
    const token = jwt.sign(
      {
        email,
        id: user._id,
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
      }
    );

    res.cookie('token', token);

    res.redirect(`/profile/${user._id}`);
  }

  // send response
};

export const profile = async (req, res) => {
  try {
    // Get user id
    const userId = req.params.userId;

    // Get user details
    const user = await User.findById(userId)
      .select('-password')
      .populate('posts');

    // Check if id is correct
    if (!user) {
      res.render('404');
    }
    res.render('profile', { user });
  } catch (error) {
    console.log(error.message);
  }
};

export const logout = async (req, res) => {
  res.clearCookie('token', '');
  res.redirect('/');
};

export const update = async (req, res) => {
  try {
    // Get id
    const id = req.params.id;

    // Get details to update
    const { name, about } = req.body;

    // Check if details are povided
    if (!name || !about) {
      res.render('profile', { message: 'Please provide all details!' });
    }

    // Update User Details
    const updatedUser = await User.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: false,
    });

    res.redirect(`/profile/${id}`);
  } catch (error) {
    console.log(error.message);
  }
};

export const uploadAvatar = async (req, res) => {
  try {
    // Get id
    const userId = req.params.userId;

    // Check if user id is alid
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      res.render(`profile/${userId}`, { message: 'User Id is not valid!' });
    }

    // Check if file is uploaded or not
    if (!req.file) {
      res.render(`profile/${userId}`, { message: 'Please upload a file!' });
    }

    // Get file info
    const { filename } = req.file;

    //  Delete old uploaded file
    const user = await User.findById(userId);

    if (user.avatar && user.avatar !== 'user.jpg') {
      // set __dirname
      const __dirname = path.dirname(fileURLToPath(import.meta.url));

      // Get old iamge path
      const oldAvatarPath = path.join(
        __dirname,
        '../../public/images/',
        user.avatar
      );

      fs.unlink(oldAvatarPath, (err) => {
        if (err) {
          console.log(err.message);
        }
      });
    }

    // Check if file is uploaded or not
    if (!user) {
      res.render(`profile/${userId}`, { message: 'User Not Found!' });
    }

    // save file name to database
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { avatar: filename },
      { new: true, runValidators: false }
    );

    // redirect
    res.redirect(`/profile/${userId}`);
  } catch (error) {
    console.log(error.message);
  }
};
