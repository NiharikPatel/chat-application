const router = require("express").Router();
const { User } = require("../models/user");

router.get("/", async (req, res) => {
  try {
    const users = await User.find({}, { _id: 1, firstName: 1, lastName: 1, email:1 });
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
