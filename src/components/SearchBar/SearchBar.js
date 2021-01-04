import React from "react";
import { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import "./SearchBar.css";

function SearchBar({ options, id, label, label2, prompt, value, onChange }) {
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(1);
  const [query, setQuery] = useState("");
  const ref = useRef(null);
  useEffect(() => {
    document.addEventListener("click", toggle);
    return () => document.removeEventListener("click", toggle);
  }, []);

  function toggle(e) {
    setOpen(e && e.target === ref.current);
  }

  function filter(options) {
    return options.filter((option) => {
      if (option[label].toLowerCase().indexOf(query.toLowerCase()) > -1) {
        return true;
      } else {
        return false;
      }
    });
  }

  function displayValue() {
    if (query.length > 0) return query;
    if (value) return `${value[label]} ${value[label2]}`;
    return "";
  }

  function selectOption(option) {
    setQuery("");
    onChange(option);
    setOpen(false);
  }

  const handleKeyPress = (e, value) => {
    if (e.charCode === 13) {
      history.push(`/users/${value}/profile`);
    }
  };

  const handleSearchClick = (value) => {
    history.push(`/users/${value}/profile`);
  };

  return (
    <div className="dropdown">
      <div className="control" onClick={() => setOpen((prev) => !prev)}>
        <div className="selected-value">
          <input
            ref={ref}
            placeholder={value ? `${value[label]}` : prompt}
            type="text"
            value={displayValue()}
            onChange={(e) => {
              setQuery(e.target.value);
              onChange(null);
            }}
            onKeyPress={(e) => handleKeyPress(e, selectedId)}
            onClick={toggle}
            onTouchEnd={toggle}
          />
        </div>
        <div className={`arrow ${open ? "open" : null}`} />
      </div>
      <div className={`options ${open ? "open" : null}`}>
        {filter(options).map((option) => (
          <div
            key={option[id]}
            onChange={(e) => setSelectedId(option.id)}
            className={`option ${value === option ? "selected" : null}`}
            onClick={() => {
              // setSelectedId(option.id);
              selectOption(option);
              handleSearchClick(option.id);
            }}
            onTouchEnd={() => selectOption(option)}
          >
            {`${option[label]} ${option[label2]}`}
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchBar;
