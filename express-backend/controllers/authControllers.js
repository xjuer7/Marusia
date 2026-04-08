const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const secretKey = process.env.JWT_SECRET;

const register = (req, res) => {
  const { email, name, surname, password } = req.body
  const existingUser = User.findByEmail(email)

  if(existingUser) {
    return res
    .status(400)
    .json({ message: 'Пользователь уже существует'})
  }

  const hashedPassword = bcrypt.hashSync(password, 10)
  const newUser =  User.create({
    email,
    name, 
    surname, 
    password: hashedPassword,
  })

  return res
  .status(201)
  .json({ message: "Пользователь успешно добавлен", user: {
    id: newUser.id,
    email: newUser.email,
    name: newUser.name,
    surname: newUser.surname,
  }})
}

const login = async (req, res) => {
  const { email, password } = req.body
  const user = User.findByEmail(email)

  if(!user || !(await bcrypt.compare(password, user.password))) {
    return res
    .status(400)
    .json({ message: 'Ошибка авторизации, неверный логин или пароль'})
  }

  const token = jwt.sign(
    { id: user.id, email: user.email },
    secretKey, 
    { expiresIn : "1h"}
  );
  return res.json({ message: 'Авторизация прошла успешно', token})
}


module.exports = { register, login }




