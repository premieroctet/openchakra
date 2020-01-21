import React from 'react';
import PropTypes from 'prop-types';
import Document, { Head, Main, NextScript } from 'next/document';
// eslint-disable-next-line import/no-extraneous-dependencies
import flush from 'styled-jsx/server';
import { ServerStyleSheet } from 'styled-components';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    let pageContext;
    const page = ctx.renderPage((Component) => {
      const WrappedComponent = (props) => {
        // eslint-disable-next-line prefer-destructuring
        pageContext = props.pageContext;
        return <Component {...props} />;
      };

      WrappedComponent.propTypes = {
        // eslint-disable-next-line react/forbid-prop-types
        pageContext: PropTypes.object.isRequired,
      };

      return WrappedComponent;
    });

    let css;
    if (pageContext) {
      css = pageContext.sheetsRegistry.toString();
    }
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;
    try {
      ctx.renderPage = () => originalRenderPage({
        enhanceApp: App => props => sheet.collectStyles(<App {...props} />),
      });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        ...page,
        pageContext,
        styles: (
          <React.Fragment>
            <style
              id="jss-server-side"
                // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{ __html: css }}
            />
            {initialProps.styles}
            {sheet.getStyleElement()}
            {flush() || null}
          </React.Fragment>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    const { pageContext } = this.props;

    return (
      <html lang="en" dir="ltr" xmlns:og="http://ogp.me/ns#">
        <Head>
          <meta charSet="utf-8" />
          {/* Use minimum-scale=1 to enable GPU rasterization */}
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
          />
          {/* PWA primary color */}
          <meta
            name="theme-color"
            content={pageContext ? pageContext.theme.palette.primary.main : null}
          />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}

export default MyDocument;
