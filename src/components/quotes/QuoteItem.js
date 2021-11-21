import classes from './QuoteItem.module.css';
import { Link, useLocation } from 'react-router-dom';

const QuoteItem = ({id, author, text, genre}) => {
  const location = useLocation();
  const isQuoteRoute = !location.pathname.includes('author') && !location.pathname.includes('genre');

  return (
    <li className={classes.item}>
      <figure style={{width: isQuoteRoute ? '70%': '100%'}}>
        <blockquote>
          <p>{text}</p>
        </blockquote>
        <figcaption>          
        <Link to={`/quotes/author/${author}`} > {author} </Link> ,
        <Link to={`/quotes/genre/${genre}`} > {genre} </Link>
        </figcaption>
        
      </figure>
      { isQuoteRoute && <Link to={`/quotes/${id}`} className='btn'>View Fullscreen</Link>}
    </li>
  );
};

export default QuoteItem;
