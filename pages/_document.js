import Document, { Head, Main, NextScript } from 'next/document';
import flush from 'styled-jsx/server';

export default class MyDocument extends Document {
  static getInitialProps({ renderPage }) {
    const { html, head, errorHtml, chunks } = renderPage();
    const styles = flush();
    return { html, head, errorHtml, chunks, styles };
  }

  render() {
    return (
      <html>
        <Head>
          <title>corp-check</title>
          <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.12/semantic.min.css" />
          <link rel="stylesheet" href="/static/styles.css" />
        </Head>
        <body>
          <Main />
          <NextScript />
          <script dangerouslySetInnerHTML={{ __html: `window.env = ${JSON.stringify(process.env)}` }}/>
        </body>
      </html>
    );
  }
}
