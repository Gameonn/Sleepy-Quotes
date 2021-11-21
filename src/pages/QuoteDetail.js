import {useEffect} from 'react';

import { useParams, Route, Link, useRouteMatch } from 'react-router-dom';
import Comments from '../components/comments/Comments';
import HighlightedQuote from '../components/quotes/HighlightedQuote';
import useHttp from '../hooks/use-http';
import { getSingleQuote, getRandomQuote } from '../lib/api';
import LoadingSpinner from '../components/UI/LoadingSpinner';

const QuoteDetail = () => {
    const params = useParams();
    const {quoteId} = params;
    const match = useRouteMatch();
    const {sendRequest, status, data: loadedQuote, error} = useHttp(
        quoteId ? getSingleQuote : getRandomQuote, true);

    useEffect(() => {
        sendRequest(quoteId);
    }, [sendRequest, quoteId]);
    
    if(status === 'pending') return (<div className='centered'><LoadingSpinner /></div>);

    if(error) return (<p className="centered focused"> {error} </p>);

    if(!loadedQuote.text) return <h2>No Quote Found!</h2>;

    return (
        <div>
            {!quoteId && <button className='btn--flat' onClick={sendRequest} > Refresh </button>}
            <HighlightedQuote {...loadedQuote} />
            <Route path={`${match.path}`} exact>
                <div className='centered'>
                    <Link className='btn--flat' to={`${match.url}/comments`} > Show Comments </Link>
                </div>
            </Route>            
           <Route path={`${match.path}/comments`} component={Comments} />
        </div>
        
    )
}

export default QuoteDetail;