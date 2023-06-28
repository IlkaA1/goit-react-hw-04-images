import css from './search.module.css';
import { FcSearch } from 'react-icons/fc';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

const Searchbar = ({ onSubmit }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const onChangeState = ({ target: { value } }) => {
    setSearchQuery(value);
  };

  const handleSubmit = evt => {
    evt.preventDefault();

    onSubmit(searchQuery);

    evt.target.reset();
  };

  return (
    <header className={css.Searchbar}>
      <form className={css.SearchForm} onSubmit={handleSubmit}>
        <input
          className={css.SearchForm_input}
          name="searchQuery"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          id="searchQuery"
          onChange={onChangeState}
        />
        <button type="submit" className={css.SearchForm_button}>
          <FcSearch />
          <span className={css.SearchForm_button_label}>Search</span>
        </button>
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
export default Searchbar;
