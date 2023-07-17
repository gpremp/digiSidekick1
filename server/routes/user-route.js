const router = require("express").Router();
const { User} = require("../models/user");
const bcrypt = require("bcrypt");

router.post("/api/auth", async (req, res) => {
	try {
		const user = await User.findOne({ email: req.body.email });
		if (!user)
			return res.send({ message: "Invalid Email or Password" });

		const validPassword = await bcrypt.compare(
			req.body.password,
			user.password
		);
		if (!validPassword)
			return res.send({ message: "Invalid Email or Password" });

		const token = user.generateAuthToken();
		res.send({ data: token, message: "logged in successfully" });
	} catch (error) {
		res.send({ message: "Internal Server Error" });
	}
});

router.post("/api/user", async (req, res) => {
	try {
		const user = await User.findOne({ email: req.body.email });
		if (user)
			return res
				.send({ message: "User with given email already Exist!" });

		const salt = await bcrypt.genSalt(Number(10));
		const hashPassword = await bcrypt.hash(req.body.password, salt);
		await new User({ ...req.body, password: hashPassword }).save();
		res.status(201).send({ message: "User created successfully" });
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
});

module.exports = router;
