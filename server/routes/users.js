const express = require('express');
const router = express.Router();
const User = require('../models/User');
const upload = require('../config/cloudinaryConfig');

router.get('/:id', (req, res, next) => {
	User.findById(req.params.id)
		.then((dbResult) => res.status(200).json(dbResult))
		.catch((dbError) => res.status(500).json(dbError));
});

router.get('/', (req, res, next) => {
	const user = req.query.user ? {
			_id: req.query.user,
		} :
		null;
	User.find(user)
		.then((dbResult) => res.status(200).json(dbResult))
		.catch((dbError) => res.status(500).json(dbError));
});

/**
 * EDIT USER
 */
router.patch('/:id', upload.single('profileImg'), (req, res, next) => {
	console.log(req.body)
	let data = {
		firstName: req.body.firstName || '',
		lastName: req.body.lastName || '',
		city: req.body.city || '',
		phoneNumber: req.body.phoneNumber || '',
	};

	if (req.file) {
		data.profileImg = req.file.secure_url;
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