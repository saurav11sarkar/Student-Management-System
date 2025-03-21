import mongoose from 'mongoose';
import configs from './configs';
import app from './app';

const port = configs.PORT;
const serverConnection = async () => {
  try {
    await mongoose.connect(configs.DB_URL as string);
    console.log('NoSql database connected successfully');
    app.listen(port, () => {
      console.log(`Server is running on port http://localhost:${port}`);
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

serverConnection();
