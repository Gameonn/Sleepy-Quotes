import { useEffect } from 'react';
import {useParams} from 'react-router-dom';
import QuoteList from '../components/quotes/QuoteList';
import NoQuotesFound from '../components/quotes/NoQuotesFound';
import useHttp from '../hooks/use-http';
import { getAllQuotes, getAuthorQuotes, getGenreQuotes } from '../lib/api';
import LoadingSpinner from '../components/UI/LoadingSpinner';

const CategorizedQuotes = ({isMain}) => {
    const params = useParams();
    const {authorName, genre} = params;
    const keyword = authorName ? authorName : genre;
    const { sendRequest, status, data: loadedQuotes, error } = useHttp(
        isMain ? getAllQuotes : (authorName ? getAuthorQuotes : getGenreQuotes), true);

    useEffect(() => {
        sendRequest(keyword);
    }, [sendRequest, keyword]);

    if(status === 'pending') return (<div className='centered'><LoadingSpinner /></div>);

    if(error) return (<p className="centered focused"> {error} </p>);

    if(status === 'completed' && (!loadedQuotes || !loadedQuotes.length)) return <NoQuotesFound />;

    return <QuoteList quotes={loadedQuotes} />
}

export default CategorizedQuotes;