import React, { useState, useEffect } from 'react';
import BookList from './components/BookList';
import axios from 'axios';
import './App.css'; 
const GBOOKS_URL = 'https://www.googleapis.com/books/v1/volumes?q=cyber';

function App() {
  const [books, setBooks] = useState([]);
  const [pageSize, setPageSize] = useState(10);
  const [startIndex, setStartIndex] = useState(0);

  const handlePageSizeChange = (e) => {
    setPageSize(Number(e.target.value));
  };

  const handlePrev = () => {
    let newStartIndex = startIndex >= pageSize ? startIndex - pageSize : 0;
    setStartIndex(newStartIndex);
  };

  const handleNext = () => {
    setStartIndex(startIndex + pageSize);
  };

  const fetchOnce = async (fetchSize, fetchIndex) => {
    try {
      const response = await axios.get(
        `${GBOOKS_URL}&maxResults=${fetchSize}&startIndex=${fetchIndex}&pageSize=${fetchSize}`
      );
      const data = response.data;
      return data.items;
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  const fetchBooks = async () => {
    if (pageSize < 40) {
      const result = await fetchOnce(pageSize, startIndex);
      return result;
    } else {
      const [firstFetch, secondFetch] = await Promise.all([
        fetchOnce(pageSize / 2, startIndex),
        fetchOnce(pageSize / 2, startIndex + pageSize / 2),
      ]);
      const result = firstFetch.concat(secondFetch);
      return result;
    }
  };

  useEffect(() => {
    fetchBooks().then((books) => setBooks(books));
    console.log(books);
  }, [pageSize, startIndex]);

  return (
    <div className="App">
      <h1>Cyber Book List</h1>
      <select value={pageSize} onChange={handlePageSizeChange}>
        <option value="10">10</option>
        <option value="25">25</option>
        <option value="50">50</option>
      </select>
      <button
        className="prev-button" 
        onClick={handlePrev}
        disabled={startIndex === 0}
      >
        Prev
      </button>
      <button
        className="next-button" 
        onClick={handleNext}
        disabled={!books || books.length < pageSize}
      >
        Next
      </button>

      <BookList books={books} />
    </div>
  );
}

export default App;
