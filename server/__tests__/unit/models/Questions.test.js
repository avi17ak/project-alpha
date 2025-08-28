const { db } = require("../../../db/connect");
const Questions = require("../../../models/Questions");

describe("Questions", () => {
  describe("getOneById", () => {
    it("should return a question when found", async () => {
      //Arr
      const mockQuestion = {
        questionid: 1,
        question: "What is 2+2?",
        answer: "4",
        optionone: "3",
        optiontwo: "4",
        optionthree: "5",
        optionfour: "6",
        subjectcat: "math",
        difficulty: "easy",
      };

      jest.spyOn(db, "query").mockResolvedValueOnce({ rows: [mockQuestion] });

      //Act
      const result = await Questions.getOneById(1);

      //Ass
      expect(result).toBeInstanceOf(Questions);
      expect(result.answer).toBe(result.optiontwo); // answer is one of the options
      expect([
        result.optionone,
        result.optiontwo,
        result.optionthree,
        result.optionfour,
      ]).toContain(result.answer);
    });

    it("should throw an Error when question not found", async () => {
      jest.spyOn(db, "query").mockResolvedValueOnce({ rows: [] });
      await expect(Questions.getOneById(99)).rejects.toThrow(
        "Unable to retrieve question."
      );
    });
  });

  describe("getBySubjectCat", () => {
    it("should return questions for a subject category", async () => {
      const mockQuestions = [
        {
          questionid: 2,
          question: "Capital of France?",
          answer: "Paris",
          optionone: "London",
          optiontwo: "Paris",
          optionthree: "Berlin",
          optionfour: "Madrid",
          subjectcat: "geography",
          difficulty: "easy",
        },
      ];

      jest.spyOn(db, "query").mockResolvedValueOnce({ rows: mockQuestions });

      const results = await Questions.getBySubjectCat("geography", 1);

      expect(results.length).toBe(1);
      expect(results[0]).toBeInstanceOf(Questions);
      expect([
        results[0].optionone,
        results[0].optiontwo,
        results[0].optionthree,
        results[0].optionfour,
      ]).toContain(results[0].answer);
    });

    it("should throw an Error if no questions found", async () => {
      jest.spyOn(db, "query").mockResolvedValueOnce({ rows: [] });
      await expect(Questions.getBySubjectCat("unknown", 5)).rejects.toThrow(
        "No questions found for this category."
      );
    });
  });

  describe("getRandomQuestions", () => {
    it("should return random questions", async () => {
      const mockQuestions = [
        {
          questionid: 3,
          question: "What is 10/2?",
          answer: "5",
          optionone: "2",
          optiontwo: "5",
          optionthree: "10",
          optionfour: "20",
          subjectcat: "math",
          difficulty: "medium",
        },
      ];

      jest.spyOn(db, "query").mockResolvedValueOnce({ rows: mockQuestions });

      const results = await Questions.getRandomQuestions(1);

      expect(results.length).toBe(1);
      expect(results[0]).toBeInstanceOf(Questions);
      expect([
        results[0].optionone,
        results[0].optiontwo,
        results[0].optionthree,
        results[0].optionfour,
      ]).toContain(results[0].answer);
    });

    it("should throw an Error if no questions available", async () => {
      jest.spyOn(db, "query").mockResolvedValueOnce({ rows: [] });
      await expect(Questions.getRandomQuestions(2)).rejects.toThrow(
        "No questions found for this category."
      );
    });
  });

  xdescribe("getByDifficulty", () => {
    it("should return questions for a difficulty level", async () => {
      const mockQuestions = [
        {
          questionid: 1,
          question: "What is 2+2?",
          answer: "4",
          optionone: "1",
          optiontwo: "2",
          optionthree: "3",
          subjectcat: "math",
          difficulty: "easy",
        },
        {
          questionid: 2,
          question: "What is 3+3?",
          answer: "6",
          optionone: "3",
          optiontwo: "5",
          optionthree: "9",
          subjectcat: "math",
          difficulty: "easy",
        },
      ];

      jest.spyOn(db, "query").mockResolvedValueOnce({ rows: mockQuestions });

      const result = await Questions.getByDifficulty("easy", 2);

      expect(result).toHaveLength(2);
      expect(result[0]).toBeInstanceOf(Questions);
      expect(result[0].difficulty).toBe("easy");
      expect(db.query).toHaveBeenCalledWith(
        `SELECT * FROM questions WHERE difficulty = $1 ORDER BY random() LIMIT $2;`,
        ["easy", 2]
      );
    });

    it("should throw an Error if no questions for given difficulty", async () => {
      jest.spyOn(db, "query").mockResolvedValueOnce({ rows: [] });

      await expect(Questions.getByDifficulty("hard", 5)).rejects.toThrow(
        "No questions found for this difficulty."
      );
    });
  });
});
