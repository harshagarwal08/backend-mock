const {User, Task} = require('../../database/models')

exports.createUser = async(data) => {
    return await User.create(data)
}

exports.createTask = async(data) => {
    return await Task.create(data)
}

exports.getTasks = async(userId) => {
    const user = await User.findByPk(userId, {
        include: {
            model: Task,
            as: 'tasks'
        }
    })
    return user.tasks
}

exports.getUsers = async () => {
    const users = await User.findAll({
        include: {
            model: Task,
            as: 'tasks'
        }
    })
    return users
}

exports.getUser = async (userId) => {
    const data = await User.findByPk(userId)
    return data
}
exports.getTask = async (userId, taskId) => {
    const users = await User.findByPk(userId, {
        include: {
            model: Task,
            as: 'tasks',
            where: {
                id: taskId
            }
        }
    })
    return users.tasks[0]
}

exports.editTask = async (title, userId, taskId) => {
    const user = await User.findByPk(userId, {
        include: {
            model: Task,
            as: 'tasks',
            where: {
                id: taskId,
            }
        }
    })
    const task = user.tasks[0]
    task.title = title
    await task.save()
    return task
}

exports.deleteUser = async (userId) => {
    const user = await User.findByPk(userId)
    await user.destroy()
} 

exports.deleteTask = async (userId, taskId) => {
    const user = await User.findByPk(userId, {
        include: {
            model: Task,
            as: 'tasks',
            where: {
                id: taskId,
            }
        }
    })
    const task = user.tasks[0]
    await task.destroy()
}