const User = require('../models/userModel')
const bcrypt = require('bcryptjs');
const generateToken = require('../utils/generateToken');

//signup
exports.signup = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        if (!name || !email || !password || !role) {
            return res.status(400).json({ message: 'Please Enter All Details' })
        }
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(400).json({ message: 'Already Have an account' })
        }
        const hashPass = await bcrypt.hash(password, 10);
        const user = await User.create({ name, email, password: hashPass, role })
        generateToken(user, 201, res)
    } catch (error) {
        console.log('Error in SignUp Controller:', error)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

//login
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: 'Invalid Email or Password' })
        }
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ message: "User Not Found" })
        }
        const matchPass = await bcrypt.compare(password, user.password)
        if (!matchPass) {
            return res.status(400).json({ message: 'Invalid Email or Password' })
        }
        generateToken(user, 200, res)
    } catch (error) {
        console.log('Error in Login Controller:', error)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}


//logout
exports.logout = async (req, res) => {
    try {
        res.status(200).cookie('token', '', { maxAge: 0 }).json({
            success: true,
            message: 'Loggodout Successfully'
        })
    } catch (error) {
        console.log('Error in Logout Controller:', error)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}





// exports.signup = async (req, res) => {
//     try {

//     } catch (error) {
//         console.log('Error in SignUp Controller:', error)
//         res.status(500).json({ error: 'Internal Server Error' })
//     }
// }