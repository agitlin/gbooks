
import React, { useState, useEffect } from 'react';
import './BookList.css';
import Modal from './Modal.jsx';
import { debounce } from 'lodash';

const BookList = ({ books }) => {
    const [selectedBook, setSelectedBook] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredBooks, setFilteredBooks] = useState(books);

    useEffect(() => {
        const debouncedSearch = debounce(() => {
            const filtered = books.filter((book) =>
                book.volumeInfo.title.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredBooks(filtered);
        }, 300);

        debouncedSearch();

        return () => {
            debouncedSearch.cancel();
        };
    }, [books, searchTerm]);

    return (
        <div>
        <input
        type="text"
        placeholder="Search books..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
    />

<div className="book-list">

            {filteredBooks.map((book, index) => (
                <div
                    className="book-item"
                    key={book.id + index}
                    onClick={() => {
                        setSelectedBook(book);
                    }}
                >
                    <h2>{book.volumeInfo.title}</h2>
                    {book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.thumbnail ? (
                        <img
                            src={book.volumeInfo.imageLinks.thumbnail}
                            alt={book.volumeInfo.title}
                        />
                    ) : (
                        <img src="./bsq.jpeg" alt={book.volumeInfo.title} />
                    )}
                </div>
            ))}

            <Modal selectedBook={selectedBook} />
        </div>
        </div>
    );
};

export default BookList;
