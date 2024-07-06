import { ChangeEvent, Component } from 'react';
import { Header } from '../header';
import { Main } from '../main';
import { fetchData } from '../../services/api.ts';
import { BASE_URL, SEARCH_PARAM } from '../../constants/api.ts';
import { getItemFromLocalStorage, setItemToLocalStorage } from '../../utils/utils.ts';
import { Data } from '../../types';

interface LayoutState {
  searchQuery: string;
  data: Data | { info: Record<string, unknown>; results: [] };
}

export class Layout extends Component<Record<string, never>, LayoutState> {
  state = {
    searchQuery: getItemFromLocalStorage('searchQuery'),
    data: { info: {}, results: [] },
  };

  componentDidMount() {
    this.handleSearch();
  }

  setData = (data: Data) => {
    this.setState((prevState) => ({
      ...prevState,
      data,
    }));
  };

  handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState((prevState) => ({
      ...prevState,
      searchQuery: e.target.value,
    }));
  };

  handleSearch = () => {
    const { searchQuery } = this.state;
    const savedSearchQuery = getItemFromLocalStorage('searchQuery');

    if (savedSearchQuery) {
      this.fetchByQuery(savedSearchQuery);
      return;
    }

    this.fetchByQuery(searchQuery);
  };

  handleClick = () => {
    const { searchQuery } = this.state;
    setItemToLocalStorage('searchQuery', searchQuery);
    this.fetchByQuery(searchQuery);
  };

  fetchByQuery = async (searchQuery: string) => {
    try {
      const data = await fetchData<Data>(`${BASE_URL}/?${SEARCH_PARAM}=${searchQuery}`);
      this.setData(data);
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const { searchQuery, data } = this.state;
    const { results = [] } = data;

    return (
      <>
        <Header
          searchQuery={searchQuery}
          handleClick={this.handleClick}
          handleInputChange={this.handleInputChange}
        />
        <Main results={results} />
      </>
    );
  }
}
