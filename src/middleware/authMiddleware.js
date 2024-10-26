import jwt from 'jsonwebtoken';

export const isLoggedIn = async (req, res, next) => {
  try {
    // Get token from cookies
    const token = req.cookies.token;

    // Check if token is not provided
    if (!token) {
      res.render('404');
    }

    // Decode token using verify
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    // Set decoded token to user
    req.user = decodedToken;

    // next
    next();
  } catch (error) {
    console.log(error.message);
  }
  // If token is valid, proceed to next middleware
};
