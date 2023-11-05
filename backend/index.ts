import express from 'express';
const app = express();
import bodyParser from 'body-parser';
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
import cors from 'cors';
import routes from './routes';
const port = 3000;

// Define the list of allowed domains (replace example.com with your domain)
const allowedDomains = ['http://localhost:3030'];

// Configure CORS options
const corsOptions:object = {
  origin: (origin:string, callback:any) => {
    if (allowedDomains.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

// Enable CORS with the specified options
app.use(cors(corsOptions))
app.use('/api',routes);
app.listen(port, () => {
  console.log(`Server is running on port ${port} `);
});





