import axios from 'axios';
import express from 'express';
import cors from 'cors';

const ACCESS_TOKEN = '349~4QtJhiVlrX9sUAQdQJcSFECg3bscur66PT32cetc3NJFJ3xs3aqMvyz6xH4rf6yM';

const app = express();
const port = 3001;
app.use(cors())


  
  const headers = {
    Authorization: 'Bearer ' + ACCESS_TOKEN,
  };

  app.get("/", (req,res) => {
    res.send("This is home page.")
  })

  //shows all courses for the teacher

  app.get('/api/courses', async(req, res)=>{
    const params = {
        enrollment_type: 'teacher',
      };
      try{
          const response = await axios.get(`https://westminster.instructure.com/api/v1/courses`, {params, headers})
          res.json(response.data)
      }
      catch(error){
          console.error(error)
      }

  });

  //shows all students in the courses

  app.get('/api/courses/:course_id/students', async (req, res) => {
    const courseId = req.params.course_id;

    try {
        const response = await axios.get(`https://westminster.instructure.com/api/v1/courses/${courseId}/students`, {
            
            headers
        });
        res.json(response.data);
    } catch(error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});



//stats for students    

  app.get('/api/courses/:course_id/analytics/student_summaries', async(req, res) =>{
    const courseId = req.params.course_id;
    
    try {
        const response = await axios.get(`https://westminster.instructure.com/api/v1/courses/${courseId}/analytics/student_summaries`, {
            
            headers
        });
        res.json(response.data);
    } catch(error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

//shows all assignments for the course

  app.get('/api/courses/:course_id/assignments', async(req, res) =>{
    const courseId = req.params.course_id;

    try {
        const response = await axios.get(`https://westminster.instructure.com/api/v1/courses/${courseId}/assignments`, {
          
            headers
        });
        res.json(response.data);
    } catch(error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

//grades

app.get('/api/audit/grade_change/assignments/:course_id', async (req, res) => {
    const courseId = req.params.course_id;
    //const assignmentId = req.params.assignment_id;


    try {
        const response = await axios.get(`https://westminster.instructure.com/api/v1/audit/grade_change/assignments/${courseId}`, {
            headers,
        });
        res.json(response.data);
    } catch(error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// grades
app.get('/api/courses/:course_id/students/submissions', async (req, res) => {
    const courseId = req.params.course_id;

    try {
        const response = await axios.get(`https://westminster.instructure.com/api/v1/courses/${courseId}/students/submissions`, {
            headers,
        
        });
        res.json(response.data);
    } catch(error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

//user id

app.get('/api/courses/:course_id/enrollments' , async(req, res) =>{
    const courseId = req.params.course_id;
    try {
        const response = await axios.get(`https://westminster.instructure.com/api/v1/courses/${courseId}/enrollments`, {
            
            headers
        });
        res.json(response.data);
    } catch(error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
// quiz
app.get('/api/courses/:course_id/quizzes', async (req, res) => {
    const courseId = req.params.course_id;

    try {
        const response = await axios.get(`https://westminster.instructure.com/api/v1/courses/${courseId}/quizzes`, {
            headers
        });
        res.json(response.data);
    } catch(error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
//assignment name?
app.get('/api/courses/:course_id/assignments/:id', async(req, res) =>{
    const courseId = req.params.course_id;
    const assignmentId = req.params.id;
    

    try {
        const response = await axios.get(`https://westminster.instructure.com/api/v1/courses/${courseId}/assignments/${assignmentId}`, {
            
            headers
        });
        res.json(response.data);
    } catch(error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/api/courses/:course_id/gradebook_history/feed', async(req, res) =>{
    const courseId = req.params.course_id;
    //const assignmentId = req.params.id;
    

    try {
        const response = await axios.get(`https://westminster.instructure.com/api/v1/courses/${courseId}/gradebook_history/feed`, {
            params :{
                per_page: 1000,
                grouped: true
            },
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


