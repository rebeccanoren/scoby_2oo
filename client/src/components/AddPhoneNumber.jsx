import React from 'react';

const AddPhoneNumber = () => {
	return (
		<div className="user-contact">
			<h4>Add a phone number</h4>

			<form className="form">
				<div className="form-group">
					<label className="label" htmlFor="phoneNumber">
						Phone number
					</label>
					<input className="input" id="phoneNumber" type="text" name="phoneNumber" placeholder="Add phone number" />
				</div>
				<button className="form__button">Add phone number</button>
			</form>
		</div>
	);
};

export default AddPhoneNumber;
