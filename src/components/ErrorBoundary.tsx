// ============================================================
// SevaPath — Error Boundary Component
// ============================================================

import { Component, type ReactNode, type ErrorInfo } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('SevaPath ErrorBoundary caught:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[60vh] flex items-center justify-center p-6 text-center">
          <div className="max-w-md">
            <div className="w-16 h-16 rounded-2xl bg-[#F1EDE4] flex items-center justify-center mx-auto mb-4">
              <AlertTriangle size={28} className="text-[#B85F45]" />
            </div>
            <h1 className="text-xl font-bold text-[#151719] mb-2">Something went wrong</h1>
            <p className="text-sm text-[#728477] mb-6">
              An unexpected error occurred. Your saved data is safe.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#B85F45] text-white font-bold text-sm hover:opacity-90 transition-all"
            >
              <RefreshCw size={15} />
              Reload Page
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
