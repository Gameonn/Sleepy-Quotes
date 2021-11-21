import classes from './HighlightedQuote.module.css';

import { Link } from 'react-router-dom';

const HighlightedQuote = ({text, author, genre}) => {
  return (
    <figure className={classes.quote}>
      <p>{text}</p>
      <figcaption>
        <Link to={`/quotes/author/${author}`} className='btn'> {author} </Link>
      </figcaption>
      <Link to={`/quotes/genre/${genre}`} className='btn'> {genre} </Link>
    </figure>
  );
};

export default HighlightedQuote;
