import React from 'react';

const FranckType = () => {
	return (
		<React.Fragment>
			<h2 style={{ fontSize: '1.5rem', marginBottom: '10px' }}>This is profile, it's protected !</h2>
			<p>Hello</p>
			<p>
				Checkout the<b>ProtectedRoute</b> component in
				<code>./components/ProtectRoute.jsx</code>
			</p>
			<a
				style={{ color: 'dodgerblue', fontWeight: 'bold' }}
				target="_blank"
				rel="noopener noreferrer"
				href="https://reacttraining.com/react-router/web/example/auth-workflow"
			>
				React router dom Demo of a protected route
			</a>
		</React.Fragment>
	);
};

export default FranckType;
