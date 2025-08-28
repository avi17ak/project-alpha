const db = require("../../../db/connect");
const User = require("../../../models/User");
const bcrypt = require("bcrypt");

describe("User", () => {
  beforeEach(() => jest.clearAllMocks());
  afterAll(() => jest.resetAllMocks());

  describe("getOneById", () => {
    it("resolves with user on successful db query", async () => {
      const testUser = {
        userid: 1,
        name: "u1",
        email: "u1@test.com",
        password: "pw",
        username: "un1",
      };

      jest.spyOn(db, "query").mockResolvedValueOnce({ rows: [testUser] });

      const result = await User.getOneById(1);

      expect(result).toBeInstanceOf(User);
      expect(result.userid).toBe(1);
      expect(result.name).toBe("u1");
      expect(result.username).toBe("un1");
      expect(db.query).toHaveBeenCalledWith(
        "SELECT * FROM users WHERE userid = $1;",
        [1]
      );
    });

    it("should throw an Error if user not found", async () => {
      jest.spyOn(db, "query").mockResolvedValueOnce({ rows: [] });
      await expect(User.getOneById(999)).rejects.toThrow("User not found");
    });
  });

  describe("getOneByUsername", () => {
    it("resolves with user on successful db query", async () => {
      const testUser = {
        userid: 1,
        name: "u1",
        email: "u1@test.com",
        password: "pw",
        username: "un1",
      };

      jest.spyOn(db, "query").mockResolvedValueOnce({ rows: [testUser] });

      const result = await User.getOneByUsername("un1");

      expect(result).toBeInstanceOf(User);
      expect(result.username).toBe("un1");
      expect(db.query).toHaveBeenCalledWith(
        "SELECT * FROM users WHERE username = $1;",
        ["un1"]
      );
    });

    it("should throw an Error if username not found", async () => {
      jest.spyOn(db, "query").mockResolvedValueOnce({ rows: [] });
      await expect(User.getOneByUsername("missing")).rejects.toThrow(
        "Username not found"
      );
    });
  });

  describe("createUser", () => {
    it("resolves with user on successful creation", async () => {
      const mockUserData = {
        name: "u10",
        email: "u10@test.com",
        password: "pw",
        username: "un10",
      };

      // Mock INSERT query
      jest.spyOn(db, "query").mockResolvedValueOnce({ rows: [{ userid: 1 }] });

      // Mock getOneById called inside createUser
      jest.spyOn(User, "getOneById").mockResolvedValueOnce(
        new User({ userid: 1, ...mockUserData })
      );

      const result = await User.createUser(mockUserData);

      expect(result).toBeInstanceOf(User);
      expect(result.userid).toBe(1);
      expect(result.name).toBe("u10");
      expect(result.username).toBe("un10");
      expect(result.email).toBe("u10@test.com");
    });

    it("should throw an Error when there are missing field(s)", async () => {
      const invalidData = { email: "u10@test.com" };
      await expect(User.createUser(invalidData)).rejects.toThrow(
        "Please fill in all fields"
      );
    });

    it("should throw an error if user already exists", async () => {
      const existingUser = {
        name: "avkaran",
        email: "avi@gmail.com",
        password: "lafosse",
        username: "avi17ak",
      };

      jest.spyOn(db, "query").mockRejectedValueOnce({ code: "23505" });

      await expect(User.createUser(existingUser)).rejects.toThrow(
        "Email or username already exists"
      );
    });
  });

  describe("updateUser", () => {
    it("should return the updated user on successful update", async () => {
      const testUser = new User({
        userid: 1,
        name: "u1",
        email: "u1@test.com",
        password: "pw",
        username: "un1",
      });

      const updatedUserData = {
        name: "u1",
        email: "u1@test.com",
        password: "pw_new",
        username: "un1_new",
      };

      // Mock bcrypt
      jest.spyOn(bcrypt, "genSalt").mockResolvedValue("salt");
      jest.spyOn(bcrypt, "hash").mockResolvedValue("hashed_pw");

      // Mock DB query
      jest.spyOn(db, "query").mockResolvedValueOnce({
        rows: [{ userid: 1, ...updatedUserData }],
      });

      const result = await testUser.updateUser(updatedUserData);

      expect(result).toBeInstanceOf(User);
      expect(result.userid).toBe(1);
      expect(result.username).toBe("un1_new");
      expect(result.password).toBe("pw_new"); // Your constructor sets password directly

      expect(db.query).toHaveBeenCalledWith(
        `UPDATE users SET
        name = COALESCE($1, name),
        email = COALESCE($2, email),
        password = COALESCE($3, password),
        username = COALESCE($4, username)
        WHERE userid = $5
        RETURNING *;`,
        [
          updatedUserData.name,
          updatedUserData.email,
          "hashed_pw",
          updatedUserData.username,
          testUser.userid,
        ]
      );
    });

    it("should throw an Error when no rows are returned", async () => {
      const testUser = new User({
        userid: 2,
        name: "u2",
        email: "u2@test.com",
        password: "pw",
        username: "un2",
      });

      jest.spyOn(bcrypt, "genSalt").mockResolvedValue("salt");
      jest.spyOn(bcrypt, "hash").mockResolvedValue("hashed_pw");
      jest.spyOn(db, "query").mockResolvedValueOnce({ rows: [] });

      await expect(
        testUser.updateUser({
          name: "u2_new",
          email: "u2_new@test.com",
          password: "pw_new",
          username: "un2_new",
        })
      ).rejects.toThrow("Unable to update the user details");
    });

    it("should throw an Error if email or username already exists", async () => {
      const testUser = new User({
        userid: 3,
        name: "u3",
        email: "u3@test.com",
        password: "pw",
        username: "un3",
      });

      jest.spyOn(bcrypt, "genSalt").mockResolvedValue("salt");
      jest.spyOn(bcrypt, "hash").mockResolvedValue("hashed_pw");
      jest.spyOn(db, "query").mockRejectedValueOnce({ code: "23505" });

      await expect(
        testUser.updateUser({
          name: "u3_new",
          email: "conflict@test.com",
          password: "pw_new",
          username: "un3_new",
        })
      ).rejects.toThrow("Email or username already exists");
    });
  });
});
