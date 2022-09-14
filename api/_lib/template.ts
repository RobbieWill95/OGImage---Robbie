import marked from 'marked'
import { sanitizeHtml } from './sanitizer'
import { ParsedRequest } from './types'
const twemoji = require('twemoji')
const twOptions = { folder: 'svg', ext: '.svg' }
const emojify = (text: string) => twemoji.parse(text, twOptions)

function getCss() {

  return `@import url("https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;700&display=swap");
  @font-face {
    font-family: "Inter";
    font-style: normal;
    font-weight: normal;
    src: url(data:font/woff2;charset=utf-8;base64,bold) format("woff2");
  }
  @font-face {
    font-family: "Inter";
    font-style: normal;
    font-weight: bold;
    src: url(data:font/woff2;charset=utf-8;base64,bold) format("woff2");
  }
  @font-face {
    font-family: "Vera";
    font-style: normal;
    font-weight: normal;
    src: url(data:font/woff2;charset=utf-8;base64,mono}) format("woff2");
  }
  body {
    background: #000;
    background-image: radial-gradient(
        circle at 25px 25px,
        dimgray 2%,
        transparent 0%
      ),
      radial-gradient(circle at 75px 75px, dimgray 2%, transparent 0%);
    background-size: 100px 100px;
    height: 100vh;
    display: flex;
    text-align: center;
    align-items: center;
    justify-content: center;
  }
  code {
    color: #d400ff;
    font-family: "Vera";
    white-space: pre-wrap;
    letter-spacing: -5px;
  }
  code:before,
  code:after {
    content: "\`";
  }
  .logo-wrapper {
    display: block;
    text-align: center;
    align-items: center;
    align-content: center;
    justify-content: center;
    justify-items: center;
  }
  .logo {
    margin: 0 75px;
  }
  .plus {
    color: #bbb;
    font-family: Times New Roman, Verdana;
    font-size: 100px;
  }
  .spacer {
    margin: 25px;
  }
  
  .heading {
    font-family: "Noto Sans SC", "Inter", sans-serif;
    font-size: 4rem;
    font-style: normal;
    margin-top: 0;
    color: #fff;
    max-width: 80rem
  }
  
  .credit {
      font-family: "Noto Sans SC", "Inter", sans-serif;
    font-size: 1rem;
    font-style: normal;
    margin-top: 3rem;
    color: #fff;
  }`
}

export function getHtml(parsedReq: ParsedRequest) {
  const { text, md} = parsedReq
  return `<!DOCTYPE html>
<html>
    <meta charset="utf-8">
    <title>Generated Image</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
    ${getCss()}
    </style>
    <body>
        <div>
            <div class="spacer">
            <div class="logo-wrapper">
              <img src="https://blog.clark.today/_next/image?url=%2Fme_macbook.png&w=96&q=75" alt="">
            </div>
            <div class="spacer">
            <div class="heading">
            ${emojify(
              md ? marked(text) : sanitizeHtml(text)
            )}
            </div>
              <div class="credit">Blog.Clark.Today/</div>
        </div>
    </body>
</html>

`
}
