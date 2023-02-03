const userControllers = require('../../src/controllers/userControllers')
const userServices = require('../../src/services/userServices')

describe('createUser', () => {
    it('should create a user', async () => {
        const data = {
            name: 'harsh agarwal',
            email: 'harsh821agarwal'
        }
        jest.spyOn(userServices, 'createUser').mockResolvedValue(data)
        const mockReq = {
            body: data
        }
        const mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }
        await userControllers.createUser(mockReq, mockRes)
        expect(mockRes.status).toBeCalledWith(201)
        expect(mockRes.json).toBeCalledWith(data)
    })
    it('should throw an error', async () => {
        const data = {
            name: 'harsh agarwal',
            email: 'harsh821agarwal'
        }
        jest.spyOn(userServices, 'createUser').mockResolvedValue(null)
        const mockReq = {
            body: data
        }
        const mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }
        await userControllers.createUser(mockReq, mockRes)
        expect(mockRes.status).toBeCalledWith(404)
        expect(mockRes.json).toBeCalledWith({message: 'User already exists'})
    }
    )
    it('should throw a server error', async () => {
        const data = {
            name: 'harsh agarwal',
            email: 'harsh821agarwal'
        }
        jest.spyOn(userServices, 'createUser').mockRejectedValue(new Error('Internal Server Error'))
        const mockReq = {
            body: data
        }
        const mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }
        await userControllers.createUser(mockReq, mockRes)
        expect(mockRes.status).toBeCalledWith(500)
        expect(mockRes.json).toBeCalledWith({message:'Internal Server Error'})
    })
})

describe('createTask', () => {
    it('should create a task', async () => {
        const data = {
            title: 'task 1'
        }
        jest.spyOn(userServices, 'createTask').mockResolvedValue(data)
        const mockReq = {
            params: {userId: 1},
            body: data
        }
        const mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }
        await userControllers.createTask(mockReq, mockRes)
        expect(mockRes.status).toBeCalledWith(201)
        expect(mockRes.json).toBeCalledWith(data)
    })
    it('should throw an error', async () => {
        const data = {
            title: 'task 1',
            userId: 1
        }
        jest.spyOn(userServices, 'createTask').mockResolvedValue(null)
        const mockReq = {
            params: {userId: 1},
            body: data
        }
        const mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }
        await userControllers.createTask(mockReq, mockRes)
        expect(mockRes.status).toBeCalledWith(404)
        expect(mockRes.json).toBeCalledWith({message: 'User not found'})
    })
    it('should throw a server error', async () => {
        const data = {
            title: 'task 1',
            userId: 1
        }
        jest.spyOn(userServices, 'createTask').mockRejectedValue(new Error('Internal Server Error'))
        const mockReq = {
            params: {userId: 1},
            body: data
        }
        const mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }
        await userControllers.createTask(mockReq, mockRes)
        expect(mockRes.status).toBeCalledWith(500)
        expect(mockRes.json).toBeCalledWith({message:'Internal Server Error'})
    })
})

describe('getTasks', () => {
    it('should get tasks', async () => {
        const data = [{
            id: 1,
            title: 'task 1',
            userId: 1
        }, {
            id: 2,
            title: 'task 2',
            userId: 1
        }]
        jest.spyOn(userServices, 'getTasks').mockResolvedValue(data)
        const mockReq = {
            params: {
                userId: 1
            }
        }
        const mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }
        await userControllers.getTasks(mockReq, mockRes)
        expect(mockRes.status).toBeCalledWith(200)
        expect(mockRes.json).toBeCalledWith(data)
    })
    it('should throw an error', async () => {
        jest.spyOn(userServices, 'getTasks').mockResolvedValue(null)
        const mockReq = {
            params: {
                userId: 1
            }
        }
        const mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }
        await userControllers.getTasks(mockReq, mockRes)
        expect(mockRes.status).toBeCalledWith(404)
        expect(mockRes.json).toBeCalledWith({message: 'User not found'})
    }
    )
    it('should throw a server error', async () => {
        jest.spyOn(userServices, 'getTasks').mockRejectedValue(new Error('Internal Server Error'))
        const mockReq = {
            params: {
                userId: 1
            }
        }
        const mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }
        await userControllers.getTasks(mockReq, mockRes)
        expect(mockRes.status).toBeCalledWith(500)
        expect(mockRes.json).toBeCalledWith({message:'Internal Server Error'})
    })
})

describe('getTask', () => { 

    it('should get a task', async () => {
        const data = {
            id: 1,
            title: 'task 1',
            userId: 1
        }
        jest.spyOn(userServices, 'getTask').mockResolvedValue(data)
        const mockReq = {
            params: {
                userId: 1,
                taskId: 1
            }
        }
        const mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }
        await userControllers.getTask(mockReq, mockRes)
        expect(mockRes.status).toBeCalledWith(200)
        expect(mockRes.json).toBeCalledWith(data)
    })
    it('should throw an error', async () => {
        jest.spyOn(userServices, 'getTask').mockResolvedValue(null)
        const mockReq = {
            params: {
                userId: 1,
                taskId: 1
            }
        }
        const mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }
        await userControllers.getTask(mockReq, mockRes)
        expect(mockRes.status).toBeCalledWith(404)
        expect(mockRes.json).toBeCalledWith({message: 'Task not found'})
    })
    it('should throw a server error', async () => {
        jest.spyOn(userServices, 'getTask').mockRejectedValue(new Error('Internal Server Error'))
        const mockReq = {
            params: {
                userId: 1,
                taskId: 1
            }
        }
        const mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }
        await userControllers.getTask(mockReq, mockRes)
        expect(mockRes.status).toBeCalledWith(500)
        expect(mockRes.json).toBeCalledWith({message:'Internal Server Error'})
    })
})