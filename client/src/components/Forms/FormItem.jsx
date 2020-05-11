import React, { Component } from 'react';
import LocationAutoComplete from '../LocationAutoComplete';
import '../../styles/form.css';

class ItemForm extends Component {
	state = { quantity: 1 };

	handleChange = (event) => {
		if (event.target.name === 'location') return;
		const value = event.target.type === 'file' ? event.target.files[0] : event.target.value;
		this.setState({ [event.target.name]: value });
	};

	handleSubmit = (event) => {
		event.preventDefault();

		let errors = { is: false, messages: [] };
		if (!this.state.name || this.state.name === '') {
			errors.is = true;
			errors.messages.push('Please enter your name');
		}

		if (!this.state.category) {
			errors.is = true;
			errors.messages.push('Please select a category...');
		}

		if (!this.state.quantity || this.state.quantity < 1) {
			errors.is = true;
			errors.messages.push('Please put at least one item, no ?');
		}

		if (!this.state.location || typeof this.state.location !== 'object') {
			errors.is = true;
			errors.messages.push('Please confirm the address by clicking on the completion');
		}

		if (!this.state.description || this.state.description === '') {
			errors.is = true;
			errors.messages.push('Please put a little description !');
		}

		if (errors.is) {
			this.setState({ errors: errors.messages });
		} else {
			console.log('No Error ! Proceed');
		}
		// In order to send back the data to the client, since there is an input type file you have to send the
		// data as formdata.
		// The object that you'll be sending will maybe be a nested object, in order to handle nested objects in our form data
		// Check out the stackoverflow solution below : )

		// Nested object into formData by user Raj Pawam Gumdal @stackoverflow : ) => https://stackoverflow.com/a/42241875/13374041
	};

	handlePlace = (place) => {
		// This handle is passed as a callback to the autocomplete component.
		// Take a look at the data and see what you can get from it.
		// Look at the item model to know what you should retrieve and set as state.
		console.log(place);
		const location = {
			type: 'Point',
			coordinates: place.center,
			formattedAddress: place.place_name,
		};
		this.setState({ location: location });
	};

	render() {
		console.log(this.state);
		return (
			<div className="ItemForm-container">
				<form className="form" onChange={this.handleChange} onSubmit={this.handleSubmit}>
					<h2 className="title">Add Item</h2>

					<div>{this.state.errors && this.state.errors.map((message, index) => <p key={index}>{message}</p>)}</div>

					<div className="form-group">
						<label className="label" htmlFor="name">
							Name
						</label>
						<input id="name" className="input" type="text" name="name" placeholder="What are you giving away ?" />
					</div>

					<div className="form-group">
						<label className="label" htmlFor="category">
							Category
						</label>

						<select id="category" name="category" defaultValue="-1">
							<option value="-1" disabled>
								Select a category
							</option>
							<option value="Plant">Plant</option>
							<option value="Kombucha">Kombucha</option>
							<option value="Vinegar">Vinegar</option>
							<option value="Kefir">Kefir</option>
						</select>
					</div>

					<div className="form-group">
						<label className="label" htmlFor="quantity">
							Quantity
						</label>
						<input className="input" name="quantity" id="quantity" type="number" defaultValue={this.state.quantity} />
					</div>

					<div className="form-group">
						<label className="label" htmlFor="location">
							Address
						</label>
						<LocationAutoComplete onSelect={this.handlePlace} />
					</div>

					<div className="form-group">
						<label className="label" htmlFor="description">
							Description
						</label>
						<textarea
							id="description"
							name="description"
							className="text-area"
							placeholder="Tell us something about this item"
						></textarea>
					</div>

					<div className="form-group">
						<label className="custom-upload label" htmlFor="image">
							Upload image
						</label>
						<input className="input" name="image" id="image" type="file" />
					</div>

					<h2>Contact information</h2>

					<div className="form-group">
						<label className="label" htmlFor="contact">
							How do you want to be reached?
						</label>
						<div>
							<input type="radio" />
							user email
						</div>
						<input type="radio" />
						contact phone number
					</div>

					<p className="message">
						<img src="/media/info.svg" alt="info" />
						Want to be contacted by phone? Add your phone number in your personal page.
					</p>

					<button className="btn-submit">Add Item</button>
				</form>
			</div>
		);
	}
}

export default ItemForm;
