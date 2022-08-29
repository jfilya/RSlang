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
  }

  main(): string {
    return `
        ${this.header.header()}
        <section class="work">
        </section>
        ${this.footer.footer()}
        `;
  }
}
export default Page;
