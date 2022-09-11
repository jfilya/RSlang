import Page from '../page';
import Book from '../pages/book';
import Game from '../pages/game';
import Home from '../pages/home';
import Statistic from '../pages/statistic';
import Footer from './footer';

class Menu {
  aside: HTMLElement;

  home: Home;

  book: Book;

  game: Game;

  statistic: Statistic;

  page: Page;

  constructor() {
    this.aside = document.querySelector('.aside') as HTMLElement;
    this.home = new Home();
    this.book = new Book();
    this.game = new Game();
    this.statistic = new Statistic();
    this.page = new Page();
  }

  active(): void {
    const menuBtn = document.querySelector('.root__burger') as HTMLImageElement;
    menuBtn.onclick = () => {
      this.aside.classList.toggle('burger-active');
    };
  }

  buildPages(): void {
    const homeLink = document.querySelector('.home') as HTMLElement;
    const bookLink = document.querySelector('.book') as HTMLElement;
    const gameLink = document.querySelector('.game') as HTMLElement;
    const statisticLink = document.querySelector('.statistic') as HTMLElement;
    homeLink.onclick = () => {
      window.location.href = `${window.location.pathname}`;
      this.home.startPage();
      if (window.innerWidth <= 670) {
        this.aside.classList.remove('burger-active');
      }
    };
    bookLink.onclick = () => {
      window.location.href = `${window.location.pathname}?/book`;
      this.windowLocationLoad();
    };
    gameLink.onclick = () => {
      window.location.href = `${window.location.pathname}?/game`;
      this.windowLocationGame();
    };
    statisticLink.onclick = () => {
      window.location.href = `${window.location.pathname}?/statistic`;
      this.windowLocationStatistic();
    };
  }

  windowLocationLoad(): void {
    this.windowLocationBook();
    this.windowLocationStatistic();
    this.windowLocationGame();
    if (window.innerWidth <= 670) {
      this.aside.classList.remove('burger-active');
    }
    new Footer().displayFooter();
  }

  windowLocationBook(): void {
    if (window.location.href.includes('book')) {
      const workPages = document.querySelector('.work') as HTMLElement;
      workPages.innerHTML = this.book.sectionBook();
      this.book.pagination();
      this.book.chooseWordDifficulty();
    }
  }

  windowLocationStatistic(): void {
    if (window.location.href.includes('statistic')) {
      const workPages = document.querySelector('.work') as HTMLElement;
      workPages.innerHTML = this.statistic.sectionStatistic();
    }
  }

  windowLocationGame(): void {
    if (window.location.href.includes('game')) {
      const workPages = document.querySelector('.work') as HTMLElement;
      workPages.innerHTML = this.game.sectionGame();
    }
  }
}
export default Menu;
