import React, { ErrorInfo, ReactNode } from "react";

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  public static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught runtime error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[100dvh] flex flex-col items-center justify-center bg-[#050D1A] text-slate-100 p-6 selection:bg-[#C5A059]/20 font-sans">
          <div className="max-w-md w-full bg-slate-900/50 backdrop-blur-md p-8 rounded-2xl border border-slate-800 text-center space-y-6">
            <h2 className="text-[#C5A059] text-sm tabular-nums tracking-widest uppercase font-mono mb-2">System Interruption</h2>
            <h1 className="text-2xl sm:text-3xl font-display font-medium text-slate-100">Application Recovering</h1>
            <p className="text-slate-400 font-light text-sm leading-relaxed">
              We encountered an unexpected presentation error. Please refresh the page to restore connectivity and continue.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="inline-flex items-center justify-center px-6 py-3 bg-[#C5A059] text-[#0A192F] font-bold text-sm tracking-wide rounded hover:bg-[#D4AF37] transition-all duration-300 w-full"
            >
              Reload Session
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
