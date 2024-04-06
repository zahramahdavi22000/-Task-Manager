# Task Manager

Task Manager is a RESTful API-based application designed to help users manage their tasks efficiently. It provides endpoints for user authentication, task management, and administrative actions.

## Features

- **User Authentication:** Users can sign up and log in securely to access the task management functionalities.
- **Task Management:** Users can create, read, update, and delete tasks.
- **File Upload:** Users can upload attachments for tasks and avatars for their profiles.
- **Administrative Actions:** Admin users have additional privileges such as managing users.

## Technologies Used

- **Node.js:** Backend server environment.
- **Nestjs:** A progressive Node.js framework.
- **MySql:** SQL database for storing user data and tasks.
- **TypeOrm:** ORM for mysql.
- **JWT:** JSON Web Tokens for user authentication.
- **Adminer:** Database management.
- **Postman:** API development and testing tool.

## Installation

1. Clone the repository:

```
git clone https://github.com/zahramahdavi22000/Task-Manager.git
```

2. Install docker:
```
curl -fsSL https://get.docker.com | sudo sh

```

3. Start with docker-compose:
```
docker compose up
```

4. Access the API endpoints using a tool like Postman or integrate them into your frontend application.

## API Endpoints

- **GET /:** Root endpoint.
- **POST /user/signup:** User signup.
- **POST /user/login:** User login.
- **GET /user:** Get my user details.
- **PATCH /user:** Update user details.
- **POST /user/avatar:** Upload user avatar.
- **GET /user/avatar/:filename:** Get user avatar.
- **GET /task:** Get tasks.
- **POST /task:** Create a task.
- **GET /task/:id:** Get a task by ID.
- **PATCH /task/:id:** Update a task.
- **DELETE /task/:id:** Delete a task.
- **GET /admin/user:** Get all users (Admin only).
- **PATCH /admin/user:** Update user details (Admin only).
- **DELETE /admin/user:** Delete a user (Admin only).