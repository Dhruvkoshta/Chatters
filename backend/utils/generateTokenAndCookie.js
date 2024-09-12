import jwt from "jsonwebtoken";
export const generateTokenAndCookie = (res, userId) => {
	const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
		expiresIn: "7d",
	});
	res.cookie("token", token, {
		httpOnly: true,
		secure: `${process.env.NODE_ENV}` === "production",
		sameSite: "strict",
		maxAge: 1000 * 60 * 60 * 24 * 7,
	});
	return { token };
};
