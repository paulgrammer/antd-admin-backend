const express = require("express");
const authMiddleware = require("../../middlewares/auth");
const catchAsync = require("../../utils/catchAsync");
const browseRoute = require("./browse.route");
const searchRoute = require("./search.route");
const authRoute = require("./auth.route");
const statsRoute = require("./statistics.route");
const attachmentRoute = require("./attachment.route");
const meRoute = require("./me.route");
const router = express.Router();

router.use("/auth", authRoute);
router.use("/attachment", attachmentRoute);
router.use(catchAsync(authMiddleware.authenticate));
router.use("/me", meRoute);
router.use("/browse", browseRoute);
router.use("/search", searchRoute);
router.use("/statistics", statsRoute);

module.exports = router;
