import classes from './NoQuotesFound.module.css';

import { Link, useLocation } from 'react-router-dom'

const NoQuotesFound = () => {
  const location = useLocation();
  return (
    <div className={classes.noquotes}>
      <p>No quotes found!</p>
      <Link to={`${location.pathname}/new`} className='btn'> Add a Quote </Link>
    </div>
  );
};

export default NoQuotesFound;
