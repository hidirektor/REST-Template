const bcrypt = require('bcryptjs');
const User = require('../models/User');

exports.resetPassword = async (req, res) => {
    const { userName, newPassword } = req.body;

    try {
        const user = await User.findOne({ where: { userName } });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();

        res.status(200).json({ message: 'Password reset successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error resetting password', error });
    }
};