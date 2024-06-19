# ActiveZen

ActiveZen is a cloud-based web application designed to enhance personal development by encouraging users to engage in various skills and hobbies. The platform offers a user-centric experience, integrating scalable AWS services to ensure robust performance and high availability.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Technologies](#technologies)
- [Installation](#installation)
- [Usage](#usage)
- [Environment Variables](#environment-variables)
- [Setup and Configuration](#setup-and-configuration)
- [Operations](#Operations)
- [Contributing](#contributing)
- [License](#license)

## Introduction

ActiveZen aims to promote personal growth by providing a comprehensive platform where users can explore a variety of skills and hobbies through workshops, sports locations, and community engagement.

## Features

- **User Authentication**: Secure login and signup features with JWT for authentication and authorization.
- **Skills and Workshops**: Displays a curated list of skills and associated workshops based on user interests.
- **Sports Location Finder**: Provides information on available playgrounds for various sports.
- **Hobbies Explorer**: Detailed information about different hobbies, including difficulty levels and required equipment.
- **Cultural Trivia**: Engaging trivia about favorite dishes from different countries.
- **Community Section**: Enables users to communicate, post messages, and interact with the community.

## Technologies

The project is built with the following technologies:

- **ReactJS**: A JavaScript library for building user interfaces.
- **Redux**: A state management tool for JavaScript apps.
- **Node.js**: A JavaScript runtime for building the backend.
- **Express.js**: A web application framework for Node.js.
- **MongoDB Atlas**: For scalable and flexible data storage.
- **AWS Elastic Beanstalk**: For deployment and hosting.
- **JWT (Json Web Token)**: For secure authentication.
- **Google reCAPTCHA**: For preventing automated bots.
- **Bootstrap**: For responsive design and styling.

## Installation

To run this project locally, follow these steps:

### Prerequisites

- Node.js
- npm or yarn
- MongoDB Atlas account
- AWS account

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend

2. Install the dependencies:
    ```bash
    npm install

3. Set up the environment variables in the .env file.

4. Start the backend server:
    ```bash
    npm start

### Frontend Setup

1. Navigate to the frontend directory:
    ```bash
    cd frontend

2. Install the dependencies:
    ```bash
    npm install

3. Start the frontend application:
    ```bash
    npm start

## Usage
Once the servers are running, you can access the application via http://localhost:3000. Users can sign up, log in, explore skills and workshops, participate in trivia, and engage with the community.

## Environment Variables
Ensure you have the necessary environment variables set up. You can find a sample configuration in the .env file. Here are the key variables:

1. `PORT`: Port for the backend server.
2. `MONGODB_URI`: MongoDB connection string.
3. `JWT_SECRET`: Secret key for JWT authentication.
4. `RECAPTCHA_SECRET_KEY`: Google reCAPTCHA secret key.
5. `AWS_ACCESS_KEY_ID`: AWS access key for accessing AWS services.
6. `AWS_SECRET_ACCESS_KEY`: AWS secret key for accessing AWS services.

## setup-and-configuration

### Node.js and React.js
1. Initialize the Node.js project:
    ```bash
    npm init

2. Install necessary packages:
    ```bash
    npm install

3. Create a React.js project:
    ```bash
    npx create-react-app appname

### AWS Services Configuration
1. AWS Elastic Beanstalk: Deploy the frontend and backend applications.

### Database Configuration
1. MongoDB Atlas: Set up the database cluster and configure connection strings.

## Operations
1. User Authentication: Secure login and signup using JWT and Google reCAPTCHA.
2. Data Visualization: Display skills, workshops, and hobbies information.
3. Community Engagement: Post messages and interact within the community section.
4. Cultural Trivia: Participate in trivia about favorite dishes from various countries.

## Contributing
We welcome contributions from the community. Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch (git checkout -b feature-branch).
3. Make your changes.
4. Commit your changes (git commit -m 'Add some feature').
5. Push to the branch (git push origin feature-branch).
6. Open a Pull Request.

## License
This project is licensed under the MIT License.

