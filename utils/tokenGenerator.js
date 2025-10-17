import jwt from "jsonwebtoken";
import dotenv from 'dotenv';

dotenv.config();
export const generateTokens = (user, res) => {
    const accessToken = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
    );
    res.cookie("accessToken", accessToken, { httpOnly: true });

    //   const refreshToken = jwt.sign(
    //     { id: user._id },
    //     process.env.JWT_REFRESH_SECRET,
    //     { expiresIn: "7d" }
    //   );

    return { accessToken };
};
