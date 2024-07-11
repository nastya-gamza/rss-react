import { Layout } from './components/Layout';
import { Error } from './components/Error';
import { ErrorBoundary } from './components/ErrorBoundary';
import './styles/main.css';

function App() {
  return (
    <ErrorBoundary
      fallback={
        <Error
          message={'Oops! Something went wrong...'}
          btnText={'Try again'}
          handleRefresh={() => window.location.reload()}
        />
      }
    >
      <Layout />
    </ErrorBoundary>
  );
}

export default App;
