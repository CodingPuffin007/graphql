function postedBy(parent, args, context) {
    return context.prisma.findUnique({ where: { id: parent.id } }).postedBy()
}

module.exports = {
    postedBy
}