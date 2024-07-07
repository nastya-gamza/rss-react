import React, { Component } from 'react';
import { PrimaryButton } from '../primary-button';

interface TestErrorState {
  throwError: boolean;
}

export class TestError extends Component<null, TestErrorState> {
  state: TestErrorState = {
    throwError: false,
  };

  handleClick = () => {
    this.setState({ throwError: true });
  };

  render() {
    if (this.state.throwError) {
      throw new Error('Testing error boundary');
    }

    return <PrimaryButton onClick={this.handleClick}>Throw Error</PrimaryButton>;
  }
}
