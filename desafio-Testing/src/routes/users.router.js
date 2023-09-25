import express from 'express';
import { isAdmin, isUser } from '../middlewares/auth.js';
import passport from 'passport';
import { usersController } from '../controllers/users.controllers.js';


export const userRouter = express.Router();

// ----ahora

userRouter.get('/', usersController.getAll);

userRouter.get('/logout', usersController.logOut);

userRouter.get('/perfil', isUser, usersController.perfil);

userRouter.get('/administracion', isUser, isAdmin, usersController.administracion);

// vista del login
userRouter.get('/login', usersController.login);

userRouter.post('/login', passport.authenticate('login'/*, { failureRedirect: '/api/user/failLogin' }*/), usersController.loginAutenticate);

// userRouter.get('/faillogin', usersController.failLogin);

//   vista de regitro
userRouter.get('/register', usersController.register);

userRouter.post('/register', passport.authenticate('register'/*, { failureRedirect: '/api/user/failRegister' }*/), usersController.registerAutenticate);

// userRouter.get('/failregister', usersController.failLogin);

userRouter.get('/session', usersController.session);

