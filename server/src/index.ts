import express, { Request, Response } from 'express';
import authRouter from "./routers/auth-router";
import bodyParse from "body-parser";
import cors from "cors";
import cookieParser from 'cookie-parser';
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(bodyParse.json())

app.use(cors({
  origin : "http://localhost:3000",
  credentials : true
}));

app.use(cookieParser());



interface UserBasicInfo {
  id : string
  username : string
  email : string

}

declare global {
  namespace Express {
    interface Request {
      user? : UserBasicInfo | null

    }

  }

}





app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});


app.use(authRouter);

