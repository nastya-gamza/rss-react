import { ChangeEvent, Component } from 'react';
import { Header } from '../header';
import { Main } from '../main';
import { fetchData } from '../../services/api.ts';
import { BASE_URL, SEARCH_PARAM } from '../../constants/api.ts';
import { getItemFromLocalStorage, setItemToLocalStorage } from '../../utils/utils.ts';
import { Data } from '../../types';
import { Loader } from '../loader';
import { Error } from '../error';

interface LayoutState {
  loading: boolean;
  error: boolean;
  searchQuery: string;
  data: Data | { info: Record<string, unknown>; results: [] };
}

export class Layout extends Component<Record<string, never>, LayoutState> {
  state = {
    loading: false,
    error: false,
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

  handleRefresh = () => {
    this.setState((prevState) => ({
      ...prevState,
      searchQuery: '',
      error: false,
    }));
    setItemToLocalStorage('searchQuery', '');
    this.fetchByQuery('');
  };

  fetchByQuery = async (searchQuery: string) => {
    try {
      this.setState((prevState) => ({
        ...prevState,
        loading: true,
        error: false,
      }));
      const data = await fetchData<Data>(`${BASE_URL}/?${SEARCH_PARAM}=${searchQuery}`);
      this.setData(data);
    } catch (error) {
      this.setState((prevState) => ({
        ...prevState,
        error: true,
      }));
    } finally {
      this.setState((prevState) => ({
        ...prevState,
        loading: false,
      }));
    }
  };

  render() {
    const { searchQuery, data, loading, error } = this.state;
    const { results = [] } = data;

    if (error) {
      return <Error handleRefresh={this.handleRefresh} />;
    }

    return (
      <>
        <Header
          searchQuery={searchQuery}
          handleClick={this.handleClick}
          handleInputChange={this.handleInputChange}
        />
        {loading ? <Loader /> : <Main results={results} />}
      </>
    );
  }
}
