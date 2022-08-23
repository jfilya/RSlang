import Page from '../page';
import Book from '../pages/book';
import Game from '../pages/game';
import Home from '../pages/home';
import Statistic from '../pages/statistic';

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
    const authorizationLink = document.querySelector('.authorization') as HTMLElement;
    const bookLink = document.querySelector('.book') as HTMLElement;
    const gameLink = document.querySelector('.game') as HTMLElement;
    const statisticLink = document.querySelector('.statistic') as HTMLElement;
    homeLink.onclick = () => {
      this.home.startPage();
    };
    authorizationLink.onclick = () => {
      console.log('authorization');
    };
    bookLink.onclick = () => {
      const workPages = document.querySelector('.work') as HTMLElement;
      workPages.innerHTML = this.book.sectionBook();
    };
    gameLink.onclick = () => {
      const workPages = document.querySelector('.work') as HTMLElement;
      workPages.innerHTML = this.game.sectionGame();
    };
    statisticLink.onclick = () => {
      const workPages = document.querySelector('.work') as HTMLElement;
      workPages.innerHTML = this.statistic.sectionStatistic();
    };
  }
}
export default Menu;
