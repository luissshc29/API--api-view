const PostTypes = `#graphql
  extend type Query {
    getPost(filter: PostFilter!): Post
    getPosts(filter: PostFilter): [Post!]!
  }

  extend type Mutation {
    createPost(data: CreatePostInput!): Post
    updatePost(filter: PostFilter!, data: EditPostInput!): Post
    deletePost(filter: PostFilter!): Post
  }

  type Post {
    id: Int!,
    title: String!,
    body: String!,
    indexRef: Int!,
    createdAt: String!,
    user: User!
    userId: Int!
  }

  input PostFilter {
    id: Int!
  }

  input EditPostInput {
    title: String,
    body: String,
  }

  input CreatePostInput {
    title: String!,
    body: String!,
    userId: Int!
  }

`;

export default PostTypes;
