const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
	const authorization = req.headers.authorization;

	if (authorization && authorization.startsWith('Bearer ')) {
		try {
			const token = authorization.split(' ')[1];
			const verified = jwt.verify(token, process.env.TOKEN_SECRET);
			if (!verified) {
				res.status(401).json({
					message: "Invalid Token"
				});
			}
			next();
		} catch (err) {
			console.log(err.message);
			res.status(500).json({
				message: err.message
			});
		}
	} else {
		res.status(401).json({
			message: "Missing token"
		});
	}
};