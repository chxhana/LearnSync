import axios from 'axios';
import express from 'express';
import cors from 'cors';
const ACCESS_TOKEN = '349~4QtJhiVlrX9sUAQdQJcSFECg3bscur66PT32cetc3NJFJ3xs3aqMvyz6xH4rf6yM';

const app = express();
const port = 3001;
app.use(cors())

const params = {
    enrollment_type: 'teacher',
  };
  
  const headers = {
    Authorization: 'Bearer ' + ACCESS_TOKEN,
  };

  app.get("/", (req,res) => {
    res.send("This is home page.")
  })

  app.get('/api/courses', async(req, res)=>{
      try{
          const response = await axios.get(`https://westminster.instructure.com/api/v1/courses`, {params, headers})
          res.json(response.data)
      }
      catch(error){
          console.error(error)
      }

  });

  app.get('/api/courses/:course_id/assignments', async(req, res) =>{
    const courseId = 3471562;
    const includeParams = ['submission', 'all_dates']; 
    
    const params = {
        include: includeParams.join(',')
    };

    try {
        const response = await axios.get(`https://westminster.instructure.com/api/v1/courses/${courseId}/assignments`, {
            params,
            headers
        });
        res.json(response.data);
    } catch(error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


  app.listen(port, ()=> {
      console.log(`running on port: $(port)`)
    });


