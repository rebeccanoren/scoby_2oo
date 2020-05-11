const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/', (req, res, next) => {
	const user = req.query.user ? { _id: req.query.user } : null;
	Item.find(user)
		.then((dbResult) => res.status(200).json(dbResult))
		.catch((dbError) => res.status(500).json(dbError));
});

/**
 * EDIT ITEM
 */
router.patch('/:id', (req, res, next) => {
	let data = req.body;
	if (req.file) {
		data.image = req.file.secure_url;
	}
	User.findByIdAndUpdate(req.params.id, data, {
		new: true,
	})
		.then((dbResult) => {
			if (dbResult === null) {
				res.status(404).json({
					message: 'User not found',
				});
			} else {
				res.status(200).json(dbResult);
			}
		})
		.catch((dbError) => res.status(500).json(dbError));
});

module.exports = router;
