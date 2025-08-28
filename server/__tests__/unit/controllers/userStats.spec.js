const userStatsController = require('../../../controllers/userStatsController')
const Userstats = require('../../../models/UserStats')

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

describe('Userstats controller', () => {
    beforeEach(() => jest.clearAllMocks())

    afterAll(() => jest.resetAllMocks())

    describe('show route', () => {
        let testUserStats, mockReq;

        beforeEach(() => {
            testUserStats = {
                userstatsid: 1, 
                username: 'max', 
                overallpercentage: 0,
                geographycorrect: 12,
                historycorrect: 9,
                spanishcorrect: 6,
                musiccorrect: 35,
                totalquizzes: 27,
                totaltime: 21
            }

            mockReq = {params: {username: 'max'}}
        })

        it('should return the user stats with a 200 status code', async () => {
            jest.spyOn(Userstats, 'getUserStatsByUsername').mockResolvedValue(new Userstats(testUserStats))

            await userStatsController.show(mockReq, mockRes)

            expect(Userstats.getUserStatsByUsername).toHaveBeenCalledTimes(1);
            expect(mockStatus).toHaveBeenCalledWith(200);
            expect(mockJson).toHaveBeenCalledWith(new Userstats(testUserStats))
        })

        it('should return an error if the username is not there', async () => {
            jest.spyOn(Userstats, 'getUserStatsByUsername').mockRejectedValue(new Error('no!'))

            await userStatsController.show(mockReq, mockRes)

            expect(Userstats.getUserStatsByUsername).toHaveBeenCalledTimes(1)
            expect(mockStatus).toHaveBeenCalledWith(404)
            expect(mockJson).toHaveBeenCalledWith({error: 'no!'})
        })
    })

    describe('create route', () => {
        it('should return a new userstats page with a 201 status code', async () => {
            let testUserStats = {
                userstatsid: 1, 
                username: 'max', 
                overallpercentage: 0,
                geographycorrect: 0,
                historycorrect: 0,
                spanishcorrect: 0,
                musiccorrect: 0,
                totalquizzes: 0,
                totaltime: 0
            }

            const mockReq = {body: {username: 'max', userid: 1}}

            jest.spyOn(Userstats, 'createNewUserStats').mockResolvedValue(new Userstats(testUserStats))

            await userStatsController.create(mockReq, mockRes)

            expect(Userstats.createNewUserStats).toHaveBeenCalledTimes(1)
            expect(mockStatus).toHaveBeenCalledWith(201)
            expect(mockJson).toHaveBeenCalledWith(new Userstats(testUserStats))
        })

        it('should return an error if creation fails', async () => {
            let testUserStats = {
                userstatsid: 1, 
                username: 'max', 
                overallpercentage: 0,
                geographycorrect: 0,
                historycorrect: 0,
                spanishcorrect: 0,
                musiccorrect: 0,
                totalquizzes: 0,
                totaltime: 0
            }

            const mockReq = {body: {username: 'max', userid: 1}}

            jest.spyOn(Userstats, 'createNewUserStats').mockRejectedValue(new Error('no!'))

            await userStatsController.create(mockReq, mockRes)

            expect(Userstats.createNewUserStats).toHaveBeenCalledTimes(1)
            expect(mockStatus).toHaveBeenCalledWith(400)
            expect(mockJson).toHaveBeenCalledWith({error: 'no!'})
        })
    })

    describe('update route', () => {
        it('should update the userstats and return with a 200 status code', async () => {
            let testUserStats = {
                userstatsid: 1, 
                username: 'max', 
                overallpercentage: 0,
                geographycorrect: 0,
                historycorrect: 0,
                spanishcorrect: 0,
                musiccorrect: 0,
                totalquizzes: 0,
                totaltime: 0
            }

            let updatedUserStats = {
                spanishcorrect: 7,
                totalquizzes: 1
            }

            let mockReq = {params: {username: 'max'}, body: {spanishcorrect: 7, totalquizzes: 1}}

            jest.spyOn(Userstats, 'getUserStatsByUsername').mockResolvedValue(new Userstats(testUserStats))
            jest.spyOn(Userstats.prototype, 'updateUserStats').mockResolvedValue(updatedUserStats)

            await userStatsController.update(mockReq, mockRes)

            expect(Userstats.getUserStatsByUsername).toHaveBeenCalledWith('max')
            expect(Userstats.prototype.updateUserStats).toHaveBeenCalledWith({spanishcorrect: 7, totalquizzes: 1})
            expect(mockStatus).toHaveBeenCalledWith(200)
        })
    })
})