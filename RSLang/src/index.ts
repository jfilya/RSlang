import './scss/global.scss';
import Menu from './view/components/menu';
import Page from './view/page';

BackendAPIController.signIn('mail@mail.ru', 'aokadadadsljhgugvguuvuu')
  .then(() => BackendAPIController.getAllWords(0, 0));
import Login from './view/components/login';

const page = new Page();
page.root();
const menu = new Menu();
menu.buildPages();
menu.active();
menu.windowLocationLoad();
const login = new Login();
login.createLoginPopup();
