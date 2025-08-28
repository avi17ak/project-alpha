const userController = require('../../../controllers/userController')
const User = require('../../../models/User')

// Mocking response methods
const mockSend = jest.fn()
const mockJson = jest.fn()
const mockEnd = jest.fn()

// we are mocking .send(), .json() and .end()
const mockStatus = jest.fn(() => ({ 
  send: mockSend, 
  json: mockJson, 
  end: mockEnd 
}));

const mockRes = { status: mockStatus };

describe('Questions controller', () => {
    beforeEach(() => jest.clearAllMocks())

    afterAll(() => jest.resetAllMocks())

    describe ('show', () => {
        let testUser, mockReq;

        beforeEach(() => {
        testUser = { userid: 1, name: 'max', email: 'max@gmail.com', username: 'max1', password: 'lafosse' }
        mockReq = { params: { id: 1 } }
        });

        it('should return a user with a 200 status code', async () => {
            jest.spyOn(User, 'getOneById').mockResolvedValue(new User(testUser))

            await userController.show(mockReq, mockRes);
            
            expect(User.getOneById).toHaveBeenCalledTimes(1);
            expect(mockStatus).toHaveBeenCalledWith(200);
            expect(mockJson).toHaveBeenCalledWith(new User(testUser))
            })

        it('should return an error if the user is not found', async () => {
            jest.spyOn(User, 'getOneById').mockRejectedValue(new Error('oh no'))

            await userController.show(mockReq, mockRes)
            
            expect(User.getOneById).toHaveBeenCalledTimes(1)
            expect(mockStatus).toHaveBeenCalledWith(404)
            expect(mockJson).toHaveBeenCalledWith({ error: 'oh no' })
        })
    })

    describe('update route', () => {
        it('should update the user and return with a 200 status code', async () => {
            let testUser = {
                userid: 1, 
                username: 'max1', 
                name: 'max',
                email: 'max@gmail.com',
                password: 'lafosse'
            }

            let newTestUser = {
                userid: 1, 
                username: 'max1', 
                name: 'mehrab',
                email: 'max@gmail.com',
                password: 'lafosse'
            }

            let mockReq = {params: {id: 1}, body: {name: 'mehrab'}}

            jest.spyOn(User, 'getOneById').mockResolvedValue(new User(testUser))
            jest.spyOn(User.prototype, 'updateUser').mockResolvedValue(newTestUser)

            await userController.update(mockReq, mockRes)

            expect(User.getOneById).toHaveBeenCalledWith(1)
            expect(User.prototype.updateUser).toHaveBeenCalledWith({name: 'mehrab'})
            expect(mockStatus).toHaveBeenCalledWith(200)
        })

        it('should return an error if the userid is not found', async () => {
            const mockReq = { params: { id: 1 }, body: {} };

            jest.spyOn(User, 'getOneById').mockRejectedValue(new Error('no!'));

            await userController.update(mockReq, mockRes);

            expect(User.getOneById).toHaveBeenCalledWith(1);
            expect(mockStatus).toHaveBeenCalledWith(404);
            expect(mockJson).toHaveBeenCalledWith({error: 'no!'});
            })
    })
})