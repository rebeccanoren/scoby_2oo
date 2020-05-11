import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withUser } from '../components/Auth/withUser';
import UserItems from '../components/UserItems';
import FranckTips from '../components/FranckTips';
import AddPhoneNumber from '../components/AddPhoneNumber';
import FormEditItem from '../components/Forms/FormEditItem';
import '../styles/Profile.css';
import '../styles/CardItem.css';
import apiHandler from '../api/apiHandler';

class Profile extends Component {
	state = {
		itemsData: [],
		edit: null,
	};

	componentDidMount() {
		apiHandler
			.getItems(this.props.authContext.user._id)
			.then((apiResponse) => {
				this.setState({ itemsData: apiResponse });
			})
			.catch((apiError) => {
				console.log(apiError);
			});
	}

	handleDelete = (id) => {
		apiHandler
			.deleteItem(id)
			.then((apiResponse) => {
				const newItemsData = this.state.itemsData.filter((item, index) => {
					return item._id !== id;
				});
				this.setState({ itemsData: newItemsData });
			})
			.catch((apiError) => {
				console.log(apiError);
			});
	};

	handleEdit = (id) => {
		this.setState({ edit: id });
	};

	render() {
		const { authContext } = this.props;
		const { user } = authContext;
		return (
			<div style={{ padding: '100px', fontSize: '1.25rem' }}>
				<FranckTips />

				<section className="Profile">
					<div className="user-image round-image">
						<img src={user.profileImg} alt={user.firstName} />
					</div>
					<div className="user-presentation">
						<h2>
							{user.firstName} {user.lastName}
						</h2>
						<Link className="link" to="/profile/settings">
							Edit profile
						</Link>
					</div>

					{!user.phoneNumber && <AddPhoneNumber />}

					{this.state.edit && <FormEditItem item={this.state.edit} />}

					<UserItems item={this.state.itemsData} deleteCb={this.handleDelete} editCb={this.handleEdit} />
				</section>
			</div>
		);
	}
}

export default withUser(Profile);
