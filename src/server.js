import express from "express"
import cors from "cors"
import listEndpoints from "express-list-endpoints"
import authorsRouter from "./authors/index.js"

const server = express();

const PORT = 3001;

server.use(cors());

server.use(express.json());

server.use("/authors", authorsRouter);

server.get(
   "/middleware", 
   (req, res, next) => {
   let { number } = req.query;
   number = parseInt(number);
   req.number = number;
   next();
   },
   (req, res, next) => {
      req.number++;
      next();
   },
   (req, res, next) => {
      req.number++;
      next();
   },
   (req, res, next) => {
      req.number++;
      next();
   },
   (req, res, next) => {
      req.number++;
      next();
   },
   (req, res, next) => {
      req.number++;
      res.send({ number: req.number });
   }
);

console.log(listEndpoints(server));

server.listen(PORT, () => console.log("✅ server is running on port : ", PORT));

server.on("error", (error) => 
   console.log(`❌ server is not running due to : ${error}`)
   );