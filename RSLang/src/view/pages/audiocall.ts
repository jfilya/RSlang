import BackendAPIController from "../../controller/api/api";
import { IWord } from "../../controller/api/interfaces";
import { generateWordsForGame } from "../../utils/wordsGenerationForAudiocall";

export interface IAudioCallGame {
  translation: string,
  audioDescription: string,
  fakeWords: string[],
  rightOrWrong: boolean
}

class Audiocall {
  groups: number[] | string[];
  id: string; //need to make separate method for getting userID in API
  container: HTMLElement;

  constructor() {
    this.groups = [0, 1, 2, 3, 4, 5];
    this.id = '630244fcbe44cf0016ddcae9';
    this.container = null as unknown as HTMLElement;
  }

  async getDataSet(group: number) {
    return await BackendAPIController.getAllAggregatedWords(this.id, Math.floor(Math.random() * 30), group, 8)
    .then((req) => req);
  }

  async makeFakeWords(group: number | null) {
    let wrongGroup = 0;
    do {
      wrongGroup = Math.floor(Math.random() * 5);
    } while (wrongGroup === group)
    return await BackendAPIController.getAllWords(Math.floor(Math.random() * 30), wrongGroup).then(req => req);
  }

  startGame(realWords: IWord[], fakeWords: IWord[]) {
    let hearts = 5;
    const wordsForGame = realWords.map(word => generateWordsForGame(word, fakeWords));
    this.container.innerHTML = `
    <div class="hearts">
      ${[...Array(5)].map((e, i) => `<div class="heart ${i < hearts ? "heart__active" : ""}"></div>`)}
    </div>
    <button class="audio__btn">Повтор звука</button>
    `
  }

  //при переходе из учебника должен работать этот метод
  textbookStartGame(startTheGame: string) {
    return ``;
  }

  initGame() {
    setTimeout(() => {
      document.querySelector('.group_of_words')?.addEventListener('click', async (event) => {const group = Number((event.target as HTMLElement).dataset.value); const fakeWords = await this.makeFakeWords(group); const realWords = await this.getDataSet(group); this.startGame(realWords as IWord[], fakeWords)});
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
    setTimeout(() => {
      this.container = document.querySelector('.audiocall__game') as HTMLElement;
    }, 0);
    return `<div class="audiocall__game">${startTheGame ? this.textbookStartGame(startTheGame) : this.initGame()}</div>`;
  }
}

export default Audiocall;