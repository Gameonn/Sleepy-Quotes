import React, {Suspense} from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Layout from './components/layout/Layout';
import LoadingSpinner from './components/UI/LoadingSpinner';


function App() {

  const NewQuote = React.lazy(() => import('./pages/NewQuote'));
  const NotFound = React.lazy(() => import('./pages/NotFound'));
  const QuoteDetail = React.lazy(() => import('./pages/QuoteDetail'));
  const CategorizedQuotes = React.lazy(() => import('./pages/CategorizedQuotes'));

  return (
    <Layout>
      <Switch>
        <Route path="/" exact >
          <Redirect to="/quotes" />
        </Route>
        <Route path="/quotes" exact render={() => (
            <Suspense fallback={<div className='centered'><LoadingSpinner /></div>}><CategorizedQuotes isMain /></Suspense>
          )} />
        <Route path="/quotes/new" render={() => (
            <Suspense fallback={<div className='centered'><LoadingSpinner /></div>}><NewQuote /></Suspense>
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
