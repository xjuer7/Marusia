require('dotenv').config();
const User = require('./models/User')

const express = require("express");
const cors = require("cors");

const { register, login } = require('./controllers/authControllers');
const authenticate = require('./middleware/authMiddleware');

const app = express();
const PORT = process.env.PORT;

app.use(cors({ origin: 'http://localhost:8000'}))

app.use(express.json())

app.post('/api/auth/register', register);
app.post('/api/auth/login', login);

app.get('/api/auth/me', authenticate, (req, res) => {
  const { email } = req.user
  const fullUser = User.findByEmail(email)
  if(!fullUser) return res.status(404).json({message: 'Пользователь не найден'})

  const {password, ...safeData} = fullUser
  res.json(safeData)
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))

