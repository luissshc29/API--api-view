import { prisma } from "../../utils/PrismaClient";

const postResolvers = {
  Query: {
    async getPost(_, { filter }) {
      const { id } = filter;
      if (id) {
        try {
          const post = await prisma.posts.findFirst({
            where: {
              id,
            },
          });
          if (!post) {
            throw new Error("Post does not exist");
          }
          return post;
        } catch (err) {
          throw new Error(err);
        }
      }
      throw new Error("Missing Id");
    },
    async getPosts(_, { filter }) {
      if (filter) {
        const { id } = filter;
        // Verifies if user ID exists
        try {
          const userIdExists = await prisma.users.findFirst({
            where: {
              id,
            },
          });
          if (!userIdExists) {
            throw new Error("User does not exist");
          }

          try {
            const posts = await prisma.posts.findMany({
              where: {
                userId: id,
              },
            });

            if (posts.length === 0) {
              throw new Error("This user has no posts");
            }
            return posts;
          } catch (err) {
            throw new Error(err);
          }
        } catch (err) {
          throw new Error(err);
        }
      } else {
        try {
          const posts = await prisma.posts.findMany();

          if (!posts) {
            throw new Error();
          }

          return posts;
        } catch (err) {
          throw new Error(err);
        }
      }
    },
  },
  Mutation: {
    async createPost(
      _,
      { data }: { data: { title: string; body: string; userId: number } }
    ) {
      const { body, title, userId } = data;

      // Verifies if body, title and userId were sent
      if (body && title && userId) {
        const currentDate = new Date().toISOString();

        // Verifies if body, title or userId are empty strings
        if (typeof title !== "undefined") {
          if (!title) throw new Error("Missing title");
        }
        if (typeof body !== "undefined") {
          if (!body) throw new Error("Missing body");
        }
        if (typeof userId !== "undefined") {
          if (!userId) throw new Error("Missing userId");
        }

        // Gets the last indexRef in the posts array;
        const postsArray = await prisma.posts.findMany();
        const lastIndexRef = postsArray[postsArray.length - 1].indexRef || 1;
        const newPost = {
          ...data,
          indexRef: lastIndexRef + 1,
          createdAt: currentDate,
        };

        try {
          // Verifies if userId exists
          const userExists = await prisma.users.findFirst({
            where: {
              id: data.userId,
            },
          });
          if (!userExists) {
            throw new Error("User does not exist");
          }

          try {
            // Creates post
            await prisma.posts.create({
              data: newPost,
            });

            try {
              const post = await prisma.posts.findFirst({
                where: {
                  ...data,
                },
              });

              if (post) {
                return post;
              }
            } catch (err) {
              throw new Error(err);
            }
          } catch (err) {
            throw new Error(err);
          }
        } catch (err) {
          throw new Error(err);
        }
      }
      throw new Error("You have to send title, body and userId");
    },
    async updatePost(
      _,
      {
        filter,
        data,
      }: {
        filter: { id: number };
        data: { title: string; body: string };
      }
    ) {
      const { body, title } = data;
      const { id } = filter;

      // Verifies if title or body were sent and were not empy strings
      if (!title && !body) {
        throw new Error("You need to send at least one new information");
      }

      const newPost = {
        ...data,
      };

      try {
        // Verifies if post ID exists
        const post = await prisma.posts.findFirst({
          where: {
            id,
          },
        });
        if (!post) {
          throw new Error("Post does not exist");
        }

        try {
          // Updates Post
          await prisma.posts.update({
            where: {
              id,
            },
            data: newPost,
          });

          try {
            const post = await prisma.posts.findFirst({
              where: {
                id,
              },
            });

            if (post) {
              return post;
            }
          } catch (err) {
            throw new Error(err);
          }
        } catch (err) {
          throw new Error(err);
        }
      } catch (err) {
        throw new Error(err);
      }
    },
    async deletePost(_, { filter }) {
      const { id } = filter;
      try {
        // Verifies if post ID exists
        const post = await prisma.posts.findFirst({
          where: {
            id,
          },
        });
        if (!post) {
          throw new Error("Post does not exist");
        }

        try {
          await prisma.posts.delete({ where: { id } });
          return post;
        } catch (err) {
          throw new Error(err);
        }
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  Post: {
    async user({ userId }, _) {
      const user = await prisma.users.findUnique({
        where: {
          id: userId,
        },
      });

      return user;
    },
  },
};

export default postResolvers;
