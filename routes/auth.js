const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const prisma = new PrismaClient();
const jwtSecret = process.env.JWT_SECRET_KEY;

router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const user = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
      },
    });
    res.json(user);
  } catch (error) {
    if (error.code === "P2002" && error.meta.target.includes("username")) {
      res.status(400).json({ error: "Username already exists" });
    } else {
      res.status(500).json({ error: "User creation failed" });
    }
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await prisma.user.findUnique({
      where: { username },
    });
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign({ id: user.id }, jwtSecret, {
        expiresIn: "1h",
      });
      const { id, username } = user;
      res.json({ token, user: { id, username } });
    } else {
      res.status(401).json({ error: "Invalid credentials" });
    }
  } catch (error) {
    res.status(500).json({ error: "Login failed" });
  }
});

module.exports = router;
