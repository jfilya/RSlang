import { BackendAPIController, BASE_URL } from '../../controller/api/api';
import { IWord } from '../../controller/api/interfaces';

export interface ISprintWord {
  audio: string,
  word: string,
  transcription: string,
  currentTranslate: string,
  correctTranslate: string,
  rightOrWrong: boolean
}

interface IGameConfig {
  points: number;
  currentLamps: number;
  allLamps: number;
  currentBirds: number;
  allBirds: number;
  currentTime: number;
  currentLevel: number,
  wordsForGame: ISprintWord[];
}

const startGameConfig = {
  points: 0,
  currentLamps: 0,
  allLamps: 3,
  currentBirds: 1,
  allBirds: 4,
  currentTime: 60,
  currentLevel: 0,
  wordsForGame: [],
};

const url = `${BASE_URL}/`;

export default class SprintGame {
  groups: number[] | string[] = [0, 1, 2, 3, 4, 5];

  container: HTMLElement = null as unknown as HTMLElement;

  gameConfig: IGameConfig = { ...startGameConfig };

  async getDataSet(group: number) {
    const req = (await Promise.all(Array(6).fill(0).map(() => 
      BackendAPIController.getAllAggregatedWords(
        Math.floor(Math.random() * 30),
        group,
        20
    ))) as Array<Array<IWord>>).flat();
    return req;
  }

  makeWordsForTheGame(data: IWord[]): ISprintWord[] {
    const generateCurrentTranslate = (wordTranslate: string) => {
      return Math.random() > 0.5 ? wordTranslate : data[Math.floor(Math.random() * data.length)].wordTranslate;
    }
    return data.map(({audio, word, transcription, wordTranslate}) =>
    ({audio, word, transcription, rightOrWrong: false, correctTranslate: wordTranslate, currentTranslate: generateCurrentTranslate(wordTranslate)}))
  }

  lampsGenerate = (allLamps: number) => `
  <div class="lamps">
  ${Array(allLamps)
  .fill(0)
  .map((e, i) => `<div class="lamp" data-lamp=${i + 1}></div>`)
  .join(' ')}
  </div>`;

  lampOn(lamp: number) {
    document.querySelector(`[data-lamp="${lamp}"]`)?.classList.add('lamp_on');
  }

  allLampsOff() {
    document.querySelectorAll(`[data-lamp]`).forEach(el => el.classList.remove('lamp_on'));
  }

  birdsGenerate = (allBirds: number) => `
  <div class="birds">
  ${Array(allBirds)
  .fill(0)
  .map((e, i) => `<div class="bird" data-bird=${i + 1}></div>`)
  .join(' ')}
  </div>`;

  birdAppear(bird: number) {
    document.querySelector(`[data-bird="${bird}"]`)?.classList.add('bird_appear');
  }

  birdDissappear(bird: number) {
    document.querySelector(`[data-bird="${bird}"]`)?.classList.remove('bird_appear');
  }

  showTheGame() {
    this.container.innerHTML = `
      <div class="sprintgame__outerdata">
        <div class="sprintgame__time"></div>
        <div class="sprintgame__points"></div>
      </div>
      <div class="sprintgame__innerdata">
        ${this.lampsGenerate(this.gameConfig.allLamps)};
        ${this.birdsGenerate(this.gameConfig.allBirds)};
        <button class="sprintgame__audio-btn">📢</button>
        <div class="sprintgame__original-word">

        </div>
        <div class="sprintgame__translation">
        
        </div>
        <button class="sprintgame__prev-btn">⬅️ Нет</button>
        <button class="sprintgame__next-btn">Да ➡️</button>
      </div>
    `
  }

  startTheGame(words: IWord[]) {
    const wordsForTheGame = this.makeWordsForTheGame(words);
    this.gameConfig = {...startGameConfig, wordsForGame: wordsForTheGame};
    this.showTheGame();
  }

  playAudio() {
    const audio = new Audio(
      url + this.gameConfig.wordsForGame[this.gameConfig.currentLevel].audio,
    );
    audio.play();
  }

  initGame() {
    setTimeout(() => {
      document.querySelector('.group_of_words')?.addEventListener('click', async (event) => {
        const group = Number((event.target as HTMLElement).dataset.value);
        const realWords = await this.getDataSet(group);
        this.startTheGame(realWords);
        
      });
    }, 0);

    return `
    <h2 class="sprintgame__title">Sprint</h2>
    <p>Игра "Спринт" тренирует навык быстрого перевода с английского языка на русский. 
      Вам нужно выбрать соответствует ли перевод предложенному слову. Выберите сложность от 1 до 6:
    </p>
    <ul class="group_of_words">
      ${this.groups
    .map((el) => `<li class="group_of_words__elem" data-value=${el}>${Number(el) + 1}</li>`)
    .join('')}
    </ul>
    `;
  }

  render(startTheGame: IWord[] | null) {
    setTimeout(() => {
      this.container = document.querySelector('.sprintgame__container') as HTMLElement;
    }, 0);
    return `<div class="sprintgame__container">${
      startTheGame ? this.startTheGame(startTheGame) : this.initGame()
    }</div>`;
  }
}