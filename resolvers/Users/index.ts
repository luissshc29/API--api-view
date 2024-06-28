import { prisma } from "../..";

const userResolvers = {
  Query: {
    async getUser(_, { filter }) {
      const { id } = filter;
      if (id) {
        try {
          const user = await prisma.users.findFirst({
            where: {
              id,
            },
          });
          if (!user) {
            throw new Error("User does not exist");
          }
          return user;
        } catch (err) {
          throw new Error(err);
        }
      }
      throw new Error("Missing Id");
    },
    async getUsers(_, __) {
      try {
        const users = await prisma.users.findMany();

        if (!users) {
          throw new Error();
        }

        return users;
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  Mutation: {
    async createUser(
      _,
      {
        data,
      }: { data: { firstName: string; lastName: string; userName: string } }
    ) {
      const { lastName, firstName, userName } = data;

      // Verifies if lastName, firstName and userName were sent
      if (lastName && firstName && userName) {
        const currentDate = new Date().toISOString();

        // Verifies if lastName, firstName or userName are empty strings
        if (typeof firstName !== "undefined") {
          if (!firstName) throw new Error("Missing firstName");
        }
        if (typeof lastName !== "undefined") {
          if (!lastName) throw new Error("Missing lastName");
        }
        if (typeof userName !== "undefined") {
          if (!userName) throw new Error("Missing userName");
        }

        // Gets the last indexRef in the users array;
        const usersArray = await prisma.users.findMany();
        const lastIndexRef = usersArray[usersArray.length - 1].indexRef;
        const newUser = {
          ...data,
          indexRef: lastIndexRef + 1,
          createdAt: currentDate,
        };
        try {
          // Verifies if userName already exists
          const user = await prisma.users.findFirst({
            where: {
              userName: data.userName,
            },
          });
          if (user) {
            throw new Error("Username already exists");
          }
          try {
            await prisma.users.create({
              data: newUser,
            });

            try {
              const user = await prisma.users.findFirst({
                where: {
                  ...data,
                },
              });

              if (user) {
                return user;
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
      throw new Error("You have to send firstName, lastName, userName");
    },
    async updateUser(
      _,
      {
        filter,
        data,
      }: {
        filter: { id: number };
        data: { firstName: string; lastName: string; userName: string };
      }
    ) {
      const { lastName, firstName, userName } = data;
      const { id } = filter;

      // Verifies if lastName and/or firstName and/or userName are empty strings
      if (typeof firstName !== "undefined") {
        if (!firstName) throw new Error("Missing firstName");
      }
      if (typeof lastName !== "undefined") {
        if (!lastName) throw new Error("Missing lastName");
      }
      if (typeof userName !== "undefined") {
        if (!userName) throw new Error("Missing userName");
      }

      const newUser = {
        ...data,
      };

      try {
        // Verifies if user ID exists
        const userIdExists = await prisma.users.findFirst({
          where: {
            id,
          },
        });
        if (!userIdExists) {
          throw new Error("User does not exist");
        }
        try {
          // Verifies if userName already exists
          if (data.userName) {
            const userNameExists = await prisma.users.findFirst({
              where: {
                userName: data.userName,
              },
            });
            if (userNameExists) {
              throw new Error("Username already exists");
            }
          }
          try {
            // Updates user
            await prisma.users.update({
              where: {
                id,
              },
              data: newUser,
            });

            const user = await prisma.users.findFirst({
              where: {
                id,
              },
            });

            if (user) {
              return user;
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
    async deleteUser(_, { filter }) {
      const { id } = filter;
      try {
        // Verifies if user ID exists
        const user = await prisma.users.findFirst({
          where: {
            id,
          },
        });
        if (!user) {
          throw new Error("User does not exist");
        }

        try {
          await prisma.users.delete({ where: { id } });
          return user;
        } catch (err) {
          throw new Error(err);
        }
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  User: {
    async posts({ id }, _) {
      const posts = await prisma.posts.findMany({
        where: {
          userId: id,
        },
      });

      return posts;
    },
  },
};

export default userResolvers;
