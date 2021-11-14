function feed(parent, args, context, info) {
    return context.prisma.findMany()
}


module.exports = {
    feed,
}