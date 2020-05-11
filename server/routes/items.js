var express = require('express');
var router = express.Router();
const Item = require('../models/Item');
const upload = require('../config/cloudinaryConfig');

/**
 * GET ITEMS (ALL & BY USER)
 */
router.get('/', (req, res, next) => {
	const user = req.query.user ? { id_user: req.query.user } : null;
	Item.find(user)
		.then((dbResult) => res.status(200).json(dbResult))
		.catch((dbError) => res.status(500).json(dbError));
});

/* ADD ITEM */
router.post('/new', upload.single('image'), (req, res, next) => {
	let data = {
		id_user: req.session.currentUser._id,
		name: req.body.name,
		category: req.body.category,
		quantity: req.body.quantity,
		address: req.body.address,
		description: req.body.description,
		contact: req.body.contact,
		location: JSON.parse(req.body.location),
	};

	if (req.file) {
		let image = req.file.secure_url;
		data.image = image;
	}

	Item.create(data)
		.then((dbResult) => {
			res.status(201).json(dbResult);
		})
		.catch((error) => {
			res.status(500).json(error);
		});
});

/**
 * EDIT ITEM
 */
router.patch('/:id', upload.single('image'), (req, res, next) => {
	let data = req.body;
	if (req.body.location) data.location = JSON.parse(req.body.location);
	if (req.file) {
		data.image = req.file.secure_url;
	}
	Item.findByIdAndUpdate(data, req.params.id, { new: true })
		.then((dbResult) => {
			if (dbResult === null) {
				res.status(404).json({ message: 'Item not found' });
			} else {
				res.status(200).json(dbResult);
			}
		})
		.catch((dbError) => res.status(500).json(dbError));
});

/**
 * DELETEITEM
 */
router.delete('/:id', (req, res, next) => {
	Item.findByIdAndDelete(req.params.id)
		.then((dbResult) => res.status(200).json(dbResult))
		.catch((dbError) => res.status(500).json(dbError));
});

module.exports = router;
