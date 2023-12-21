import requests

# Replace 'YOUR_ACCESS_TOKEN' and 'YOUR_CANVAS_DOMAIN' with your actual access token and Canvas domain.
access_token = '349~4QtJhiVlrX9sUAQdQJcSFECg3bscur66PT32cetc3NJFJ3xs3aqMvyz6xH4rf6yM'
canvas_domain = 'https://westminster.instructure.com/'

# Reusable function for making Canvas API requests
def make_canvas_api_request(endpoint, params=None):
    url = f'{canvas_domain}{endpoint}'
    headers = {'Authorization': f'Bearer {access_token}'}
    response = requests.get(url, headers=headers, params=params)
    return response

# Function to get course-level assignment data
def get_course_assignments(course_id):
    endpoint = f'/api/v1/courses/{course_id}/analytics/assignments'
    #endpoint = f'/api/v1/courses/{course_id}/assignments'
    response = make_canvas_api_request(endpoint)
    
    if response.status_code == 200:
        assignments_data = response.json()
        for assignment in assignments_data:
            print(f"Assignment Name: {assignment['assignment']['name']}")
            # Add more details as needed
    else:
        print(f"Error: {response.status_code} - {response.text}")

# Function to get course-level student summary data
def get_student_summaries(course_id):
    endpoint = f'/api/v1/courses/{course_id}/analytics/student_summaries'
    response = make_canvas_api_request(endpoint)
    
    if response.status_code == 200:
        student_summaries_data = response.json()
        for summary in student_summaries_data:
            print(f"User ID: {summary['user']['id']}")
            # Add more details as needed
    else:
        print(f"Error: {response.status_code} - {response.text}")

# Example usage
course_id = '3438308'  # Replace with the actual course ID
get_course_assignments(course_id)
get_student_summaries(course_id)
