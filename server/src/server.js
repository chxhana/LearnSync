import axios from 'axios';
import express from 'express';

const CANVAS_API_URL = "https://westminster.instructure.com/api/v1/courses";
const ACCESS_TOKEN = '349~4QtJhiVlrX9sUAQdQJcSFECg3bscur66PT32cetc3NJFJ3xs3aqMvyz6xH4rf6yM';

const app = express();
const port = 3001;

const params = {
    enrollment_type: 'teacher',
  };
  
  const headers = {
    Authorization: 'Bearer ' + ACCESS_TOKEN,
  };

// interface Course {
//     id: number;
//     name: string;
//   }
  app.get('/api/courses', async(req, res)=>{
      try{
          const response = await axios.get(`$(CANVAS_API_URL)`, {params, headers})
          
      }
      catch(error){
          console.error(error)
      }

  });

  app.listen(port, ()=> {
      console.log(`running on port: $(port)`)
    });


