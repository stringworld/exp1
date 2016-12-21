module.exports = {
    '/': {
        compontent: require('./compontent/index')
    },
    '/list':{
        compontent:require('./compontent/list')
    },
    '*':{
        compontent:require('./compontent/notFound')
    }
}