import React from 'react'
import Head from 'next/head'

const Metadata = () => {
  return (
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#000000" />
      <meta name="description" content="Visual editor for Chakra UI " />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <link rel="manifest" href="/site.webmanifest" />
      <meta name="msapplication-TileColor" content="#da532c" />
      <meta name="theme-color" content="#ffffff" />

      <title>OpenChakra</title>
      <meta
        name="description"
        content="React JSX visual editor for Chakra UI"
      />
      <meta
        name="image"
        content="https://openchakra.app/images/og-graph-color.png"
      />

      {/* OpenGraph tags */}
      <meta property="og:url" content="https://openchakra.app" />
      <meta property="og:site_name" content="OpenChakra" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content="OpenChakra" />
      <meta
        property="og:description"
        content="OpenChakra is a visual editor for React based on Chakra UI"
      />
      <meta
        property="og:image"
        name="twitter:image"
        content="https://openchakra.app/images/og-graph-color.png"
      />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="600" />

      {/* Twitter Card tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="OpenChakra" />
      <meta
        name="twitter:description"
        content="OpenChakra is a visual editor for React based on Chakra UI"
      />
      <meta
        name="twitter:image"
        content="https://openchakra.app/images/og-graph-color.png"
      />

      <meta property="og:title" content="OpenChakra" />
      <meta
        property="og:description"
        content="OpenChakra is a visual editor for React based on Chakra UI"
      />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://openchakra.app" />
      <meta
        property="og:image:url"
        content="https://openchakra.app/images/og-graph-color.png"
      />
    </Head>
  )
}

export default Metadata
