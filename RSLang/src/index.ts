import './scss/global.scss';
import BackendAPIController from './controller/api/api';
import Menu from './view/components/menu';
import Page from './view/page';
import Login from './view/components/login';

BackendAPIController.signIn('mail@mail.ru', 'aokadadadsljhgugvguuvuu')
  .then(() => BackendAPIController.getAllWords(0, 0)
  // eslint-disable-next-line
    .then((res) => console.log(res)));

const page = new Page();
page.root();
const menu = new Menu();
menu.buildPages();
menu.active();
const login = new Login();
login.createLoginPopup();
