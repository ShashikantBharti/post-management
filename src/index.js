import { connectDB } from './config/db.js';
import app from './app.js';

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 3000, () => {
      console.log('server is running on port 3000');
    });
  })
  .catch((error) => {
    console.log(error.message);
  });
