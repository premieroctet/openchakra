import React from 'react'
import Head from 'next/head'

const Metadata = ({
  metaTitle = 'Wappizy', 
  metaName = 'Wappizy', 
  metaDescription = 'Visual editor for Chakra UI', 
  metaUrl = 'Visual editor for Chakra UI', 
  metaImageUrl = 'https://openchakra.app/images/og-graph-color.png',
  metaFavicon32 = '/favicon.png',
  metaGaTag=null,
}: {
  metaTitle?: string,
  metaName?: string,
  metaDescription?: string
  metaUrl?: string
  metaImageUrl?: string
  metaFavicon32?: string
  metaGaTag?: string | null
}) => {
  return (
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#000000" />
      <meta name="description" content={metaDescription} />
      {/* <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      /> */}
      <link rel="icon" type="image/png" sizes="32x32" href={metaFavicon32} />
      <link rel="manifest" href="/site.webmanifest" />
      <meta name="msapplication-TileColor" content="#da532c" />
      <meta name="theme-color" content="#ffffff" />

      <title>{metaTitle}</title>
      <meta
        name="image"
        content={metaImageUrl}
      />

      {/* OpenGraph tags */}
      <meta property="og:url" content={metaUrl} />
      <meta property="og:site_name" content={metaName} />
      <meta property="og:title" content={metaTitle} />
      <meta
        property="og:description"
        content={metaDescription}
      />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="600" />
      <meta property="og:type" content="website" />
      <meta
        property="og:image:url"
        content={metaImageUrl}
      />
      {metaGaTag && (
        <>
        <script async={true} src={`https://www.googletagmanager.com/gtag/js?id=${metaGaTag}`} />
        <script>{`window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', '${metaGaTag}'); `}</script>
        </>
      )}
      
    </Head>
  )
}

export default Metadata
