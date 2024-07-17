import { Component, ReactNode } from 'react';
import { render, screen } from '@testing-library/react';
import { ErrorBoundary } from './ErrorBoundary.tsx';

interface ErrorBoundaryProps {
  fallback?: ReactNode;
  children?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorThrowingComponent extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  componentDidMount() {
    throw new Error('Test error');
  }

  render() {
    return null;
  }
}

describe('ERROR_BOUNDARY TEST', () => {
  test('should display fallback UI when a child component throws an error', () => {
    const fallbackUI = 'Something went wrong.';

    render(
      <ErrorBoundary fallback={fallbackUI}>
        <ErrorThrowingComponent />
      </ErrorBoundary>,
    );

    expect(screen.getByText(fallbackUI)).toBeInTheDocument();
  });

  test('should render children when no error is thrown', () => {
    const childText = 'No errors here!';

    render(
      <ErrorBoundary fallback='Error!'>
        <div>{childText}</div>
      </ErrorBoundary>,
    );

    expect(screen.getByText(childText)).toBeInTheDocument();
  });
});
