const { prisma } = require("../config/dbConfig");

exports.getMembers = async (req, res) => {
  try {
    const members = await prisma.member.findMany();
    res.json(members);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createMember = async (req, res) => {
  const { mem_name, mem_phone, mem_email } = req.body;
  try {
    const member = await prisma.member.create({
      data: { mem_name, mem_phone, mem_email },
    });
    res.status(201).json(member);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getMemberById = async (req, res) => {
  const { id } = req.params;
  try {
    const member = await prisma.member.findUnique({
      where: { mem_id: parseInt(id) },
    });
    if (!member) return res.status(404).json({ error: "Member not found" });
    res.json(member);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateMember = async (req, res) => {
  const { id } = req.params;
  const { mem_name, mem_phone, mem_email } = req.body;
  try {
    const updatedMember = await prisma.member.update({
      where: { mem_id: parseInt(id) },
      data: { mem_name, mem_phone, mem_email },
    });
    res.json(updatedMember);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
