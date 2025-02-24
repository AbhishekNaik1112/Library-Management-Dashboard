exports.authenticate = (req, res, next) => {
  const encodedApiKey = req.headers["x-api-key"];
  if (!encodedApiKey) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const decodedApiKey = Buffer.from(encodedApiKey, "base64").toString("utf-8");
    if (decodedApiKey !== process.env.API_KEY) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    next();
  } catch (error) {
    return res.status(400).json({ error: "Invalid API Key Format" });
  }
};
