import generateJWT from '../helpers/generateJWT.js';
import idGenerate from '../helpers/idGenerate.js';
import User from '../models/User.js';

const createUser = async (req, res) => {
	const { username } = req.body;
	const userExists = await User.findOne({ username });

	if (userExists) {
		const error = new Error('User is already registered');
		return res.status(400).json({ msg: error.message });
	}

	try {
		const user = new User(req.body);
		user.token = idGenerate();
		await user.save();
		res.json({ msg: 'User created correctly' });
	} catch (error) {
		console.log(error);
	}
};

const authenticate = async (req, res) => {
	const { username, password } = req.body;

	const user = await User.findOne({ username });

	if (!user) {
		const error = new Error("The user don't exists");
		return res.status(404).json({ msg: error.message });
	}

	if (await user.checkPassword(password)) {
		res.json({
			_id: user._id,
			username: user.username,
			token: generateJWT(user._id)
		});
	} else {
		const error = new Error("The Password isn't correct");
		return res.status(403).json({ msg: error.message });
	}
};

const account = async (req, res) => {
	const { user } = req;
	res.json(user);
};

const getAllUsers = async (req, res) => {
	const users = await User.find();

	res.json(users);
};

const getUser = async (req, res) => {
	const { id } = req.params;

	const users = await User.findById(id);

	if (!users) {
		const error = new Error('Not found');
		return res.status(404).json({ msg: error.message });
	}

	res.json(users);
};

export { getUser, createUser, authenticate, account, getAllUsers };
