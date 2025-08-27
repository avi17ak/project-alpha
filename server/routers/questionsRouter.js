const { Router } = require("express");
const questionController = require("../controllers/questionsController");
const authenticator = require("../middleware/authenticator");

const questionRouter = Router();

questionRouter.get("/:id", authenticator, questionController.show);
questionRouter.get(
  "/subject/:subjectCat",
  authenticator,
  questionController.getBySubjectCat
);
questionRouter.get(
  "/difficulty/:difficulty",
  authenticator,
  questionController.getByDifficulty
);

module.exports = questionRouter;
