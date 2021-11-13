function Feed(parent, args, context, info) {
    return context.prisma.findMany()
}


module.exports = {
    Feed,
}