import React from 'react';
import './Sidebar.css';

function Sidebar({ onSelectCategory, selectedCategory, onSelectAuthor, selectedAuthor, onSelectAlphabet, selectedAlphabet, categories, authors }) {
  const alphabet = 'అఆఇఈఉఊఋఎఏఐఒఓఔఅంఅఃకఖగఘఙచఛజఝఞటఠడఢణతథదధనపఫబభమయరలవశషసహళక్షఱ'.split('');

  return (
    <div className="sidebar">
      {categories && categories.length > 0 && (
        <>
          <h3>వర్గాలు</h3>
          <ul className="category-list">
            {categories.map(category => (
              <li 
                key={category} 
                className={selectedCategory === category ? 'active' : ''}
                onClick={() => {onSelectCategory(category); if (onSelectAuthor) onSelectAuthor('All');}}
              >
                {category}
              </li>
            ))}
          </ul>
        </>
      )}

      {authors && authors.length > 0 && (
        <>
          <h3>బోధకులు</h3> {/* ఇక్కడ మార్పు */}
          <ul className="author-list">
            {authors.map(author => (
              <li 
                key={author} 
                className={selectedAuthor === author ? 'active' : ''}
                onClick={() => {if (onSelectAuthor) onSelectAuthor(author); onSelectCategory('All');}}
              >
                {author}
              </li>
            ))}
          </ul>
        </>
      )}

      {onSelectAlphabet && (
        <>
          <h3>అక్షరాల క్రమం</h3>
          <div className="alphabet-grid">
            {alphabet.map(letter => (
              <span 
                key={letter} 
                className={`alphabet-char ${selectedAlphabet === letter ? 'active-alphabet' : ''}`}
                onClick={() => onSelectAlphabet(letter)}>
                {letter}
              </span>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Sidebar;