import Post from '../models/postModel.js';
import User from '../models/userModel.js';

export const createNewPost = async (req, res) => {
  try {
    // Get User details
    const userId = req.user.id;

    // Get post details
    const { title, description } = req.body;

    // Check if details are not empty
    if (!title || !description) {
      return res.render(`/profile/${userId}`, {
        message: 'Please provide all details!',
      });
    }

    // Create new post
    const createdPost = await Post.create({ title, description, userId });

    // Save post id to user collection
    await User.findByIdAndUpdate(userId, { $push: { posts: createdPost._id } });

    if (!createdPost) {
      return res.render(`/profile/${userId}`, {
        message: 'Post creation failed!',
      });
    }

    res.redirect(`/profile/${userId}`);
  } catch (error) {
    console.log(error.message);
  }
};
