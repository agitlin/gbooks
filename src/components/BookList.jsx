
import React, { useState, useMemo, useEffect, useCallback } from 'react';
import debounce from 'lodash.debounce';

const BookList = ({ books }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredBooks, setFilteredBooks] = useState(books);

    const handleSearch = useCallback(
        debounce((value) => {
            const filtered = books.filter((book) =>
                book.volumeInfo.title.toLowerCase().includes(value.toLowerCase())
            );
            setFilteredBooks(filtered);
        }, 300),
        []
    );

    useEffect(() => {
        handleSearch(searchTerm);
    }, [handleSearch, searchTerm]);

    if (filteredBooks.length === 0) {
        return <p>No books to display</p>;
    }

    return (
        <div>
            <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search books..."
            />
            {filteredBooks.length > 0 && <p>Total: {filteredBooks.length}</p>}
            {filteredBooks.map((book) => (
                <div key={book.id}>
                    <h2>{book.volumeInfo.title}</h2>
                    {book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.thumbnail ? (
                        <img src={book.volumeInfo.imageLinks.thumbnail} alt={book.volumeInfo.title} />
                    ) : (
                        <img src="./bird_saquat.jpeg" alt={book.volumeInfo.title} />
                    )}
                </div>
            ))}
        </div>
    );
};

export default BookList;
