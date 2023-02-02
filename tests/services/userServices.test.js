const userServices = require('../../src/services/userServices')
const {Task, User} = require('../../database/models')

describe('createUser', () => {
    it('should create a user', async () => {
        const data = {
            name: 'harsh agarwal',
            email: 'harsh821agarwal@gmail.com'
        }
        const user = jest.spyOn(User, 'create').mockResolvedValue(data)
        
        const result = await userServices.createUser(data)

        expect(user).toBeCalledWith(data)
        expect(result).toEqual(data)
    })
})

describe('createTask', () => {
    it('should create a task', async () => {
        const data = {
            title: 'test task',
            userId: 1
        }
        const task = jest.spyOn(Task, 'create').mockResolvedValue(data)

        const result = await userServices.createTask(data)

        expect(task).toBeCalledWith(data)
        expect(result).toEqual(data)
    })
})

describe('getTasks', () => {
    it('should get all tasks', async () => {
        const data = [
            {
                id: 1,
                title: 'task 1',
                userId: 1
            },
            {
                id: 2,
                title: 'task 2',
                userId: 1
            }
        ]
        const user = jest.spyOn(User, 'findByPk').mockResolvedValue({
            tasks: data
        })

        const result = await userServices.getTasks(1)

        expect(user).toBeCalledWith(1, {
            include: {
                model: Task,
                as: 'tasks'
            }
        })
        expect(result).toEqual(data)
    })
})

describe('getUsers', () => {
    it('should get all users', async () => {
        const data = [
            {
                id: 1,
                name: 'harsh agarwal',
                email: 'harsh821agarwal@gmail.com'
            },
            {
                id: 2,
                name: 'anubhav kumar',
                email: 'anubhavkumar@gmail.com'
            }
        ]
        const users = jest.spyOn(User, 'findAll').mockResolvedValue(data)

        const result = await userServices.getUsers()

        expect(users).toBeCalledWith({
            include: {
                model: Task,
                as: 'tasks'
            }
        })
        expect(result).toEqual(data)
    })
})

describe('getUser', () => {
    it('should get a user', async () => {
        const data = {
            id: 1,
            name: 'harsh agarwal',
            email: 'harsh821agarwal@gmail.com',
            tasks: [
                {
                    id: 1,
                    title: 'task 1',
                    userId: 1
                },
                {
                    id: 2,
                    title: 'task 2',
                    userId: 1
                }
            ]
        }
        const user = jest.spyOn(User, 'findByPk').mockResolvedValue(data)

        const result = await userServices.getUser(1)

        expect(user).toBeCalledWith(1, {
            include: {
                model: Task,
                as: 'tasks'
            }
        })
        expect(result).toEqual(data)
    })
})

describe('editTask', () => {
    it('should edit a task', async () => {
        const data = {
            id: 1,
            title: 'task 1',
            userId: 1
        }
        const task = jest.spyOn(User, 'findByPk').mockResolvedValue({
            tasks: data
        })
        const result = await userServices.editTask(1, data)

        expect(task).toBeCalledWith(1, 1, {
            where: {
                id: 1
            }
        })
        expect(result).toEqual(data)
    })
})

describe('deleteUser', () => {
    it('should delete a user', async () => {
        const data = {
            id: 1,
            name: 'harsh agarwal',
            email: 'harsh821agarwal@gmail.com',
            tasks: [],
        }

        const user = jest.spyOn(User, 'destroy').mockResolvedValue(data)

        const result = await userServices.deleteUser(1)

        expect(user).toBeCalledWith({
            where: {
                id: 1
            }
        })
        expect(result).toEqual(data)
    })
})
