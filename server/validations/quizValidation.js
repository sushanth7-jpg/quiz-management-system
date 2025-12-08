function validateQuizPayload(payload) {
  if (!payload) return { valid: false, message: "Payload required" };
  if (!payload.title || typeof payload.title !== "string")
    return { valid: false, message: "Title is required" };
  if (!Array.isArray(payload.questions))
    return { valid: false, message: "Questions must be an array" };

  for (let i = 0; i < payload.questions.length; i++) {
    const q = payload.questions[i];
    if (!q.type || !["mcq", "tf", "text"].includes(q.type))
      return { valid: false, message: `Question ${i + 1}: invalid type` };
    if (!q.text || typeof q.text !== "string")
      return { valid: false, message: `Question ${i + 1}: text required` };
    if (q.type === "mcq") {
      if (!Array.isArray(q.options) || q.options.length < 2)
        return {
          valid: false,
          message: `Question ${i + 1}: mcq needs at least 2 options`,
        };
      if (typeof q.correctIndex !== "number")
        return {
          valid: false,
          message: `Question ${i + 1}: correctIndex required for mcq`,
        };
    }
    if (q.type === "tf") {
      if (typeof q.correctBoolean !== "boolean")
        return {
          valid: false,
          message: `Question ${i + 1}: correctBoolean required for tf`,
        };
    }
    if (q.type === "text") {
      if (typeof q.correctText !== "string")
        return {
          valid: false,
          message: `Question ${i + 1}: correctText required for text`,
        };
    }
  }

  return { valid: true };
}

module.exports = { validateQuizPayload };
