const { Router } = require("express");
const questionController = require("../controllers/questionsController");
const authenticator = require("../middleware/authenticator");

const questionRouter = Router();

questionRouter.get("/:id", questionController.show);
questionRouter.get(
  "/subject/:subjectCat",
  questionController.getBySubjectCat
);
questionRouter.get(
  "/difficulty/:difficulty",
  questionController.getByDifficulty
);

module.exports = questionRouter;
