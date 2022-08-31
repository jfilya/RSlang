import Audiocall from './audiocall';
import SprintGame from './sprintgame';

//  must have render method
class Game {
  audiocall() {
    const initialize = new Audiocall();
    const workPages = document.querySelector('.work') as HTMLElement;
    workPages.innerHTML = initialize.render(null);
  }

  sprintgame() {
    const initialize = new SprintGame();
    const workPages = document.querySelector('.work') as HTMLElement;
    workPages.innerHTML = initialize.render(null);
  }

  sectionGame(): string {
    setTimeout(() => {
      document.querySelector('.audiocall__btn')?.addEventListener('click', () => {
        this.audiocall();
      });
      document.querySelector('.sprintgame__btn')?.addEventListener('click', () => {
        this.sprintgame();
      });
    }, 0);
    return `
        <h3 class="games__title">Мини игры</h3>
        <div class="games">
          <button class="game__btn audiocall__btn">Аудиовызов</button>
          <button class="game__btn sprintgame__btn">Спринт</button>
        </div>
        `;
  }
}
export default Game;
