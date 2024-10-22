# API View

API View is a GraphQL API that allows you to manage users and posts. This API provides endpoints for creating, updating, fetching, and deleting users and posts. Built with extensibility in mind, it enables seamless integration with your application while offering powerful query and mutation capabilities.

## Features

- Fetch a single user or list of users
- Create, update, and delete users
- Fetch a single post or list of posts
- Create, update, and delete posts

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
  - [Queries](#queries)
    - [Get a User](#get-a-user)
    - [Get All Users](#get-all-users)
    - [Get a Post](#get-a-post)
    - [Get All Posts](#get-all-posts)
  - [Mutations](#mutations)
    - [Create a User](#create-a-user)
    - [Update a User](#update-a-user)
    - [Delete a User](#delete-a-user)
    - [Create a Post](#create-a-post)
    - [Update a Post](#update-a-post)
    - [Delete a Post](#delete-a-post)
- [Contributing](#contributing)
- [License](#license)

## Installation

Clone the repository and install the dependencies:

```bash
git clone https://github.com/luissshc29/API--api-view.git
cd API--api-view
npm install
```

## Usage

After installing, you can run the API with the following command:

```bash
npm start
```

This will start the server at `http://localhost:4000/`.

## Queries

### Get a User

Fetch a specific user by their `id`:

```graphql
query {
  getUser(filter: { id: 1 }) {
    id
    firstName
    lastName
    userName
    createdAt
    posts {
      id
      title
    }
  }
}
```

### Get All Users

Fetch a list of all users:

```graphql
query {
  getUsers {
    id
    firstName
    lastName
    userName
    createdAt
  }
}
```

### Get a Post

Fetch a specific post by its `id`:

```graphql
query {
  getPost(filter: { id: 1 }) {
    id
    title
    body
    createdAt
    user {
      firstName
      lastName
    }
  }
}
```

### Get All Posts

Fetch a list of posts (optionally filtered):

```graphql
query {
  getPosts {
    id
    title
    body
    createdAt
  }
}
```

## Mutations

### Create a User

Create a new user:

```graphql
mutation {
  createUser(data: { firstName: "John", lastName: "Doe", userName: "johndoe" }) {
    id
    firstName
    lastName
    userName
  }
}
```

### Update a User

Update a user's details:

```graphql
mutation {
  updateUser(filter: { id: 1 }, data: { firstName: "John", lastName: "Smith" }) {
    id
    firstName
    lastName
  }
}
```

### Delete a User

Delete a user by `id`:

```graphql
mutation {
  deleteUser(filter: { id: 1 }) {
    id
    firstName
  }
}
```

### Create a Post

Create a new post for a user:

```graphql
mutation {
  createPost(data: { title: "New Post", body: "This is the body of the post", userId: 1 }) {
    id
    title
    body
  }
}
```

### Update a Post

Update an existing post:

```graphql
mutation {
  updatePost(filter: { id: 1 }, data: { title: "Updated Post" }) {
    id
    title
    body
  }
}
```

### Delete a Post

Delete a post by `id`:

```graphql
mutation {
  deletePost(filter: { id: 1 }) {
    id
    title
  }
}
```

## Contributing

Contributions are welcome! Please submit a pull request or open an issue for any changes or features you would like to see.

## License

This project is licensed under the MIT License.
