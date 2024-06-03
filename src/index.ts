import 'dotenv/config'
import express, { Application } from "express";
import { SequelizeConnection } from "./services/sequelize";
import bodyParser from 'body-parser';
import usersRoutes from './routes/users.routes';
import regionRoutes from './routes/regions.routes';
import mailRoutes from './routes/mail.routes';

const port = 3015;
// New express application instance
const app: Application = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

SequelizeConnection.getInstance();

app.get("/", async (req, res) => {
    res.status(200).json({
      message: 'Hello World'
    });
});

app.use('/users', usersRoutes);
app.use('/regions', regionRoutes);
app.use('/mail-send', mailRoutes);
  
app.listen(port, () => {
    console.log(`Server is running on port ${port}...`);
});
