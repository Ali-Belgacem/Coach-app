
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from "validator";

const creatToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Comparaison insensible à la casse pour l'email
    const expectedEmail = process.env.ADMIN_EMAIL.toLowerCase();
    const expectedPassword = process.env.ADMIN_PASSWORD;

    if (email.toLowerCase() === expectedEmail && password === expectedPassword) {
      // Signer un vrai payload (objet) avec l'email
      const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1d' });

      return res.json({ success: true, token });
    } else {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export {adminLogin}