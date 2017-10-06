import Document, { Head, Main, NextScript } from 'next/document';
import flush from 'styled-jsx/server';
import Header from '../components/Header';
import Footer from '../components/Footer';

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
          <link rel="stylesheet" href="/static/app.css" />
          <script dangerouslySetInnerHTML={{ __html: `console.log('GET ENV'); window.env = ${JSON.stringify(process.env)}` }}/>
        </Head>
        <body>
          <Header />
          <Main />
          <NextScript />
          <Footer />
        </body>
      </html>
    );
  }
}
