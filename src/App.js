import React, { useState, useEffect } from 'react';
import BookList from './components/BookList';

const GBOOKS_URL = 'https://www.googleapis.com/books/v1/volumes?q=cyber';

function App() {
  const [books, setBooks] = useState([]);
  const [pageSize, setPageSize] = useState(10);
  const [startIndex, setStartIndex] = useState(0);

  const handlePageSizeChange = (e) => {
    setPageSize(Number(e.target.value));
  };

  const handlePrev = () => {
    let newStartIndex=(startIndex >= pageSize)?startIndex-pageSize:0;
    setStartIndex(newStartIndex);
  };

  const handleNext = () => {
    setStartIndex(startIndex + pageSize);
  };

  const fetchBooks = async () => {
    try {
      const response = await fetch(
        `${GBOOKS_URL}&maxResults=${pageSize}&startIndex=${startIndex}`
      );
      const data = await response.json();
        return data.items;
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  useEffect(() => {
    fetchBooks().then((books) => setBooks(books));
    console.log(books);
  }, [pageSize, startIndex]);

  return (
    <div className="App">
      <h1>BookList</h1>
      <select value={pageSize} onChange={handlePageSizeChange}>
        <option value="10">10</option>
        <option value="25">25</option>
        <option value="50">50</option>
      </select>        <button onClick={handlePrev} disabled={startIndex === 0}>Prev</button>
        <button onClick={handleNext} disabled={!books || books.length < pageSize}>Next</button>
        <label>Offset: {startIndex}</label>
        <BookList books={books} />
        </div>

      );
    }

export default App;
