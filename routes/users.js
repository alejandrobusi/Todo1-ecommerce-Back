const { Router } = require('express')
const route = Router()
const { createUser, deleteUser, getUsers, editUser, addFav } = require('../controllers/users')
const {jwtvalidator} = require ('../middleware/jwtvalidator')
const { body } = require('express-validator');
const { validationEmail } = require('../helpers/validations')

route.post('/users',
body('email').trim().escape().notEmpty().withMessage("email empty").isEmail().withMessage('invalid email'),
body('email').custom(validationEmail),
body('password').isStrongPassword({ minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1, returnScore: false, pointsPerUnique: 1, pointsPerRepeat: 0.5, pointsForContainingLower: 10, pointsForContainingUpper: 10, pointsForContainingNumber: 10, pointsForContainingSymbol: 10 }),
body('name').trim().escape().notEmpty().withMessage("name empty").isLength({max : 60}).withMessage('maximum character is 60'),
createUser)

route.delete('/users', 
body('email').trim().escape().notEmpty().withMessage("email empty").isEmail().withMessage('invalid email'), 
deleteUser)

route.get('/users', getUsers)

route.patch('/users/:prodId',
editUser)


module.exports = route 


