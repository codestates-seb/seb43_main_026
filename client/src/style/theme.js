const size = {
  mobile: '767px',
  tablet: '1023px',
  desktop: '1024px',
};
const breakpoints = {
  mobileMax: `screen and (max-width: ${size.mobile})`,
  tabletMax: `screen and (max-width: ${size.tablet})`,
  desktopMin: `screen and (min-width: ${size.desktop})`,
};
const widthSize = {
  navbar: '164px',
  contentMax: '1264px',
  sidebar: '298px',
};
const color = {
  bg: '#FFFFFF',
  main_blue: `#85B6FF`,
  main_blue_hover: `#5d9afd`,
  main_blue_active: `#3773fa`,
  main_dark_blue: `#2C599B`,
  main_gray: `#f2f3f7`,
  bg_light_blue: `#F0F9FF`,
  bg_blue: `rgba(228, 235, 244, 1)`,
  bg_dark: `rgba(67, 67, 67, 0.5)`,
  bg_place: `#c8d3e1`,
  bg_comment: `rgba(201, 214, 233, 0.5)`,
  bg_comment_btn: `C8D3E1`,
  font_comment: `#696969`,
  font_post_title: `#434446`,
  font_forget_pw: `#2592FF`,
  pc_bg: `#FAFAFA`,
};

const theme = {
  breakpoints,
  color,
  widthSize,
  size,
};

export default theme;
