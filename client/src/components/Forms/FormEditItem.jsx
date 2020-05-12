import React, { Component } from 'react';
import LocationAutoComplete from '../LocationAutoComplete';
// import ErrorMessageHandler from './ErrorMessageHandler';
import '../../styles/form.css';
import apiHandler from '../../api/apiHandler';

class FormEditItem extends Component {
	state = { item: { location: {} }, tempUrl: '' };

	componentDidMount() {
		apiHandler
			.getItemById(this.props.item)
			.then((APIResult) => {
				this.setState({ item: APIResult });
			})
			.catch((APIError) => console.log(APIError));
	}

	handleChange = (e) => {
		let value = e.target.value;
		let test = false;
		if (e.target.type === 'file') {
			value = e.target.files[0];
			test = true;
		}
		let data = { item: { ...this.state.item, [e.target.name]: value } };
		if (test) {
			data.tempUrl = URL.createObjectURL(e.target.files[0]);
		}
		this.setState(data);
	};

	handlePlace = (place) => {
		// console.log(place);
		const location = {
			type: 'Point',
			coordinates: place.center,
			formattedAddress: place.place_name,
		};
		let oldState = { ...this.state };
		oldState.item.location = location;
		this.setState({ oldState });
	};

	handleSubmit = (e) => {
		e.preventDefault();
		console.log(this.state);
		// treatment of the edit form
		const data = new FormData();
		data.append('name', this.state.item.name);
		data.append('category', this.state.item.category);
		data.append('quantity', this.state.item.quantity);
		data.append('location', JSON.stringify(this.state.item.location));
		data.append('description', this.state.item.description);
		data.append('image', this.state.item.image);
		data.append('contact', this.state.item.contact);
		apiHandler
			.editItem(this.props.item, data)
			.then((APIResult) => {
				this.props.clbk();
			})
			.catch((APIError) => console.log(APIError));
	};

	render() {
		console.log(this.state);
		return (
			<div className="overlay">
				<form className="form" onChange={(e) => this.handleChange(e)} onSubmit={this.handleSubmit}>
					<div className="close-me" onClick={this.props.clbk}>
						X
					</div>
					<div className="form-group">
						<div className="round-image">
							<label htmlFor="picture">
								<img src={this.state.tempUrl === '' ? this.state.item.image : this.state.tempUrl} alt="" />
							</label>
							<input type="file" id="picture" name="image" />
						</div>
						<label className="label" htmlFor="name">
							Name
						</label>
						<input
							id="name"
							className="input"
							type="text"
							name="name"
							defaultValue={this.state.item.name}
							placeholder="What are you giving away ?"
						/>
					</div>

					<div className="form-group">
						<label className="label" htmlFor="category">
							Category
						</label>

						<select id="category" name="category" defaultValue={this.state.item.category}>
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
						<input
							className="input"
							name="quantity"
							id="quantity"
							type="number"
							defaultValue={this.state.item.quantity}
						/>
					</div>

					<div className="form-group">
						<label className="label" htmlFor="location">
							Address
						</label>
						<LocationAutoComplete onSelect={this.handlePlace} default={this.state.item.location.formattedAddress} />
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
							defaultValue={this.state.item.description}
						></textarea>
					</div>

					<div className="form-group">
						How do you want to be reached?
						<div>
							<input
								type="radio"
								id="contactMail"
								name="contact"
								value="email"
								checked={this.state.item.contact === 'email'}
							/>{' '}
							<label className="label radio" htmlFor="contactMail">
								user email
							</label>
						</div>
						<div>
							<input
								type="radio"
								id="contactPhone"
								name="contact"
								value="phone"
								checked={this.state.item.contact === 'phone'}
							/>{' '}
							<label className="label radio" htmlFor="contactPhone">
								contact phone number
							</label>
						</div>
					</div>
					<button className="btn-submit">Edit Item</button>
				</form>
			</div>
		);
	}
}

export default FormEditItem;
