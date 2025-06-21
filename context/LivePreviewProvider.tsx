'use client'

import { ContentfulLivePreviewProvider } from '@contentful/live-preview/react'
import React from 'react'

type LivePreviewProviderProps = {
  isEnabled?: boolean
  children: React.ReactNode
}

const LivePreviewProvider = ({
  children,
  isEnabled,
}: LivePreviewProviderProps) => {
  return (
    <ContentfulLivePreviewProvider
      locale='sv-SE'
      enableInspectorMode={isEnabled}
      enableLiveUpdates={isEnabled}
      targetOrigin='https://app.eu.contentful.com'
    >
      {children}
    </ContentfulLivePreviewProvider>
  )
}

export default LivePreviewProvider
