const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createChatSession = async (req, res) => {
  const { user } = req.body;

  try {
    const newSession = await prisma.chatSession.create({
      data: {
        user,
        messages: [],
      },
    });

    res.json(newSession);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error creating chat session");
  }
};

const updateChatSession = async (req, res) => {
  const { sessionId, message } = req.body;

  try {
    const updatedSession = await prisma.chatSession.update({
      where: { id: sessionId },
      data: {
        messages: {
          push: message,
        },
      },
    });

    res.json(updatedSession);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error updating chat session");
  }
};

const getChatSessions = async (req, res) => {
  const { userId } = req.query;

  try {
    const sessions = await prisma.chatSession.findMany({
      where: {
        userId: parseInt(userId),
      },
      include: {
        messages: true,
      },
    });
    res.json(sessions);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error retrieving chat sessions");
  }
};

module.exports = {
  createChatSession,
  updateChatSession,
  getChatSessions,
};
