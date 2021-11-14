const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')




async function post(parent, args, context) {
  const newLink = context.prisma.link.create({
    data: {
      url: args.url,
      description: args.description,
    },
  });
  return newLink;
}

async function signUp(parent, args, context, info) {
  const password = await bcrypt.hash(args.password, 10);
  const user = await context.prisma.user.create({
    data: { ...args, password },
  });
  const token = jwt.sign({ userId: user.id }, APP_SECRET);

  return {
    token,
    user,
  };
}

async function login(parent, args, context, info) {
  const user = await context.prisma.user.findUnique({
    where: { email: args.email },
  });
  if (!user) {
    throw new Error("No such user found");
  }

  const valid = await bcrypt.compare(args.password, user.password);
  if (!valid) {
    throw new Error("Invalid Password");
  }

  const token = jwt.sign({ userId: user.id }, APP_SECRET);
}

module.exports = {
  signUp,
  login,
  post
};
