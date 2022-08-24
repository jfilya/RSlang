import './scss/global.scss';
import Menu from './view/components/menu';
import Page from './view/page';

const page = new Page();
page.root();
const menu = new Menu();
menu.buildPages();
menu.active();
