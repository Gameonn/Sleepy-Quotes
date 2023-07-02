import { useRef, useState } from 'react';
import { Prompt } from 'react-router-dom';

import Card from '../UI/Card';
import LoadingSpinner from '../UI/LoadingSpinner';
import classes from './QuoteForm.module.css';

const QuoteForm = (props) => {
	const authorInputRef = useRef();
	const textInputRef = useRef();
	const genreInputRef = useRef();
	const [isEntering, setIsEntering] = useState(false);

  	function submitFormHandler(event) {
		event.preventDefault();

		const enteredAuthor = authorInputRef.current.value;
		const enteredText = textInputRef.current.value;
		const enteredGenre = genreInputRef.current.value;

		props.onAddQuote({ author: enteredAuthor, text: enteredText, genre: enteredGenre });
	}

  	const formFocussedHandler = () => setIsEntering(true);

  	const finishEnteringHandler = () => setIsEntering(false);

  	return (
		<>
			<Prompt 
				when={isEntering} 
				message={(location) => 'Are you sure, you want to leave? All your entered data will be lost.' } />
			<Card>
				<form onFocus={formFocussedHandler} className={classes.form} onSubmit={submitFormHandler}>
					{props.isLoading && (
					<div className={classes.loading}>
						<LoadingSpinner />
					</div>
					)}

					<div className={classes.control}>
						<label htmlFor='author'>Author</label>
						<input type='text' id='author' ref={authorInputRef} />
					</div>
					<div className={classes.control}>
						<label htmlFor='text'>Text</label>
						<textarea id='text' rows='5' ref={textInputRef}></textarea>
					</div>
					<div className={classes.control}>
						<label htmlFor='genre'>Genre</label>
						<input type='text' id='genre' ref={genreInputRef} />
					</div>
					<div className={classes.actions}>
						<button className='btn' onClick={finishEnteringHandler} >Add Quote</button>
					</div>
				</form>
			</Card>
		</>
  );
};

export default QuoteForm;
