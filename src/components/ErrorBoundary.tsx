import React from "react";

interface IState {
  hasError: boolean;
  error: any;
}

export class ErrorBoundary extends React.Component<{}, IState> {
  public state: IState = { hasError: false, error: null };

  static getDerivedStateFromError(error: any) {
    return { hasError: true, error };
  }

  componentDidCatch(error: any, info: any) {
    console.log(error, info);
  }

  render() {
    if (this.state.error) {
      debugger;
    }
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}
