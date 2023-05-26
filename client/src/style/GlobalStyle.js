import { createGlobalStyle } from 'styled-components';

// reset.css
const GlobalStyle = createGlobalStyle`
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video, input,textarea {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	box-sizing: border-box;
	font: inherit;
	vertical-align: baseline;

	-webkit-user-select: none;
	-moz-user-select: none;
	-ms-user-select: none;
	user-select: none;
	
}

span, h1, h2, h3, h4, h5, h6, p, button{
	color: #393939;
}

/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
	display: block;
}
html {
	font-family: -apple-system, "system-ui", Segoe UI, BlinkMacSystemFont
    Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
    sans-serif;
	height: 100vh;
	::-webkit-scrollbar {
  width: 0;
  background-color: transparent;
}

}

body {
	line-height: 1;
	font-family: Pretendard;
	height: 100vh;
}
ol, ul {
	list-style: none;
}
blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
}

a {
	text-decoration: none;
	color: inherit;
}

`;

export default GlobalStyle;
