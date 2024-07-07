import { ChangeEvent, Component } from 'react';
import { Header } from '../header';
import { Main } from '../main';
import { fetchData } from '../../services/api.ts';
import { BASE_URL, SEARCH_PARAM } from '../../constants/api.ts';
import { getItemFromLocalStorage, setItemToLocalStorage } from '../../utils';
import { Data } from '../../types';
import { Loader } from '../loader';
import { Error } from '../error';

interface LayoutState {
  data: Data | { info: Record<string, unknown>; results: [] };
  loading: boolean;
  error: boolean;
  searchQuery: string;
}

export class Layout extends Component<Record<string, never>, LayoutState> {
  state = {
    data: { info: {}, results: [] },
    loading: false,
    error: false,
    searchQuery: getItemFromLocalStorage('searchQuery'),
  };

  componentDidMount() {
    this.handleSearch();
  }

  updateState = (newState: Partial<LayoutState>) => {
    this.setState((prevState) => ({
      ...prevState,
      ...newState,
    }));
  };

  handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.updateState({ searchQuery: e.target.value });
  };

  handleSearch = () => {
    const searchQuery = getItemFromLocalStorage('searchQuery') || this.state.searchQuery;
    this.fetchByQuery(searchQuery);
  };

  handleClick = () => {
    const { searchQuery } = this.state;
    setItemToLocalStorage('searchQuery', searchQuery);
    this.fetchByQuery(searchQuery);
  };

  handleRefresh = () => {
    this.updateState({ searchQuery: '', error: false });
    setItemToLocalStorage('searchQuery', '');
    this.fetchByQuery('');
  };

  fetchByQuery = async (searchQuery: string) => {
    try {
      this.updateState({ loading: true, error: false });
      const data = await fetchData<Data>(`${BASE_URL}/?${SEARCH_PARAM}=${searchQuery}`);
      this.updateState({ data });
    } catch (error) {
      this.updateState({ error: true });
    } finally {
      this.updateState({ loading: false });
    }
  };

  render() {
    const { searchQuery, data, loading, error } = this.state;
    const { results = [] } = data;

    return (
      <>
        <Header
          searchQuery={searchQuery}
          handleClick={this.handleClick}
          handleInputChange={this.handleInputChange}
        />
        {loading && <Loader />}
        {error && (
          <Error message={'Oops! Nothing was found ☹️'} handleRefresh={this.handleRefresh} />
        )}
        {!loading && !error && <Main results={results} />}
      </>
    );
  }
}
