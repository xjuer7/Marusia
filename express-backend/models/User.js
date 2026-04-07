const crypto = require("crypto");

const users = []
const avatarDefault = ''

const User = {
  create: (obj) => {
    const idRandom = crypto.randomUUID()
    const user = {...obj, avatarDefault }
    user.id = idRandom
    user.favorites = []
    users.push(user)
    return user
  },

  findByEmail: (name) => {
    return users.find(({ email }) => email === name)
  },

  findById: (userId) => {
    return users.find(({ id }) => id === userId)
  },

  addFavoriteMovie: (userId, movieId) => {
    const user = User.findById(userId)
    if(user) {
      const movieFav = user.favorites.find((el) => el === movieId)
      if(!movieFav) user.favorites.push(movieId)
    }
  },
  removeFavoriteMovie: (userId, movieId) => {
    const user = User.findById(userId)
    if(user) {
      const idx = user.favorites.indexOf(movieId)
      if(idx > -1) user.favorites.splice(idx, 1)
    }
   
  },

  getFavorites: (userId) => {
    const user = User.findById(userId);
    if(user) return user.favorites
    return []
  },

  setAvatar: (userId, avatar) => {
    const user = User.findById(userId)
    user.avatarDefault = avatar
    return user
  }
}

module.exports = User