const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
    teacher: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    star: { type: Number, default: 0, required: true },
    score: { type: Number, default: 0, required: true },
    quizTaken: { type: Number, default: 0, required: true },
    class: { type: String, required: true, default: 'mntta' },
    role: { type: String, required: true, default: 'student' },
  },
  {
    timestamps: true,
  }
);

userSchema.pre('save', async function (next) {
  if (this.isModified('password') || this.isNew) {
    this.password = await bcrypt.hash(this.password, 12);
  }
  next();
});

userSchema.methods.comparePassword = async function (pas) {
  return await bcrypt.compare(pas, this.password);
};

const User = mongoose.model('User', userSchema);
module.exports = User;
