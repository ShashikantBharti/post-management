import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    about: String,
    avatar: {
      type: String,
      default: 'user.jpg',
    },
    password: {
      type: String,
      required: true,
    },
    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
      },
    ],
  },
  {
    timestamps: true,
  }
);

userSchema.pre('save', async function (next) {
  // Check if password is not modified then return
  if (!this.isModified('password')) return next();

  // Hash Password
  this.password = await bcrypt.hash(this.password, 10);

  // Next
  next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
  // Compare password and return
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userSchema);

export default User;
