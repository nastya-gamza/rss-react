import { ChangeEvent, Component } from 'react';
import { Header } from '../header';
import { Main } from '../main';
import { fetchData } from '../../services/api.ts';
import { BASE_URL, SEARCH_PARAM } from '../../constants/api.ts';
import { Data } from '../../types';

interface LayoutState {
  searchQuery: string;
  data: Data | { info: Record<string, unknown>; results: [] };
}

export class Layout extends Component<Record<string, never>, LayoutState> {
  state = {
    searchQuery: '',
    data: { info: {}, results: [] },
  };

  setData = (data) => {
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

  componentDidMount() {
    this.handleSearch();
  }

  render() {
    const { searchQuery, data } = this.state;
    const { results = [] } = data;

    return (
      <>
        <Header
          handleInputChange={this.handleInputChange}
          handleSearch={this.handleSearch}
          searchQuery={searchQuery}
        />
        <Main results={results} />
      </>
    );
  }
}
