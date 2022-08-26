import BackendAPIController from '../../controller/api/api';
import { IWord } from '../../controller/api/interfaces';
import { IAudioCallGame, generateWordsForGame } from '../../utils/wordsGenerationForAudiocall';

interface IGameConfig {
  allHearts: number;
  currentHearts: number;
  currentLevel: number;
  allLevel: number;
  wordsForGame: IAudioCallGame[];
}

const startGameConfig = {
  allHearts: 5,
  currentHearts: 5,
  currentLevel: 0,
  allLevel: 0,
  wordsForGame: [],
};

class Audiocall {
  groups: number[] | string[];

  id: string; // need to make separate method for getting userID in API

  container: HTMLElement;

  gameConfig: IGameConfig;

  constructor() {
    this.groups = [0, 1, 2, 3, 4, 5];
    this.id = '630244fcbe44cf0016ddcae9';
    this.container = null as unknown as HTMLElement;
    this.gameConfig = { ...startGameConfig };
  }

  // working with data
  async getDataSet(group: number) {
    return BackendAPIController.getAllAggregatedWords(
      this.id,
      Math.floor(Math.random() * 30),
      group,
      8,
    ).then((req) => req);
  }

  async makeFakeWords(group: number | null) {
    let wrongGroup = 0;
    do {
      wrongGroup = Math.floor(Math.random() * 5);
    } while (wrongGroup === group);
    return BackendAPIController.getAllWords(
      Math.floor(Math.random() * 30),
      wrongGroup,
    ).then((req) => req);
  }

  // hearts (lives) for the game
  heartGenerate = (allHearts: number) => `
    <div class="hearts">
    ${Array(allHearts)
    .fill(0)
    .map((e, i) => `<div class="heart" data-heart=${i + 1}></div>`)
    .join(' ')}
    </div>`;

  heartFail(heart: number) {
    document.querySelector(`[data-heart="${heart}"]`)?.classList.add('heart_fail');
  }

  // buttons
  buttonGenerate(allButton: number) {
    return `<div class="answer-button__container">
      ${Array(allButton)
    .fill(0)
    .map((e, i) => `<button class="answer-button" data-answer=${i + 1}>1</button>`)
    .join(' ')}
    </div>`;
  }

  // answers
  getAnswerControllers = () => [
    document.querySelector('.answer-button__container'),
    [...document.querySelectorAll('[data-answer]')],
  ];

  displayAnswers = (answers: string[], buttons: Element[]) => answers
    .sort(() => Math.random() - Math.random())
    .forEach((answer, i) => {
      buttons[i].textContent = answer;
    });

  startGame(realWords: IWord[], fakeWords: IWord[]) {
    const wordsForGame = realWords.map((word) => generateWordsForGame(word, fakeWords));

    this.gameConfig = { ...startGameConfig, wordsForGame, allLevel: wordsForGame.length - 1 };

    this.container.innerHTML = `
      ${this.heartGenerate(5)}
      <button class="audio__btn">Повтор звука</button>
      ${this.buttonGenerate(1 + this.gameConfig.wordsForGame[0].fakeWords.length)}
      `;

    this.answerController();

    document.querySelector('.audio__btn')?.addEventListener('click', () => {
      /* TODO
        @
        @ repeat audio
        @
        */
    });
  }

  checkAnswer = (answer: string): boolean => 
    answer === this.gameConfig.wordsForGame[this.gameConfig.currentLevel].translation;

  packageAnswers(allAnswerButton: Element[]) {
    this.displayAnswers(
      [
        this.gameConfig.wordsForGame[this.gameConfig.currentLevel].translation,
        ...this.gameConfig.wordsForGame[this.gameConfig.currentLevel].fakeWords,
      ],
      allAnswerButton,
    );
  }

  nextLevel(allAnswerButton: Element[]) {
    if (
      this.gameConfig.currentHearts !== 0
      && this.gameConfig.currentLevel < this.gameConfig.allLevel
    ) {
      this.gameConfig.currentLevel += 1;
      this.packageAnswers(allAnswerButton as Element[]);
    } else {
      this.endGame();
    }
  }

  answerController = () => {
    const [answerContainer, allAnswerButton] = this.getAnswerControllers();
    this.packageAnswers(allAnswerButton as Element[]);

    (answerContainer as HTMLElement).addEventListener('click', ({ target }: Event) => {
      const element = target as HTMLElement;

      if (element?.dataset?.answer) {
        const result = this.checkAnswer(element.textContent as string);

        this.gameConfig.wordsForGame[this.gameConfig.currentLevel].rightOrWrong = result;

        if (!result) {
          this.heartFail(this.gameConfig.currentHearts);
          this.gameConfig.currentHearts -= 1;
        }
        this.nextLevel(allAnswerButton as Element[]);
      }
    });
  };

  endGame() {
    alert('GAME OVER');
    /* TODO
      @
      @ send game result to back-end
      @ display game result
      @
    */
  }

  // при переходе из учебника должен работать этот метод
  async textbookStartGame(startTheGame: IWord[]) {
    const fakeWords = await this.makeFakeWords(Math.floor(Math.random() * this.groups.length));
    this.startGame(startTheGame, fakeWords);
  }

  initGame() {
    setTimeout(() => {
      document.querySelector('.group_of_words')?.addEventListener('click', async (event) => {
        const group = Number((event.target as HTMLElement).dataset.value);
        const fakeWords = await this.makeFakeWords(group);
        const realWords = await this.getDataSet(group);
        this.startGame(realWords as IWord[], fakeWords);
      });
    }, 0);

    return `
    <h2>Audiocall</h2>
    <p>Тренировка Аудиовызов развивает словарный запас. Вы должны выбрать перевод услышанного слова. Выберите сложность от 1 до 6:</p>
    <ul class="group_of_words">
      ${this.groups
    .map((el) => `<li class="group_of_words__elem" data-value=${el}>${el}</li>`)
    .join('')}
    </ul>
    `;
  }

  render(startTheGame: IWord[]) {
    setTimeout(() => {
      this.container = document.querySelector('.audiocall__game') as HTMLElement;
    }, 0);
    return `<div class="audiocall__game">${
      startTheGame ? this.textbookStartGame(startTheGame) : this.initGame()
    }</div>`;
  }
}

export default Audiocall;
