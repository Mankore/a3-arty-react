import { createGlobalStyle } from "styled-components";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

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

    .leaflet-container {
        cursor: url("data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 40 40' preserveAspectRatio='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cline x1='0' y1='0' x2='0' y2='15' stroke='red' stroke-width='4' /%3E%3Cline x1='0' y1='0' x2='15' y2='0' stroke='red' stroke-width='4' /%3E%3Cline x1='40' y1='0' x2='40' y2='15' stroke='red' stroke-width='4' /%3E%3Cline x1='40' y1='0' x2='25' y2='0' stroke='red' stroke-width='4' /%3E%3Cline x1='0' y1='40' x2='15' y2='40' stroke='red' stroke-width='4' /%3E%3Cline x1='0' y1='40' x2='0' y2='25' stroke='red' stroke-width='4' /%3E%3Cline x1='40' y1='40' x2='25' y2='40' stroke='red' stroke-width='4' /%3E%3Cline x1='40' y1='40' x2='40' y2='25' stroke='red' stroke-width='4' /%3E%3Ccircle cx='20' cy='20' r='2' fill='tomato' /%3E%3C/svg%3E") 15 15, auto;	
    }

    .leaflet-dragging .leaflet-grab {
        cursor: url("data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 40 40' preserveAspectRatio='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cline x1='0' y1='0' x2='0' y2='15' stroke='yellow' stroke-width='4' /%3E%3Cline x1='0' y1='0' x2='15' y2='0' stroke='yellow' stroke-width='4' /%3E%3Cline x1='40' y1='0' x2='40' y2='15' stroke='yellow' stroke-width='4' /%3E%3Cline x1='40' y1='0' x2='25' y2='0' stroke='yellow' stroke-width='4' /%3E%3Cline x1='0' y1='40' x2='15' y2='40' stroke='yellow' stroke-width='4' /%3E%3Cline x1='0' y1='40' x2='0' y2='25' stroke='yellow' stroke-width='4' /%3E%3Cline x1='40' y1='40' x2='25' y2='40' stroke='yellow' stroke-width='4' /%3E%3Cline x1='40' y1='40' x2='40' y2='25' stroke='yellow' stroke-width='4' /%3E%3Ccircle cx='20' cy='20' r='2' fill='yellow' /%3E%3C/svg%3E") 15 15, auto;
    }
`;
