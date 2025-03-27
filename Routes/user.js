import express from 'express';
import { login, register } from '../Controllers/user.js';

const router = express.Router();
// user resgister route
// @api dsc :- user register
// @api method :- post
//@api endPoint :- /api/user/register
router.post('/register',register)


// user login route
// @api dsc :- user register
// @api method :- post
//@api endPoint :- /api/user/register
router.post('/login',login)

export default router;