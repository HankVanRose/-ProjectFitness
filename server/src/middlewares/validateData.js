const { validateEmail, validatePassword } = require("./validators");

const validateSignupData = (req, res, next) => {
    const { username, email, password } = req.body;    
  
    if (!(username?.trim() && email?.trim() && password?.trim())) {
      return res.status(400).json({ message: 'All fields are required' });
    }
  
    if (!validateEmail(email)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }
  
    if (!validatePassword(password)) {
      return res.status(400).json({ 
        message: 'Password must be at least 6 characters long'
      });
    }
  
    next();
  };

  
const validateSigninData = (req, res, next) => {
    const { email, password } = req.body;
  
    if (!(email?.trim() && password?.trim())) {
      return res.status(400).json({ message: 'All fields are required' });
    }
  
    if (!validateEmail(email)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }
  
    next();
  };


  module.exports = { validateSigninData, validateSignupData };
  