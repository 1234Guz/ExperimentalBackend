var express = require('express');
var router = express.Router();
 
var auth = require('./auth.js');
var products = require('./products.js');
var user = require('./users.js');
var register = require('./register.js');
var question = require('./question.js');
var upload = require('./upload.js');
var login = require('./login.js');
 
/*
 * Routes that can be accessed by any one
 */
router.post('/login', login.loginUser);
router.post('/register', register.registerUser);
router.post('/registerFacebook', register.registerFacebook);


 
/*
 * Routes that can be accessed only by autheticated users
 */
router.post('/api/v1/products', products.getAll);
router.get('/api/v1/product/:id', products.getOne);
router.post('/api/v1/product/', products.create);
router.put('/api/v1/product/:id', products.update);
router.delete('/api/v1/product/:id', products.delete);

// insert question
router.post('/api/v1/question/insert', question.insert_question);

//upload image
router.post('api/v1/uploadImage', upload.uploadFile);
router.get('api/v1/getImage:file', upload.getImage);

 
/*
 * Routes that can be accessed only by authenticated & authorized users
 */
router.get('/api/v1/admin/users', user.getAll);
router.get('/api/v1/admin/user/:id', user.getOne);
router.post('/api/v1/admin/user/', user.create);
router.put('/api/v1/admin/user/:id', user.update);
router.delete('/api/v1/admin/user/:id', user.delete);
 
module.exports = router