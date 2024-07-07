import { Layout } from './components/layout';
import { Error } from './components/error';
import { ErrorBoundary } from './components/error-boundary';
import './styles/main.css';

function App() {
  return (
    <ErrorBoundary
      fallback={
        <Error
          message={'Oops! Something went wrong... ☹️'}
          handleRefresh={() => window.location.reload()}
        />
      }
    >
      <Layout />
    </ErrorBoundary>
  );
}

export default App;
