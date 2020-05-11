var express = require("express");
var router = express.Router();
const Item = require('../models/Item');
const upload = require("../config/cloudinaryConfig");


/* ADD ITEM */
router.post("/new", upload.single("image"), (req, res, next) => {

  let data = {
    id_user: req.session.currentUser._id,
    name: req.body.name,
    category: req.body.category,
    quantity: req.body.quantity,
    address: req.body.address,
    description: req.body.description,
    contact: req.body.contact,
    location: JSON.parse(req.body.location)
  }

  if (req.file) {
    let image = req.file.secure_url;
    data.image = image
  }

  Item.create(
      data
    )
    .then((dbResult) => {
      res.status(201).json(dbResult);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

module.exports = router;