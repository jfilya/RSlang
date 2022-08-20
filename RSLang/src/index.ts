import './scss/global.scss';
import Menu from './utils/menu';
import Page from './view/pages/page';

const page = new Page();
page.root();
const menu = new Menu();
menu.buildPages();
menu.active();
