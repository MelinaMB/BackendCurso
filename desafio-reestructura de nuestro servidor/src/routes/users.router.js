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

userRouter.post('/login', passport.authenticate('login', { failureRedirect: '/api/user/faillogin' }), usersController.loginAutenticate);

userRouter.get('/faillogin', usersController.failLogin);

//   vista de regitro
userRouter.get('/register', usersController.register);

userRouter.post('/register', passport.authenticate('register', { failureRedirect: '/api/user/failregister' }), usersController.registerAutenticate);

userRouter.get('/failregister', usersController.failLogin);

userRouter.get('/session', usersController.session);

// ------despues

// userRouter.get('/session', (req, res) => {
    //     return res.send(JSON.stringify(req.session));
    // });

    // userRouter.get('/logout', (req, res) => {
        //     req.session.destroy((err) => {
            //         if (err) {
                //             return res.status(500).render('error', { error: 'no se pudo cerrar su session' });
//         }
//         return res.redirect('/auth/login');
//     });
// });

// userRouter.get('/perfil', isUser, (req, res) => {
    //     const user = { email: req.session.email, isAdmin: req.session.isAdmin };
    //     return res.render('perfil', { user: user });
    
    // });

// userRouter.get('/administracion', isUser, isAdmin, (req, res) => {
//     return res.send('datos super secretos clasificados');
// });


// // vista del login
// userRouter.get('/login', (req, res) => {
//     return res.render('login', {});
// });

// userRouter.post('/login', passport.authenticate('login', { failureRedirect: '/auth/faillogin' }), async (req, res) => {
//     if (!req.user) {
//         return res.json({ error: 'invalid credentials' });
//     }
//     req.session.user = { _id: req.user._id, email: req.user.email, firstName: req.user.firstName, lastName: req.user.lastName, isAdmin: req.user.isAdmin, rol: req.user.rol, age: req.user.age};

//     return res.redirect('/products');
// });

// userRouter.get('/faillogin', async (req, res) => {
//     return res.json({ error: 'fail to login' });
// });


// //   vista de regitro
// userRouter.get('/register', (req, res) => {
//     return res.render('register', {});
// });

// userRouter.post('/register', passport.authenticate('register', { failureRedirect: '/auth/failregister' }), (req, res) => {

//     if (!req.user) {
//         return res.json({ error: 'something went wrong' });
//     }
//     req.session.user = { _id: req.user._id, email: req.user.email, firstName: req.user.firstName, lastName: req.user.lastName, isAdmin: req.user.isAdmin, rol: req.user.rol, age: req.user.age };

//     return res.redirect('/products');
// });

// userRouter.get('/failregister', async (req, res) => {
//     return res.json({ error: 'fail to register' });
// });



// -----------------------antes

// authRouter.post('/register', async (req, res) => {
//     const { email, pass, firstName, lastName } = req.body;
//     if (!email || !pass || !firstName || !lastName) {
//         return res.status(400).render('error', { error: 'ponga bien toooodoo cheee!!' });
//     }
//     try {
//         await UserModel.create({ email: email, pass: createHash (pass), firstName: firstName, lastName: lastName, isAdmin: false });
//         req.session.email = email;
//         req.session.isAdmin = false;

//         return res.redirect('/products');
//     } catch (e) {
//         console.log(e);
//         return res.status(400).render('error', { error: 'no se pudo crear el usuario. Intente con otro mail.' });
//     }
// });

// authRouter.post('/login', async (req, res) => {
//     const { email, pass } = req.body;
//     if (!email || !pass) {
//         return res.status(400).render('error', { error: 'ponga su email y pass' });
//     }
//     const usarioEncontrado = await UserModel.findOne({ email: email });
//     if (usarioEncontrado && isValidPassword(pass, usarioEncontrado.pass)) {
//         req.session.email = usarioEncontrado.email;
//         req.session.isAdmin = usarioEncontrado.isAdmin;

//         return res.redirect('/products');
//     } else {
//         return res.status(401).render('error', { error: 'email o pass estan mal' });
//     }
// });