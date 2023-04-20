const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const userSignup = require('../model/user')
const jwtSecret = "f+"

router.post('/signup', async (req, res) => {
    console.log('aaaaaaa')
    try {
    const {email, password, username} = req.body
    const user = await userSignup.findOne({ $or: [{ username }, { email }] })
    if (user) {
      return res.status(409).json({ status: 409, message: 'User already exists' })
    }

    console.log(req.body);
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    const newUser = await userSignup.create({
      email,
      username,
      password: hashedPassword,
    })
    console.log(newUser);
    const token = jwt.sign(
      { userId: newUser._id, email: newUser.email },
      jwtSecret,
      { expiresIn: '24h' }
    )
    res.status(201).json({ status: 201, data: { message: 'User created', token } })
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message })
  }
}) 

router.post('/login', async (req, res) => {
    try {
      const { username, password } = req.body
      const user = await userSignup.findOne({ username })
      if (!user) {
        return res.status(401).json({ message: 'Invalid username' })
      }
      const isPasswordMatch = await bcrypt.compare(password, user.password)
      if (!isPasswordMatch) {
        return res.status(401).json({ message: 'Invalid password' })
      }
      const payload = { userId: user._id, email: user.email }
  
      jwt.sign(payload,jwtSecret, { expiresIn: '24h' }, (err, token) => {
        if (err) throw err
        res.json({ status: 200, data: { token } })
      })
    } catch (err) {
      console.error(err.message)
      res.status(500).json({ status: 500, message: 'Server Error' })
    }
  })
  
  router.get('/users/:userId', async (req, res) => {
    try {
      const user = await userSignup.findOne({ _id: req.params.userId })
      if (!user) {
        return res.status(404).json({ status: 404, message: 'User not found' })
      }
      res.json({
        status: 200,
        data: {
          email: user.email,
          username: user.username,
          _id: user._id
        },
      })
    } catch (err) {
      res.status(500).json({ status: 500, message: err.message })
    }
  })
  
  router.get('/users', async (req, res) => {
    try {
      const users = await userSignup.find()
      res.json({ status: 200, data: users })
    } catch (err) {
      res.status(500).json({ status: 500, message: err.message })
    }
  })
  
  module.exports = router