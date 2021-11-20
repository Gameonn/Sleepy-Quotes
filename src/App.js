import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Layout from './components/layout/Layout';
import QuoteList from './pages/AllQuotes';
import HighlightedQuote from './pages/QuoteDetail';
import QuoteForm from './pages/NewQuote';
import NotFound from './pages/NotFound';


function App() {
  return (
    <Layout>
      <Switch>
        <Route path="/" exact >
          <Redirect to="/quotes" />
        </Route>
        <Route path="/quotes" component={QuoteList} exact />
        <Route path="/quotes/new" component={QuoteForm} />
        <Route path="/quotes/:quoteId" component={HighlightedQuote} />
        <Route path="*" component={NotFound} />
      </Switch>
    </Layout>
  );
}

export default App;
