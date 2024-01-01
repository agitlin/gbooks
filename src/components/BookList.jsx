
import React, { useState, useEffect, useCallback } from 'react';
import debounce from 'lodash.debounce';

const BookList = ({ books }) => {
    const [searchTerm, setSearchTerm] = useState('');
    

    return (
        <div>
            {books.length > 0 && <p>Total: {books.length}</p>}
            {books.map((book) => (
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
