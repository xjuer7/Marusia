const crypto = require("crypto");

const users = []

const User = {
  create: (obj) => {
    const idRandom = crypto.randomUUID()
    const user = {...obj, id: idRandom, avatarDefault: '', favorites: []}
    users.push(user)
    return user
  },

  findByEmail: (name) => {
    return users.find(({ email }) => email === name)
  },

  findById: (id) => {
    return users.find((user) => user.id === id)
  },

  addFavoriteMovie: (id, movieId) => {
    const user = User.findById(id)
    if(user) {
      const movieFav = user.favorites.find((el) => el === movieId)
      if(!movieFav) user.favorites.push(movieId)
    } else {
      throw new Error('Пользователь не найден')
    }
  },

  removeFavoriteMovie: (id, movieId) => {
    const user = User.findById(id)
    if(user) {
      const idx = user.favorites.indexOf(movieId)
      if(idx > -1) user.favorites.splice(idx, 1)
    } else {
      throw new Error('Пользователь не найден')
    }
  },

  getFavorites: (id) => {
    const user = User.findById(id);
    if(user) return user.favorites
    return []
  },

  setAvatar: (id, avatar) => {
    const user = User.findById(id)
    user.avatarDefault = avatar
    return user
  }
}

module.exports = User