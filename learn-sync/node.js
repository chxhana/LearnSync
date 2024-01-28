// server.js
const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.get('/api/courses', async (req, res) => {
  try {
    const response = await axios.get('https://westminster.instructure.com/api/v1/courses', {
      params: {
        enrollment_type: 'teacher',
      },
      headers: {
        Authorization: 'Bearer ' + process.env.CANVAS_ACCESS_TOKEN,
      },
    });

    if (response.status === 200) {
      const courses = response.data.map(course => ({
        id: course.id,
        name: course.name,
      }));
      res.json(courses);
    } else {
      console.error(`Error: ${response.status} - ${response.statusText}`);
      res.status(response.status).json({ error: response.statusText });
    }
  } catch (error) {
    console.error('Error fetching courses:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
