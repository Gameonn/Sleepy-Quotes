import React, {Suspense, useContext} from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Layout from './components/layout/Layout';
import LoadingSpinner from './components/UI/LoadingSpinner';
import AuthContext from './store/auth-context';

function App() {

	const NewQuote = React.lazy(() => import('./pages/NewQuote'));
	const NotFound = React.lazy(() => import('./pages/NotFound'));
	const QuoteDetail = React.lazy(() => import('./pages/QuoteDetail'));
	const CategorizedQuotes = React.lazy(() => import('./pages/CategorizedQuotes'));
	const AuthPage = React.lazy(() => import('./pages/AuthPage'));
	const UserProfile = React.lazy(() => import('./pages/ProfilePage'));

	const authCtx = useContext(AuthContext);
	const isLoggedIn = authCtx.isLoggedIn;

  	return (
		<Layout>
		<Switch>
			<Route path="/" exact >
				<Redirect to="/quotes" />
			</Route>
			<Route path="/auth" render={() => (
				<Suspense fallback={<div className='centered'><LoadingSpinner /></div>}>
					{ !isLoggedIn && <AuthPage /> }
					{ isLoggedIn && <Redirect to='/quotes' /> }
				</Suspense>
			)} />
			<Route path="/profile" render={() => (
				<Suspense fallback={<div className='centered'><LoadingSpinner /></div>}>
					{ isLoggedIn && <UserProfile />}
					{ !isLoggedIn && <Redirect to='/auth' />}
				</Suspense>
			)} />
			<Route path="/quotes" exact render={() => (
				<Suspense fallback={<div className='centered'><LoadingSpinner /></div>}><CategorizedQuotes isMain /></Suspense>
			)} />
			<Route path="/quotes/new" render={() => (
				<Suspense fallback={<div className='centered'><LoadingSpinner /></div>}>
					{ isLoggedIn && <NewQuote />}
					{ !isLoggedIn && <Redirect to='/auth' />}
				</Suspense>
			)} />
			<Route path="/quotes/generate" render={() => (
				<Suspense fallback={<div className='centered'><LoadingSpinner /></div>}><QuoteDetail /></Suspense>
			)} />
			<Route path="/quotes/author/:authorName" render={() => (
				<Suspense fallback={<div className='centered'><LoadingSpinner /></div>}><CategorizedQuotes /></Suspense>
			)} />
			<Route path="/quotes/genre/:genre" render={() => (
				<Suspense fallback={<div className='centered'><LoadingSpinner /></div>}><CategorizedQuotes /></Suspense>
			)} />
			<Route path="/quotes/:quoteId" render={() => (
				<Suspense fallback={<div className='centered'><LoadingSpinner /></div>}><QuoteDetail /></Suspense>
			)} />
			<Route path="*" render={() => (
				<Suspense fallback={<div className='centered'><LoadingSpinner /></div>}><NotFound /></Suspense>
			)} />
		</Switch>
		</Layout>
  	);
}

export default App;
