class Menu {
  aside: HTMLElement;

  constructor() {
    this.aside = document.querySelector('.aside') as HTMLElement;
  }

  active(): void {
    const menuBtn = document.querySelector('.root__burger') as HTMLImageElement;
    menuBtn.onclick = () => {
      this.aside.classList.toggle('burger-active');
    };
  }
}
export default Menu;
