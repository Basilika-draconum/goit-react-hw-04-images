import { useState } from 'react';
import css from './searchbar.module.scss';

export const Searchbar = ({ onSubmit }) => {
  const [q, setQ] = useState('');

  const handleChangeQuery = e => {
    setQ(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(q);
  };

  return (
    <header className={css.searchbar}>
      <form className={css.searchForm} onSubmit={handleSubmit}>
        <button type="submit" className={css.searchForm_button}>
          <span className={css.searchForm_button_label}>Search</span>
        </button>

        <input
          className={css.searchForm_input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={q}
          onChange={handleChangeQuery}
          required
        />
      </form>
    </header>
  );
};
