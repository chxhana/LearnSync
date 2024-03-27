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


// grades -- assignments -- not working -- not server error -- https://canvas.instructure.com/doc/api/submissions.html#method.submissions_api.index
app.get('/api/courses/:course_id/assignments/:assignment_id/submissions', async (req, res) => {
    const courseId = req.params.course_id;
    const assignment_id = req.params.assignment_id;

    try {
        const response = await axios.get(`https://westminster.instructure.com/api/v1/courses/${courseId}/assignments/${assignment_id}/submissions`, {
            headers,
        
        });
        res.json(response.data);
    } catch(error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

//user id vs student id 
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
//stats summaries 
app.get('/api/courses/:course_id/analytics/assignments', async(req, res) =>{
    const courseId = req.params.course_id;
    
    try {
        const response = await axios.get(`https://westminster.instructure.com/api/v1/courses/${courseId}/analytics/assignments`, {
            
            headers
        });
        res.json(response.data);
    } catch(error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

//missing2 -- doesnt tell you which assignments
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

//quiz stats
app.get('/api/courses/:course_id/quizzes/:quiz_id/statistics', async(req, res) =>{
    const assignment_id = req.params.course_id;
    
    try {
        const response = await axios.get(`https://westminster.instructure.com/api/v1/courses/${assignment_id}/analytics/assignments`, {
            
            headers
        });
        res.json(response.data);
    } catch(error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


//quiz statistics
app.get('/api/courses/:course_id/quizzes/:quiz_id/statistics', async(req,res) =>{
    const course_id = req.params.course_id;
    const quiz_id = req.params.quiz_id;
    try{
        const response = await axios.get(`https://westminster.instructure.com/api/v1/courses/${course_id}/quizzes/${quiz_id}/statistics`, {
        headers
    });
        res.json(response.data);
    } catch(error){
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


//assignment_id -- get missing assignments
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
                per_page: 2000,
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


