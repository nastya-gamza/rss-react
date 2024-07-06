import styles from './layout.module.css';
import { Header } from '../header/header.tsx';
import { ChangeEvent, Component } from 'react';

interface LayoutState {
  searchValue: string;
}

export class Layout extends Component<Record<string, never>, LayoutState> {
  state = {
    searchValue: '',
  };

  handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchValue: e.target.value });
  };

  onClickClear = () => {
    this.setState({ searchValue: '' });
  };

  render() {
    const { searchValue } = this.state;

    return (
      <>
        <Header
          handleSearch={this.handleSearch}
          onClickClear={this.onClickClear}
          searchValue={searchValue}
        />
        <main className={styles.container}></main>
      </>
    );
  }
}
