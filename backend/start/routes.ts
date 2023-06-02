/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer''
|
*/

import Route from '@ioc:Adonis/Core/Route'
import User from 'App/Models/User'

Route.get('/', async ({ view }) => {
  return view.render('welcome')
})

Route.post('/register', async ({ request, session, response }) => {
  const email = request.input('email')
  const password = request.input('password')

  const existingUser = await User.findBy('email', email)

  if (existingUser) {
    return response.status(409).json({
      error: 'Email already exist',
      message: 'The email address provided is already registered',
    })
  }

  const user = await User.create({ email, password })
  return { user: user }
})

Route.post('login', async ({ auth, request, response }) => {
  const email = request.input('email')
  const password = request.input('password')

  try {
    const user = await auth.use('web').attempt(email, password)
    return response.status(200).json({
      user,
    })
  } catch {
    return response.status(409).json({
      error: 'Invalid credentials',
      message: 'Invalid credentials, verify you entered correct email/password',
    })
  }
})
