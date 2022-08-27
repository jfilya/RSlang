import Page from '../page';
import Book from '../pages/book';
import Game from '../pages/game';
import Home from '../pages/home';
import Statistic from '../pages/statistic';
import BackendAPIController from '../../controller/api/api';
import { IWord } from '../../controller/api/interfaces';

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
      if (window.innerWidth <= 670) {
        this.aside.classList.remove('burger-active');
      }
    };
    authorizationLink.onclick = () => {
      console.log('authorization');
      if (window.innerWidth <= 670) {
        this.aside.classList.remove('burger-active');
      }
    };
    bookLink.onclick = async () => {
      const workPages = document.querySelector('.work') as HTMLElement;
      workPages.innerHTML = this.book.sectionBook();
      this.book.bookItem(await BackendAPIController.getAllWords(0, 0) as unknown as IWord[]);
      this.book.pagination(0);
      if (window.innerWidth <= 670) {
        this.aside.classList.remove('burger-active');
      }
    };
    gameLink.onclick = () => {
      const workPages = document.querySelector('.work') as HTMLElement;
      workPages.innerHTML = this.game.sectionGame();
      if (window.innerWidth <= 670) {
        this.aside.classList.remove('burger-active');
      }
    };
    statisticLink.onclick = () => {
      const workPages = document.querySelector('.work') as HTMLElement;
      workPages.innerHTML = this.statistic.sectionStatistic();
      if (window.innerWidth <= 670) {
        this.aside.classList.remove('burger-active');
      }
    };
  }
}
export default Menu;
