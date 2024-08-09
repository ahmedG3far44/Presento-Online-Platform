export default async function verifyAccessUser(req, res, next) {
  try {
  } catch (error) {
    return res.status(500).json({
      state: "connection error",
      message: error.message,
    });
  }
}
