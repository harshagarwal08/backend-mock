const services = require('../services/userServices')
const {HTTPError} = require('../utils/error')

exports.createUser = async (req, res) => {
    try{
        const {email, name} = req.body 
        const data = await services.createUser({email, name})
        if(!data) throw new HTTPError('User already exists', 404)
        res.status(201).json(data)
    }
    catch(err){
        if(err instanceof HTTPError) return res.status(err.code).json({message: err.message})
        res.status(500).json({message: 'Internal Server Error'})
    }
}

exports.createTask = async (req, res) => {
    try{
        const {userId} = req.params
        const {title} = req.body 
        const data = await services.createTask({title, userId})
        if(!data) throw new HTTPError('User not found', 404)
        res.status(201).json(data)
    }
    catch(err){
        if(err instanceof HTTPError) return res.status(err.code).json({message: err.message})
        res.status(500).json({message: 'Internal Server Error'})
    }
}

exports.getTasks = async (req, res) => {
    try{
        const data = await services.getTasks(req.params.userId)
        if(!data) throw new HTTPError('User not found', 404)
        res.status(200).json(data)
    }
    catch(err){
        if(err instanceof HTTPError) return res.status(err.code).json({message: err.message})
        res.status(500).json({message: 'Internal Server Error'})
    }
}

exports.getUsers = async (req, res) => {
    try{
        const data = await services.getUsers()
        if(!data) throw new HTTPError('User not found', 404)
        res.status(200).json(data)
    }
    catch(err){
        if(err instanceof HTTPError) return res.status(err.code).json({message: err.message})
        res.status(500).json({message: 'Internal Server Error'})
    }
}

exports.getUser = async (req, res) => {
    try{
        const data = await services.getUser(req.params.userId)
        if(!data) throw new HTTPError('User not found', 404)
        res.status(200).json(data)
    }
    catch(err){
        if(err instanceof HTTPError) return res.status(err.code).json({message: err.message})
        res.status(500).json({message: 'Internal Server Error'})
    }
}

exports.getTask = async (req, res) => {
    try{
        const {userId, taskId} = req.params
        const task = await services.getTask(userId, taskId)
        if(!task) throw new HTTPError('Task not found', 404)
        res.status(200).json(task)
    }
    catch(err){
        if(err instanceof HTTPError) return res.status(err.code).json({message: err.message})
        res.status(500).json({message: 'Internal Server Error'})
    }
}

exports.editTask = async (req, res) => {
    try{
        const {title} = req.body
        const {userId, taskId} = req.params
        await services.editTask(title, userId, taskId)
        res.status(200).json({message: 'task edited successfully'})
    }
    catch(err){
        res.status(500).json({message: 'Internal Server Error'})
    }
}

exports.deleteUser = async (req, res) => {
    try{
        const {userId} = req.params
        await services.deleteUser(userId)
        res.status(200).json({message: 'user deleted successfully'})
    }
    catch(err){
        res.status(500).json({message: 'Internal Server Error'})
    }
} 

exports.deleteTask = async (req, res) => {
    try{
        const {userId, taskId} = req.params
        await services.deleteTask(userId, taskId)
        res.status(200).json({message: 'task deleted successfully'})
    }
    catch(err){
        res.status(500).json({message: 'Internal Server Error'})
    }
}

