import BackendAPIController from "../../controller/api/api";

class Audiocall {
  groups: number[] | string[];
  id: string; //need to make separate method for getting userID in API

  constructor() {
    this.groups = [0, 1, 2, 3, 4, 5];
    this.id = '630244fcbe44cf0016ddcae9';
  }

  async getDataSet(group: number) {
    await BackendAPIController.getAllAggregatedWords(this.id, Math.floor(Math.random() * 30), group, 8)
    .then((req) => console.log(req));
  }

  async makeFakeWords(group: number | null) {
    let wrongGroup = 0;
    do {
      wrongGroup = Math.floor(Math.random() * 5);
    } while (wrongGroup === group)
    await BackendAPIController.getAllWords(Math.floor(Math.random() * 30), wrongGroup).then(res => console.log(res))
  }

  startGame() {
    
  }

  //при переходе из учебника должен работать этот метод
  textbookStartGame(startTheGame: string) {
    return ``;
  }

  initGame() {
    setTimeout(() => {
      document.querySelector('.group_of_words')?.addEventListener('click', (event) => {this.makeFakeWords(Number((event.target as HTMLElement).dataset.value))});
    }, 0);
   
    return `
    <h2>Audiocall</h2>
    <p>Тренировка Аудиовызов развивает словарный запас. Вы должны выбрать перевод услышанного слова. Выберите сложность от 1 до 6:</p>
    <ul class="group_of_words">
      ${this.groups.map((el) => 
        `<li class="group_of_words__elem" data-value=${el}>${el}</li>`
      ).join('')}
    </ul>
    `
  }

  render(startTheGame: string) {
    return `<div class="audiocall__game">${startTheGame ? this.textbookStartGame(startTheGame) : this.initGame()}</div>`;
  }
}

export default Audiocall;