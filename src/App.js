import React, {Suspense} from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Layout from './components/layout/Layout';
import QuoteList from './pages/AllQuotes';


function App() {

  const NewQuote = React.lazy(() => import('./pages/NewQuote'));
  const NotFound = React.lazy(() => import('./pages/NotFound'));
  const QuoteDetail = React.lazy(() => import('./pages/QuoteDetail'));
  return (
    <Layout>
      <Switch>
        <Route path="/" exact >
          <Redirect to="/quotes" />
        </Route>
        <Route path="/quotes" component={QuoteList} exact />
        <Route path="/quotes/new" render={() => (
                <Suspense fallback={<div>Loading...</div>}><NewQuote /></Suspense>
          )} />
        <Route path="/quotes/:quoteId" render={() => (
            <Suspense fallback={<div>Loading...</div>}><QuoteDetail /></Suspense>
          )} />
        <Route path="*" render={() => (
            <Suspense fallback={<div>Loading...</div>}><NotFound /></Suspense>
          )} />
      </Switch>
    </Layout>
  );
}

export default App;
