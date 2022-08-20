import Page from '../view/pages/page';

class Menu {
  aside: HTMLElement;

  home: HTMLElement;

  authorization: HTMLElement;

  book: HTMLElement;

  game: HTMLElement;

  statistic: HTMLElement;

  page: Page;

  constructor() {
    this.aside = document.querySelector('.aside') as HTMLElement;
    this.home = document.querySelector('.home') as HTMLElement;
    this.authorization = document.querySelector('.authorization') as HTMLElement;
    this.book = document.querySelector('.book') as HTMLElement;
    this.game = document.querySelector('.game') as HTMLElement;
    this.statistic = document.querySelector('.statistic') as HTMLElement;
    this.page = new Page();
  }

  active(): void {
    const menuBtn = document.querySelector('.root__burger') as HTMLImageElement;
    menuBtn.onclick = () => {
      this.aside.classList.toggle('burger-active');
    };
  }

  buildPages(): void {
    this.home.onclick = () => {
      this.page.startPage();
    };
    this.authorization.onclick = () => {
      console.log('authorization');
    };
    this.book.onclick = () => {
      const workPages = document.querySelector('.work') as HTMLElement;
      workPages.innerHTML = this.page.sectionBook();
    };
    this.game.onclick = () => {
      const workPages = document.querySelector('.work') as HTMLElement;
      workPages.innerHTML = this.page.sectionGame();
    };
    this.statistic.onclick = () => {
      const workPages = document.querySelector('.work') as HTMLElement;
      workPages.innerHTML = this.page.sectionStatistic();
    };
  }
}
export default Menu;
