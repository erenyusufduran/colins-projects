import User from "../models/User.js";

export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).send(user);
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
};
