const questionsController = require('../../../controllers/questionsController')
const Questions = require('../../../models/Questions')

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

    describe('show route', () => {
        let testQuestions, mockReq;

        beforeEach(() => {
            testQuestions = {
                question: 'Hello?', 
                subjectcat: 'HIS', 
                questionid: 1,
                answer: "fdsa",
                difficulty: 1,
                optionone: 'fdsa',
                optiontwo: 'fdsa',
                optionthree: 'fdsa',
            }

            mockReq = {params: {id:1}}
        })

        it('should return a question with a 200 status code', async () => {
            jest.spyOn(Questions, 'getOneById').mockResolvedValue(new Questions(testQuestions))

            await questionsController.show(mockReq, mockRes)

            expect(Questions.getOneById).toHaveBeenCalledTimes(1);
            expect(mockStatus).toHaveBeenCalledWith(200);
            expect(mockJson).toHaveBeenCalledWith(new Questions(testQuestions))
        })

        it('should return an error if the questionid is not there', async () => {
            jest.spyOn(Questions, 'getOneById').mockRejectedValue(new Error('no!'))

            await questionsController.show(mockReq, mockRes)

            expect(Questions.getOneById).toHaveBeenCalledTimes(1)
            expect(mockStatus).toHaveBeenCalledWith(404)
            expect(mockJson).toHaveBeenCalledWith({error: 'no!'})
        })
    })

    describe('get by subject category', () => {
        let testQuestions, mockReq;

        beforeEach(() => {
            testQuestions = [
                {subjectCat:'HIS', question:'Hello?'},
                {subjectCat:'HIS', question:'goodbye?'}]

            mockReq = {params: {subjectCat: 'HIS'}}
        })

        it('should return an array of questions with a 200 status code', async () => {
            const questions = testQuestions.map(question => new Questions(question))
            jest.spyOn(Questions, 'getBySubjectCat').mockResolvedValue(questions)

            await questionsController.getBySubjectCat(mockReq, mockRes)

            expect(Questions.getBySubjectCat).toHaveBeenCalledTimes(1);
            expect(mockStatus).toHaveBeenCalledWith(200);
            expect(mockJson).toHaveBeenCalledWith(questions)
        })

        it('should return an error if there are no questions in that category', async () => {
            jest.spyOn(Questions, 'getBySubjectCat').mockRejectedValue(new Error('no!'))

            await questionsController.getBySubjectCat(mockReq, mockRes)

            expect(Questions.getBySubjectCat).toHaveBeenCalledTimes(1)
            expect(mockStatus).toHaveBeenCalledWith(404)
            expect(mockJson).toHaveBeenCalledWith({error: 'no!'})
        })
    })
})