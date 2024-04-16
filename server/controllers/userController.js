const User = require('../models/Users');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
	const { username, password } = req.body;
	const hashedPassword = await bcrypt.hash(password, 12);

	const newUser = new User({ username, password: hashedPassword });
	await newUser.save();

	res.status(201).send('User registered');
};

exports.login = async (req, res) => {
	const { username, password } = req.body;
	const user = await User.findOne({ username });

	if (!user) {
		return res.status(404).send('User not found');
	}

	const isMatch = await bcrypt.compare(password, user.password);
	if (!isMatch) {
		return res.status(400).send('Invalid credentials');
	}

	const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
	res.cookie('token', token, { httpOnly: true });
	res.status(200).send('User logged in');
};

exports.updateUser = async (req, res) => {
	const { username, genres } = req.body;
	const user = await User.findByIdAndUpdate(req.user.id, { username, genres }, { new: true });
	res.status(200).json(user);
};


exports.getUsers = async (req, res) => {
	const users = await User.find();
	res.status(200).json(users);
}
