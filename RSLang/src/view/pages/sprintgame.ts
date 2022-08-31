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
    const req = (await Promise.all(Array(6).fill(0).map(() => BackendAPIController.getAllAggregatedWords(
      Math.floor(Math.random() * 30),
      group,
      20,
    ))) as Array<Array<IWord>>).flat();
    return req;
  }

  makeWordsForTheGame(data: IWord[]): ISprintWord[] {
    const generateCurrentTranslate = (wordTranslate: string) => (Math.random() > 0.5 ? wordTranslate : data[Math.floor(Math.random() * data.length)].wordTranslate);
    return data.map(({
      audio, word, transcription, wordTranslate,
    }) => ({
      audio, word, transcription, rightOrWrong: false, correctTranslate: wordTranslate, currentTranslate: generateCurrentTranslate(wordTranslate),
    }));
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
    document.querySelectorAll('[data-lamp]').forEach((el) => el.classList.remove('lamp_on'));
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

  rightOrWrongAnswer(answer: boolean) {
    const currentTranslation = this.gameConfig.wordsForGame[this.gameConfig.currentLevel];
    if ((currentTranslation.correctTranslate === currentTranslation.currentTranslate) === answer) {
      currentTranslation.rightOrWrong = true;
      if (this.gameConfig.currentLamps === this.gameConfig.allLamps) {
        this.gameConfig.currentLamps = 0;
        this.allLampsOff();
        this.gameConfig.currentBirds += this.gameConfig.currentBirds < this.gameConfig.allBirds ? 1 : 0;
        this.birdAppear(this.gameConfig.currentBirds);
      } else {
        this.gameConfig.currentLamps += 1;
        this.lampOn(this.gameConfig.currentLamps);
      }
      this.gameConfig.points += (10 * this.gameConfig.currentBirds) + this.gameConfig.currentLamps;
    } else {
      currentTranslation.rightOrWrong = false;
      if (this.gameConfig.currentLamps === 0) {
        const firstBird = this.gameConfig.currentBirds === 1;
        !firstBird && this.birdDissappear(this.gameConfig.currentBirds);
        this.gameConfig.currentBirds -= firstBird ? 0 : 1;
      } else {
        this.gameConfig.currentLamps = 0;
      }
    }
    this.gameConfig.currentLevel += 1;
    this.showTheWord();
  }

  timer() {
    const showTime = document.querySelector('.sprintgame__time') as HTMLElement;
    const time = setInterval(() => {
      this.gameConfig.currentTime -= 1;
      showTime.textContent = `${this.gameConfig.currentTime} сек`;
      if (!this.gameConfig.currentTime) {
        clearInterval(time);
        this.endGame();
      }
    }, 1000);
  }

  showTheWord() {
    const word = this.gameConfig.wordsForGame[this.gameConfig.currentLevel];
    (document.querySelector('.sprintgame__original-word') as HTMLElement).textContent = word.word;
    (document.querySelector('.sprintgame__translation') as HTMLElement).textContent = word.currentTranslate;
    (document.querySelector('.sprintgame__points') as HTMLElement).textContent = String(this.gameConfig.points);
  }

  endGame() {
    this.container.innerHTML = `
      <ul class="results">
        ${this.gameConfig.wordsForGame.slice(0, this.gameConfig.currentLevel + 1).map(({
    rightOrWrong, correctTranslate, word, transcription,
  }) => `<li class="results__elems">${word} – ${transcription} – ${correctTranslate} – ${rightOrWrong ? 'Угадано!' : 'Не угадали!'}</li>`).join('')}
      </ul>
      <button class="reset_the_game">Попробовать снова</button>`;
    document.querySelector('.reset_the_game')?.addEventListener('click', () => {
      const wordForGame = this.gameConfig.wordsForGame.map((el) => ({ ...el, rightOrWrong: false }));
      this.gameConfig = { ...startGameConfig, wordsForGame: wordForGame };
      this.showTheGame();
    });
  }

  showTheGame() {
    this.container.innerHTML = `
    <div class="sprintgame__card">
      <div class="sprintgame__outerdata">
        <div class="sprintgame__time"></div>
        <div class="sprintgame__points">Points</div>
      </div>
      <div class="sprintgame__innerdata">
        ${this.lampsGenerate(this.gameConfig.allLamps)}
        ${this.birdsGenerate(this.gameConfig.allBirds)}
        <div class="sprintgame__words">
          <div class="sprintgame__original-word">
          </div>
          <div class="sprintgame__translation">
          </div>
        </div>
        <div class="sprintgame__controls">
          <button class="sprintgame__controls-btn prev-btn">⬅️ Нет</button>
          <button class="sprintgame__controls-btn audio-btn">📢</button>
          <button class="sprintgame__controls-btn next-btn">Да ➡️</button>
        </div>
      </div>
    </div>
    `;
    this.showTheWord();
    this.timer();
    this.birdAppear(this.gameConfig.currentBirds);
    document.querySelector('.audio-btn')?.addEventListener('click', () => {
      this.playAudio();
    });
    document.querySelector('.prev-btn')?.addEventListener('click', () => {
      this.rightOrWrongAnswer(false);
    });
    window.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        this.rightOrWrongAnswer(false);
      } else if (e.key === 'ArrowRight') {
        this.rightOrWrongAnswer(true);
      }
    });
    document.querySelector('.next-btn')?.addEventListener('click', () => {
      this.rightOrWrongAnswer(true);
    });
  }

  startTheGame(words: IWord[]) {
    const wordsForTheGame = this.makeWordsForTheGame(words);
    this.gameConfig = { ...startGameConfig, wordsForGame: wordsForTheGame };
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
