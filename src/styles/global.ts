import { createGlobalStyle } from "styled-components";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import cursorSvg from "../assets/svg/a3_cursor.svg";

// Credit: https://www.joshwcomeau.com/css/custom-css-reset/
export default createGlobalStyle`
    *, *::before, *::after {
        box-sizing: border-box;
    }

    * {
        margin: 0;
    }

    html, body {
        height: 100%;
    }

    body {
    line-height: 1.5;
        -webkit-font-smoothing: antialiased;
    }

    img, picture, video, canvas, svg {
        display: block;
        max-width: 100%;
    }

    input, button, textarea, select {
        font: inherit;
    }

    p, h1, h2, h3, h4, h5, h6 {
        overflow-wrap: break-word;
    }

    div.leaflet-bottom.leaflet-right {
        display: none !important;
    }

    .leaflet-touch {
        cursor: url(${cursorSvg}) 15 15, auto;	
    }
`;
