import bcrypt from 'bcrypt';
import mongoose from 'mongoose';

const userSchema = mongoose.Schema(
	{
		username: {
			type: String,
			required: true,
			trim: true
		},
		password: {
			type: String,
			required: true,
			trim: true
		},
		token: {
			type: String
		}
	},
	{
		timestamps: true
	}
);

userSchema.pre('save', async function (next) {
	if (!this.isModified('password')) {
		next();
	}
	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.checkPassword = async function (formPassword) {
	return await bcrypt.compare(formPassword, this.password);
};

const User = mongoose.model('User', userSchema);
export default User;
