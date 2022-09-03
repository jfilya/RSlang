import './scss/global.scss';
import Menu from './view/components/menu';
import Page from './view/page';
// import { BackendAPIController } from './controller/api/api';
import Login from './view/components/login';

// BackendAPIController.signIn('mail@mail.ru', 'aokadadadsljhgugvguuvuu')
//   .then(() => BackendAPIController.getAllWords(0, 0));

const page = new Page();
page.root();
const menu = new Menu();
menu.buildPages();
menu.active();
menu.windowLocationLoad();
const login = new Login();
login.createLoginPopup();
