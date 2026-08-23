import { Component, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

// Catches any uncaught render error (e.g. a stale JS chunk after a new
// deploy) so the site shows a recoverable message instead of going blank.
export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 px-5 text-center">
          <p className="font-sans text-base text-[#4b5563]">
            Algo no ha cargado bien. Prueba a recargar la página.
          </p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="px-6 py-2.5 rounded-full text-white font-display font-medium text-sm"
            style={{ background: '#42767f' }}
          >
            Recargar
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
