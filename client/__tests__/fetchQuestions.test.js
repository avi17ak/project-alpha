const { renderDOM } = require('./helpers');
const { fetchQuestionData } = require("../js/fetchQuestions");

let dom;
let document;

describe("fetchQuestionData", () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  it("returns questions when API responds correctly", async () => {
    const mockData = [{ question: "Q1", answer: "A1" }];
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    });

    const result = await fetchQuestionData("history");

    expect(result).toEqual(mockData);
    expect(fetch).toHaveBeenCalledWith(
      "http://localhost:3000/questions/subject/history",
      expect.any(Object)
    );
  });

  it("throws error on bad response", async () => {
    fetch.mockResolvedValueOnce({ ok: false, status: 500 });

    await expect(fetchQuestionData("history")).rejects.toThrow(
      "API request failed (500)"
    );
  });
});
