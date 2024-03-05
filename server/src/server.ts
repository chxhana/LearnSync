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

  app.get('/api/courses/:course_id/students', async (req, res) => {
    const courseId = req.params.course_id;

    try {
        const response = await axios.get(`https://westminster.instructure.com/api/v1/courses/${courseId}/students`, {
            params,
            headers
        });
        res.json(response.data);
    } catch(error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/api/v1/users/:id', (req, res) => {
    try {
        const userId = req.params.id;

        
        const userDetails = {
            id: userId,
            
            permissions: {
                can_update_name: true,
                can_update_avatar: false,
                limit_parent_app_web_access: false
            },
           
            avatar_url: `https://example.com/avatars/${userId}.jpg`
        };

        
        return res.json(userDetails);
    } catch (error) {
       
        console.error('Error:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

  app.get('/api/courses/:course_id/analytics/student_summaries', async(req, res) =>{
    const courseId = req.params.course_id;
    
    

    try {
        const response = await axios.get(`https://westminster.instructure.com/api/v1/courses/${courseId}/analytics/student_summaries`, {
            params,
            headers
        });
        res.json(response.data);
    } catch(error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

  app.get('/api/courses/:course_id/assignments', async(req, res) =>{
    const courseId = 3471562;

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


