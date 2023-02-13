const FIREBASE_DOMAIN = 'https://quote-builder-72b4f-default-rtdb.firebaseio.com';
const QUOTE_API_DOMAIN = 'https://quote-garden.onrender.com/api/v3/quotes/';

export async function getAllQuotes() {
  const response = await fetch(`${FIREBASE_DOMAIN}/quotes.json`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Could not fetch quotes.');
  }

  const transformedQuotes = [];

  for (const key in data) {
    const quoteObj = {
      id: key,
      ...data[key],
    };

    transformedQuotes.push(quoteObj);
  }

  return transformedQuotes;
}

export async function getAuthorQuotes(author) {
  const response = await fetch(`${QUOTE_API_DOMAIN}?author=${author}`);
  const { data } = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Could not fetch quotes.');
  }

  const transformedQuotes = [];

  for (const key in data) {
    const quoteObj = {
      id: data[key]._id,
      text: data[key].quoteText,
      author: data[key].quoteAuthor,
      genre: data[key].quoteGenre,
    };

    transformedQuotes.push(quoteObj);
  }

  return transformedQuotes;
}

export async function getGenreQuotes(genre) {
  const response = await fetch(`${QUOTE_API_DOMAIN}?genre=${genre}`);
  const { data } = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Could not fetch quotes.');
  }

  const transformedQuotes = [];

  for (const key in data) {
    const quoteObj = {
      id: data[key]._id,
      text: data[key].quoteText,
      author: data[key].quoteAuthor,
      genre: data[key].quoteGenre,
    };

    transformedQuotes.push(quoteObj);
  }

  return transformedQuotes;
}

export async function getRandomQuote() {
  const response = await fetch(`${QUOTE_API_DOMAIN}/random`);
  const { data } = await response.json();
  if(!response.ok) {
    throw new Error(data.message || 'Could not generate quote');
  }

  const loadedQuote = {
    id: data[0]._id,
    text: data[0].quoteText,
    author: data[0].quoteAuthor,
    genre: data[0].quoteGenre,
  };

  return loadedQuote;
}

export async function getSingleQuote(quoteId) {
  const response = await fetch(`${FIREBASE_DOMAIN}/quotes/${quoteId}.json`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Could not fetch quote.');
  }

  const loadedQuote = {
    id: quoteId,
    ...data,
  };

  return loadedQuote;
}

export async function addQuote(quoteData) {
  const response = await fetch(`${FIREBASE_DOMAIN}/quotes.json`, {
    method: 'POST',
    body: JSON.stringify(quoteData),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Could not create quote.');
  }

  return null;
}

export async function addComment(requestData) {
  const response = await fetch(`${FIREBASE_DOMAIN}/comments/${requestData.quoteId}.json`, {
    method: 'POST',
    body: JSON.stringify(requestData.commentData),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Could not add comment.');
  }

  return { commentId: data.name };
}

export async function getAllComments(quoteId) {
  const response = await fetch(`${FIREBASE_DOMAIN}/comments/${quoteId}.json`);

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Could not get comments.');
  }

  const transformedComments = [];

  for (const key in data) {
    const commentObj = {
      id: key,
      ...data[key],
    };

    transformedComments.push(commentObj);
  }

  return transformedComments;
}
