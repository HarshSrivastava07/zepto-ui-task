// InputComponent.js
import React, { useState } from 'react';
import './InputComponent.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const InputComponent = () => {
  const initialItemsWithImages = [
    { name: 'Harsh', image: 'https://placekitten.com/100/100', email: 'harshsrivastava0003@zepto.com' },
    { name: 'Lala', image: 'https://placekitten.com/101/100', email: 'lala003@zepto.com' },
    { name: 'Zepto', image: 'https://placekitten.com/102/100', email: 'zepto@zepto.com' },
    { name: 'Gaurav', image: 'https://placekitten.com/103/100', email: 'gaurav0003@zepto.com' },
    { name: 'Thakur', image: 'https://placekitten.com/104/100', email: 'thakur@zepto.com' },
    { name: 'Bill', image: 'https://placekitten.com/100/100', email: 'bill@zepto.com' },
    { name: 'James', image: 'https://placekitten.com/101/100', email: 'james@zepto.com' },
    { name: 'Jasica', image: 'https://placekitten.com/102/100', email: 'jasica@zepto.com' },
    { name: 'Abraham', image: 'https://placekitten.com/103/100', email: 'abraham@zepto.com' },
    { name: 'Thala', image: 'https://placekitten.com/104/100', email: 'thala@zepto.com' },
  ];

  const [inputValue, setInputValue] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);
  const [initialItemsState, setInitialItems] = useState(initialItemsWithImages);
  const [searchClicked, setSearchClicked] = useState(false);
  

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSearchClick = () => {
    setSearchClicked(true);
  };

  const handleItemClick = (item) => {
    setSelectedItems([...selectedItems, item]);
    setInitialItems(initialItemsState.filter((it) => it.name !== item.name));
    setInputValue('');
  };

  const handleRemoveItem = (item) => {
    setSelectedItems(selectedItems.filter((selectedItem) => selectedItem.name !== item.name));
    setInitialItems([...initialItemsState, item]);
  };

  const filteredSuggestions = searchClicked ? initialItemsState.filter((item) => item.name.toLowerCase().includes(inputValue.toLowerCase())) : [];

  return (
    <div className="input-container">
      <div className="selected-items">
        {selectedItems.map((selectedItem, index) => (
          <div key={index} className="selected-item">
            <img src={selectedItem.image} alt={selectedItem.name} className="avatar" />
            <span>{selectedItem.name}</span>
            <span className="cancel-icon" onClick={() => handleRemoveItem(selectedItem)}><FontAwesomeIcon icon={faTimes} /></span>
          </div>
        ))}
      </div>
      <div className="suggestions-container">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onClick={handleSearchClick}
          className="bottom-border-input"
          placeholder="Add new user..."
        />
        {searchClicked && filteredSuggestions.length > 0 && (
          <ul className="suggestions">
            {filteredSuggestions.map((item, index) => (
              <li key={index} onClick={() => handleItemClick(item)}>
                <img src={item.image} alt={item.name} className="avatar" />
                <div className="email-container">
                  <span>{item.name}</span>
                  <span className="email">{item.email}</span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default InputComponent;
