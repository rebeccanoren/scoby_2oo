import React, { Component } from 'react';
// import LocationAutoComplete from '../LocationAutoComplete';
// import ErrorMessageHandler from './ErrorMessageHandler';
import '../../styles/form.css';
import apiHandler from '../../api/apiHandler';

class FormEditItem extends Component {
	state = { item: null };

	componentDidMount() {
		console.log(this.props);
		apiHandler
			.getItems(`_id=${this.props.item}`)
			.then((APIResult) => console.log(APIResult))
			.catch((APIError) => console.log(APIError));
	}

	render() {
		return (
			<form className="form overlay">
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
					<input className="input" name="quantity" id="quantity" type="number" />
				</div>

				<div className="form-group">
					<label className="label" htmlFor="location">
						Address
					</label>
					{/* <LocationAutoComplete onSelect={this.handlePlace} /> */}
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
			</form>
		);
	}
}

export default FormEditItem;
