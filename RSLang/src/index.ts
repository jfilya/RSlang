import './scss/global.scss';
import BackendAPIController from './controller/api/api';
import Menu from './view/components/menu';
import Page from './view/page';
import Login from './view/components/login';


const page = new Page();
page.root();
const menu = new Menu();
menu.buildPages();
menu.active();
const login = new Login();
login.createLoginPopup();
