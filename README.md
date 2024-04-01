## Introduction
This project aims to develop a Learning and Analytics Platform integrated with the Canvas Learning Management System (LMS). By harnessing the Canvas API, the platform will enable seamless data exchange between its frontend and Canvas. The primary objective is to empower educators with valuable insights derived from learning analytics and deliver personalized learning experiences tailored to individual student needs within the Canvas LMS environment.


## Features

- Seamless integration with Canvas LMS through the Canvas API
- Extraction and analysis of relevant data for insightful analytics
- User-friendly dashboard for educators to access and understand data


## Technologies Used

- Server-side development: Node.js
- Frontend: React with TypeScript
- Canvas API integration for data exchange
- Data visualization components for easy understanding of analytics

## Getting Started

To get started with LearnSync, follow these steps:

1. Clone the repository:

  git clone <repository_url>



2. Install dependencies for both server and client:

  cd learnsyc-server
  npm install
  cd ../learnsync-client
  npm install



3. Obtain Canvas API access token and domain from your Canvas LMS administrator.

4. Configure the server to use the Canvas API by providing the access token and domain.

5. Start the server:
  
  cd learnsyc-server
  npm start


6. Start the client:

  cd learnsyc-client
  npm start



7. Access LearnSync through your browser at http://localhost:3000.

## Contributing

Contributions to LearnSync are welcome! If you have any ideas for improvements, open an issue or submit a pull request.
