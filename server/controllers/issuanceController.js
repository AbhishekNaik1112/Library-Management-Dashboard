const { prisma } = require("../config/dbConfig");

exports.getIssuances = async (req, res) => {
  try {
    const issuances = await prisma.issuance.findMany({
      include: { book: true, member: true },
    });
    res.json(issuances);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createIssuance = async (req, res) => {
  const {
    book_id,
    issuance_date,
    issuance_member,
    issued_by,
    target_return_date,
    issuance_status,
  } = req.body;
  try {
    const issuance = await prisma.issuance.create({
      data: {
        book_id: parseInt(book_id),
        issuance_date: new Date(issuance_date),
        issuance_member: parseInt(issuance_member),
        issued_by,
        target_return_date: new Date(target_return_date),
        issuance_status,
      },
    });
    res.status(201).json(issuance);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getIssuanceById = async (req, res) => {
  const { id } = req.params;
  try {
    const issuance = await prisma.issuance.findUnique({
      where: { issuance_id: parseInt(id) },
      include: { book: true, member: true },
    });
    if (!issuance) return res.status(404).json({ error: "Issuance not found" });
    res.json(issuance);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateIssuance = async (req, res) => {
  const { id } = req.params;
  const {
    book_id,
    issuance_date,
    issuance_member,
    issued_by,
    target_return_date,
    issuance_status,
  } = req.body;
  try {
    const updatedIssuance = await prisma.issuance.update({
      where: { issuance_id: parseInt(id) },
      data: {
        book_id: parseInt(book_id),
        issuance_date: new Date(issuance_date),
        issuance_member: parseInt(issuance_member),
        issued_by,
        target_return_date: new Date(target_return_date),
        issuance_status,
      },
    });
    res.json(updatedIssuance);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getOutstandingIssuances = async (req, res) => {
  const { date } = req.query;
  if (!date) {
    return res
      .status(400)
      .json({ error: "Missing date parameter (YYYY-MM-DD)" });
  }
  const targetDate = new Date(date);
  const nextDate = new Date(targetDate);
  nextDate.setDate(targetDate.getDate() + 1);

  try {
    const issuances = await prisma.issuance.findMany({
      where: {
        issuance_status: "pending",
        target_return_date: {
          gte: targetDate,
          lt: nextDate,
        },
      },
      include: { book: true, member: true },
    });
    res.json(issuances);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
