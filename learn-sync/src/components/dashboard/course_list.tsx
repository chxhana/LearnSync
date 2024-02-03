import axios from 'axios';
import Course from './types';

const CANVAS_API_URL = "https://westminster.instructure.com/api/v1/courses";
const ACCESS_TOKEN = '349~4QtJhiVlrX9sUAQdQJcSFECg3bscur66PT32cetc3NJFJ3xs3aqMvyz6xH4rf6yM';

const params = {
  enrollment_type: 'teacher',
};

const headers = {
  Authorization: 'Bearer ' + ACCESS_TOKEN,
};

const fetchCourses = async (): Promise<Course[]> => {
  try {
    const response = await axios.get(CANVAS_API_URL, { params, headers });

    if (response.status === 200) {
      return response.data as Course[];
    } else {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }
  } catch (error) {
    throw new Error(`Error fetching courses: ${(error as Error).message}`);
  }
};

export default fetchCourses;
