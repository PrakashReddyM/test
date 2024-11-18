const jwt = require('jsonwebtoken')

const generateToken = async (user, statusCode, res) => {
    try {
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '3d' })

        const options = {
            httpOnly: true,
            maxAge: 3 * 24 * 60 * 60 * 1000
        }

        res.status(statusCode).cookie('token', token, options).json({ success: true, user })
    } catch (error) {
        console.log('Error in generateToken:', error)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

module.exports = generateToken;