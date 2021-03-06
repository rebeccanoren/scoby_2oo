import axios from 'axios';

const service = axios.create({
	baseURL: process.env.REACT_APP_BACKEND_URL,
	withCredentials: true, // Cookie is sent to client when using this service. (used for session)
});

function errorHandler(error) {
	if (error.response.data) {
		console.log(error.response && error.response.data);
		throw error;
	}
	throw error;
}

export default {
	service,

	signup(userInfo) {
		return service
			.post('/api/auth/signup', userInfo)
			.then((res) => res.data)
			.catch(errorHandler);
	},

	signin(userInfo) {
		return service
			.post('/api/auth/signin', userInfo)
			.then((res) => res.data)
			.catch(errorHandler);
	},

	isLoggedIn() {
		return service
			.get('/api/auth/isLoggedIn')
			.then((res) => res.data)
			.catch(errorHandler);
	},

	logout() {
		return service
			.get('/api/auth/logout')
			.then((res) => res.data)
			.catch(errorHandler);
	},

	getProfileSettings(userId) {
		return service
			.get(`/api/users/${userId}`)
			.then((res) => res.data)
			.catch(errorHandler);
	},

	updateProfileSettings(id, userInfo) {
		return service
			.patch(`/api/users/${id}`, userInfo)
			.then((res) => res.data)
			.catch(errorHandler);
	},

	getItems(info) {
		let r = `/api/items`;
		if (info) {
			r = `/api/items?${info}`;
		}
		return service
			.get(r)
			.then((res) => res.data)
			.catch(errorHandler);
	},

	getItemById(id) {
		return service
			.get(`/api/items/${id}`)
			.then((res) => res.data)
			.catch(errorHandler);
	},

	createItem(data) {
		return service
			.post('/api/items/new', data)
			.then((res) => res.data)
			.catch(errorHandler);
	},

	editItem(id, data) {
		return service
			.patch(`/api/items/${id}`, data)
			.then((res) => res.data)
			.catch(errorHandler);
	},

	deleteItem(itemId) {
		return service
			.delete(`/api/items/${itemId}`)
			.then((res) => res.data)
			.catch(errorHandler);
	},
};