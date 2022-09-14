import marked from "marked";
import { sanitizeHtml } from "./sanitizer";
import { ParsedRequest } from "./types";
const twemoji = require("twemoji");
const twOptions = { folder: "svg", ext: ".svg" };
const emojify = (text: string) => twemoji.parse(text, twOptions);

function getCss() {
  return `@import url("https://fonts.googleapis.com/css?family=Roboto+Slab");
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
  .emoji {
    width: 8rem;
    height: 8rem;
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
    width: 13rem;
    height: 13rem;
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
    font-family: "Roboto Slab", sans-serif;
    font-size: 7rem;
    font-style: normal;
    margin-top: 0;
    color: #fff;
    max-width: 80rem
  }
  
  .credit {
      font-family: "Roboto Slab", sans-serif;
    font-size: 1.7rem;
    font-style: normal;
    margin-top: 3rem;
    color: #fff;
  }`;
}

export function getHtml(parsedReq: ParsedRequest) {
  const { text, md } = parsedReq;
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
              <img src="https://blog.clark.today/me_macbook.png" alt="">
            </div>
            <div class="spacer">
            <div class="heading">
            ${emojify(md ? marked(text) : sanitizeHtml(text))}
            </div>
              <div class="credit">Blog.Clark.Today/</div>
        </div>
    </body>
</html>

`;
}
