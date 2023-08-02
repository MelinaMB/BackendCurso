import UserService from '../services/users.service.js';

const Service = new UserService();

class UsersController {
  async getAll(req, res) {
    const users = await Service.getAll();
    return res.status(200).json({
      status: 'success',
      msg: 'listado de usuarios',
      data: users,
    });
  }

  async logOut(req, res) {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).render('error', { error: 'no se pudo cerrar su session' });
      }
      return res.redirect('/api/user/login');
    });
  }

  async perfil(req, res) {
    const user = { email: req.session.email, isAdmin: req.session.isAdmin };
    return res.render('perfil', { user: user });
  }

  async administracion(req, res) {
    return res.send('datos super secretos clasificados');
  }

  async login(req, res) {
    return res.render('login', {});
  }

  async loginAutenticate(req, res){
    if (!req.user) {
        return res.json({ error: 'invalid credentials' });
    }
    req.session.user = { _id: req.user._id, email: req.user.email, firstName: req.user.firstName, lastName: req.user.lastName, isAdmin: req.user.isAdmin, rol: req.user.rol, age: req.user.age};
    
    return res.redirect('/products');
  }

  async failLogin(req, res) {
    return res.json({ error: 'fail to login' });
  }

  async register(req, res) {
    return res.render('register', {});
  }

  async registerAutenticate(req, res) {
    if (!req.user) {
        return res.json({ error: 'something went wrong' });
    }
    req.session.user = { _id: req.user._id, email: req.user.email, firstName: req.user.firstName, lastName: req.user.lastName, isAdmin: req.user.isAdmin, rol: req.user.rol, age: req.user.age, cart: req.user.cart };

    return res.redirect('/products');
  }

  async failRegister(req, res) {
    return res.json({ error: 'fail to register' });
  }

  async session(req, res){
    return res.send(JSON.stringify(req.session));
  }
}

export const usersController = new UsersController();
