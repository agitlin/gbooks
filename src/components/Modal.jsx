import React, { useState } from "react";

const Modal = ({ selectedBook }) => {
  const [showModal, setShowModal] = useState(true);

  return (
    <div>
      {selectedBook ? (
        <div className="modal">
          <div className="modal-content">
            <div className="order-form">
              <div className="order-container">
                <form>
                  <h3>Order Form</h3>
                  <textarea
                    className="selected-title"
                    label="Title"
                    rows="4"
                    cols="18"
                    id="title"
                    resize="none"
                    value={selectedBook.volumeInfo.title}
                    disabled
                  />
                  <p />
                  <label htmlFor="email">Email:</label>
                  <input type="email" id="email" />

                  <label htmlFor="name">Name:</label>
                  <input type="text" id="name" />

                  <label htmlFor="phone">Phone:</label>
                  <input type="text" id="phone" />
                  <button onClick={() => setShowModal(false)}>Close</button>
                  <button className="order" type="submit" disabled>
                    Order
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Modal;