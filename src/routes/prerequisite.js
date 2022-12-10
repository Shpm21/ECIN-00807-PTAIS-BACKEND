const { Router } = require("express");
const router = Router();
const PrerequisiteController = require("../controllers/prerequisite");
const { validateTokenAuthentication } = require("../middlewares/middlewares");
router.get(
  "/prerequisites",
  validateTokenAuthentication,
  PrerequisiteController.getPrerequisites
);
router.get(
  "/prerequisites/:codPlain",
  validateTokenAuthentication,
  PrerequisiteController.getPrerequisiteByCodPlain
);

router.get(
  "/prerequisites/info/:codCourse",
  validateTokenAuthentication,
  PrerequisiteController.getPrerequisiteByCodCourse
);
module.exports = router;
