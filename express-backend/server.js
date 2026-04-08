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

app.post('/api/favorite', authenticate, (req, res) => {
  const { id } = req.body
  if (!id) {
    return res.status(400).json({ message: 'Не передан id фильма' })
  }
  
  const { id: userId } = req.user

  try {
    User.addFavoriteMovie(userId, id)
    return res.status(200).json({ 
      message: 'Фильм добавлен в избранное', 
      favorites: User.getFavorites(userId)
    })
  } catch (error) {
    return res.status(404).json({ message: error.message })
  }
})

app.delete('/api/favorite', authenticate, (req, res) => {
  const { id } = req.body
  const { id: userId } = req.user

  if(!id) {
    return res.status(400).json({ message: 'Не передан id фильма' })
  }

  try {
    User.removeFavoriteMovie(userId, id);
    return res.status(200).json({ 
      message: 'Фильм удален из избранного', 
      favorites: User.getFavorites(userId)
    })
  } catch (error) {
    return res.status(404).json({ message: error.message })
  }
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))

