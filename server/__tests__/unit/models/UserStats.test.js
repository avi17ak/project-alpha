const { db } = require("../../../db/connect");
const Userstats = require("../../../models/UserStats");

describe("Userstats", () => {
  describe("getUserStatsByUsername", () => {
    it("should return userstats when found", async () => {
      //Arr
      const mockStats = {
        userstatsid: 1,
        username: "u1",
        overallpercentage: 50,
        geographycorrect: 5,
        musiccorrect: 3,
        historycorrect: 2,
        spanishcorrect: 4,
        totalquizzes: 10,
        totaltime: 120,
      };

      jest.spyOn(db, "query").mockResolvedValueOnce({ rows: [mockStats] });

      //Act
      const result = await Userstats.getUserStatsByUsername("u1");

      //Ass
      expect(result).toBeInstanceOf(Userstats);
      expect(result.username).toBe("u1");
      expect(result.overallpercentage).toBe(50);
    });

    it("should throw an Error when no stats found", async () => {
      //Arr
      jest.spyOn(db, "query").mockResolvedValueOnce({ rows: [] });

      //Act & Ass
      await expect(
        Userstats.getUserStatsByUsername("missing")
      ).rejects.toThrow("Unable to retrieve userstats.");
    });
  });

  describe("createNewUserStats", () => {
    it("should create new userstats if none exist", async () => {
      //Arr
      const data = { username: "u2", userid: 2 };

      jest
        .spyOn(db, "query")
        // First call → check existing userstats
        .mockResolvedValueOnce({ rows: [] })
        // Second call → insert new stats
        .mockResolvedValueOnce({
          rows: [
            {
              userstatsid: 2,
              username: "u2",
              overallpercentage: 0,
              geographycorrect: 0,
              musiccorrect: 0,
              historycorrect: 0,
              spanishcorrect: 0,
              totalquizzes: 0,
              totaltime: 0,
            },
          ],
        });

      //Act
      const result = await Userstats.createNewUserStats(data);

      //Ass
      expect(result).toBeInstanceOf(Userstats);
      expect(result.username).toBe("u2");
      expect(result.totalquizzes).toBe(0);
    });

    it("should throw an Error if userstats already exists", async () => {
      //Arr
      const data = { username: "u3", userid: 3 };

      jest.spyOn(db, "query").mockResolvedValueOnce({
        rows: [{ username: "u3" }], // simulates existing stats
      });

      //Act & Ass
      await expect(Userstats.createNewUserStats(data)).rejects.toThrow(
        "Userstats already exists"
      );
    });
  });

  describe("updateUserStats", () => {
    it("should return updated stats on successful update", async () => {
      //Arr
      const testStats = new Userstats({
        userstatsid: 4,
        username: "u4",
        overallpercentage: 40,
        geographycorrect: 2,
        musiccorrect: 2,
        historycorrect: 2,
        spanishcorrect: 2,
        totalquizzes: 5,
        totaltime: 60,
      });

      const updatedStats = {
        userstatsid: 4,
        username: "u4",
        overallpercentage: 45,
        geographycorrect: 3,
        musiccorrect: 3,
        historycorrect: 2,
        spanishcorrect: 3,
        totalquizzes: 6,
        totaltime: 70,
      };

      jest.spyOn(db, "query").mockResolvedValueOnce({ rows: [updatedStats] });

      //Act
      const result = await testStats.updateUserStats({
        username: "u4",
        overallpercentage: 45,
        geographycorrect: 1,
        musiccorrect: 1,
        spanishcorrect: 1,
        totalquizzes: 1,
        totaltime: 10,
      });

      //Ass
      expect(result).toBeInstanceOf(Userstats);
      expect(result.overallpercentage).toBe(45);
      expect(result.totalquizzes).toBe(6);
    });

    it("should throw an Error when update fails", async () => {
      //Arr
      const testStats = new Userstats({
        userstatsid: 5,
        username: "u5",
        overallpercentage: 20,
        geographycorrect: 1,
        musiccorrect: 1,
        historycorrect: 1,
        spanishcorrect: 1,
        totalquizzes: 2,
        totaltime: 30,
      });

      jest.spyOn(db, "query").mockResolvedValueOnce({ rows: [] });

      //Act & Ass
      await expect(
        testStats.updateUserStats({
          username: "u5",
          geographycorrect: 1,
        })
      ).rejects.toThrow("Unable to update the userstats");
    });
  });
});
