import { Component } from 'react';
import css from './searchbar.module.scss';

export class Searchbar extends Component {
  state = {
    q: '',
  };

  handleChangeQuery = e => {
    this.setState({ q: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state.q);
  };

  render() {
    const { q } = this.state;
    // const { onSubmit } = this.props;
    return (
      <header className={css.searchbar}>
        <form className={css.searchForm} onSubmit={this.handleSubmit}>
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
            onChange={this.handleChangeQuery}
            required
          />
        </form>
      </header>
    );
  }
}
