import requests

# Set your Canvas API URL and access token
CANVAS_API_URL = "https://westminster.instructure.com/api/v1/courses"
ACCESS_TOKEN = '349~4QtJhiVlrX9sUAQdQJcSFECg3bscur66PT32cetc3NJFJ3xs3aqMvyz6xH4rf6yM'

# Define parameters for the API call
params = {
    'enrollment_type': 'teacher',
}

# Set headers including the authorization header with the access token
headers = {
    'Authorization': 'Bearer ' + ACCESS_TOKEN,
}

# Make the API call
response = requests.get(CANVAS_API_URL, params=params, headers=headers)

# Check if the request was successful (HTTP status code 200)
if response.status_code == 200:
    # Parse and print the course information
    courses = response.json()
    for course in courses:
        print(f"Course ID: {course['id']}, Name: {course['name']}")
else:
    # Print an error message if the request was not successful
    print(f"Error: {response.status_code} - {response.text}")
