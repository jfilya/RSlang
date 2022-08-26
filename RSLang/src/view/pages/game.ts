import Audiocall from './audiocall';

//  must have render method
class Game {
  selectGame(game: Audiocall) {
    const initialize = new game();
    const workPages = document.querySelector('.work') as HTMLElement;
    workPages.innerHTML = initialize.render();
  }

  audiocall() {
    this.selectGame(Audiocall);
  }

  sectionGame(): string {
    setTimeout(() => {
      document.querySelector('.audiocall__btn')?.addEventListener('click', () => {
        this.audiocall();
      });
    }, 0);
    return `
        <h3>Мини игры</h3>
        <button class="audiocall__btn">Аудиовызов</button>
        `;
  }
}
export default Game;
