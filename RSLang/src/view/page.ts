import checkAutorization from '../utils/checkAutorization';
import Aside from './components/aside';
import Footer from './components/footer';
import Header from './components/header';
import Home from './pages/home';

class Page {
  body: HTMLBodyElement;

  header: Header;

  footer: Footer;

  aside: Aside;

  home: Home;

  constructor() {
    this.body = document.querySelector('.body') as HTMLBodyElement;
    this.header = new Header();
    this.footer = new Footer();
    this.aside = new Aside();
    this.home = new Home();
  }

  root(): void {
    const root = document.createElement('div');
    root.className = 'root';
    this.body.append(root);
    root.innerHTML += this.aside.aside();
    const main = document.createElement('div');
    main.className = 'main';
    root.append(main);
    main.innerHTML = this.main();
    this.home.startPage();
    this.header.logout();
  }

  main(): string {
    return `
        ${this.header.header()}
        <section class="work">
        </section>
        ${this.footer.footer()}
        `;
  }

  async authorizationCheak() {
    const loginBtn = document.querySelector('.header__register');
    const logoutBtn = document.querySelector('.header__logout');
    if (await checkAutorization()) {
      loginBtn?.classList.add('header_hidden');
      logoutBtn?.classList.remove('header_hidden');
    } else {
      loginBtn?.classList.remove('header_hidden');
      logoutBtn?.classList.add('header_hidden');
    }
  }
}
export default Page;
