"use client"

import React, { Component, ErrorInfo, ReactNode } from "react"
import { AlertCircle } from "lucide-react"

interface Props {
  children?: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  }

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo)
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }
      return (
        <div className="flex flex-col items-center justify-center p-6 text-foreground/50 border border-white/5 rounded-xl bg-white/5">
          <AlertCircle className="mb-2 opacity-50" />
          <p className="text-sm">Could not load content.</p>
        </div>
      )
    }

    return this.props.children
  }
}
