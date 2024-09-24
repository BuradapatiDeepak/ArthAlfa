import React, { useState } from 'react';
import './TextArea.css'; // Ensure you're importing the CSS file

function TextArea() {
  const [text, setText] = useState('');
  const [uniqueWords, setUniqueWords] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [searchString, setSearchString] = useState('');
  const [replaceString, setReplaceString] = useState('');

  const handleTextChange = (e) => {
    const newText = e.target.value;
    setText(newText);
    updateStatistics(newText);
  };

  const updateStatistics = (text) => {
    const words = text.split(/\s+/);
    const uniqueWordsSet = new Set(words.map((word) => word.toLowerCase()));
    setUniqueWords(uniqueWordsSet.size);

    const charCountWithoutSpacesAndPunctuation = text.replace(/[^\w]/g, '').length;
    setCharCount(charCountWithoutSpacesAndPunctuation);
  };

  const replaceAll = () => {
    const newText = text.replace(new RegExp(searchString, 'g'), replaceString);
    setText(newText);
    updateStatistics(newText);
  };

  return (
    <div className="container">
      <div className="textarea-container">
        <textarea
          className="textarea"
          value={text}
          onChange={handleTextChange}
          placeholder="Enter your text here..."
        />
      </div>
      <Statistics uniqueWords={uniqueWords} charCount={charCount} />
      <ReplaceStrings
        searchString={searchString}
        replaceString={replaceString}
        onSearchStringChange={(e) => setSearchString(e.target.value)}
        onReplaceStringChange={(e) => setReplaceString(e.target.value)}
        onReplaceAllClick={replaceAll}
      />
    </div>
  );
}

function Statistics({ uniqueWords, charCount }) {
  return (
    <div className="statistics">
      <p>Unique words: {uniqueWords}</p>
      <p>Character count (excluding spaces and punctuation): {charCount}</p>
    </div>
  );
}

function ReplaceStrings({
  searchString,
  replaceString,
  onSearchStringChange,
  onReplaceStringChange,
  onReplaceAllClick,
}) {
  return (
    <div className="replace-strings">
      <input
        type="text"
        className="replace-input"
        value={searchString}
        onChange={onSearchStringChange}
        placeholder="Search for"
      />
      <input
        type="text"
        className="replace-input"
        value={replaceString}
        onChange={onReplaceStringChange}
        placeholder="Replace with"
      />
      <button className="replace-button" onClick={onReplaceAllClick}>
        Replace All
      </button>
    </div>
  );
}

export default TextArea;
