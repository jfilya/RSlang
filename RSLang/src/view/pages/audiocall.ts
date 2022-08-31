import { BackendAPIController, BASE_URL } from '../../controller/api/api';
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

const urlAudioFile = `${BASE_URL}/`;

class Audiocall {
  groups: number[] | string[] = [0, 1, 2, 3, 4, 5];

  container: HTMLElement = null as unknown as HTMLElement;

  gameConfig: IGameConfig = { ...startGameConfig };

  // working with data
  async getDataSet(group: number) {
    const req = await BackendAPIController.getAllAggregatedWords(
      Math.floor(Math.random() * 30),
      group,
      8,
    );
    return req;
  }

  async makeFakeWords(group: number | null) {
    let wrongGroup = 0;
    do {
      wrongGroup = Math.floor(Math.random() * 5);
    } while (wrongGroup === group);
    const req = await BackendAPIController.getAllWords(
      Math.floor(Math.random() * 30),
      wrongGroup,
    );
    return req;
  }

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

  buttonGenerate(allButton: number) {
    return `<div class="answer-button__container">
      ${Array(allButton)
    .fill(0)
    .map((e, i) => `<button class="answer-button" data-answer=${i + 1}>1</button>`)
    .join(' ')}
    </div>`;
  }

  playAudio() {
    const audio = new Audio(
      urlAudioFile + this.gameConfig.wordsForGame[this.gameConfig.currentLevel].audioDescription,
    );
    audio.play();
  }

  getAnswerControllers = () => [
    document.querySelector('.answer-button__container'),
    [...document.querySelectorAll('[data-answer]')],
  ];

  displayAnswers = (answers: string[], buttons: Element[]) => answers
    .sort(() => Math.random() - Math.random())
    .forEach((answer, i) => {
      buttons[i].textContent = answer;
    });

  showGame() {
    this.container.innerHTML = `
      ${this.heartGenerate(5)}
      <button class="audio__btn">Повтор звука</button>
      ${this.buttonGenerate(1 + this.gameConfig.wordsForGame[0].fakeWords.length)}
      `;

    this.answerController();

    document.querySelector('.audio__btn')?.addEventListener('click', () => {
      this.playAudio();
    });
  }

  startGame(realWords: IWord[], fakeWords: IWord[]) {
    const wordsForGame = realWords.map((word) => generateWordsForGame(word, fakeWords));
    this.gameConfig = { ...startGameConfig, wordsForGame, allLevel: wordsForGame.length - 1 };
    this.showGame();
  }

  checkAnswer = (answer: string): boolean => answer === this.gameConfig.wordsForGame[this.gameConfig.currentLevel].translation;

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
      this.playAudio();
      this.packageAnswers(allAnswerButton as Element[]);
    } else {
      this.endGame();
    }
  }

  answerController = () => {
    const [answerContainer, allAnswerButton] = this.getAnswerControllers();
    this.packageAnswers(allAnswerButton as Element[]);
    this.playAudio();

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
    this.container.innerHTML = `
      <ul class="results">
        ${this.gameConfig.wordsForGame.slice(0, this.gameConfig.currentLevel + 1).map(({ rightOrWrong, translation }) => `<li class="results__elems">${translation} – ${rightOrWrong ? 'Угадано!' : 'Не угадали!'}</li>`).join('')}
      </ul>
      <button class="reset_the_game">Попробовать снова</button>`;
    document.querySelector('.reset_the_game')?.addEventListener('click', () => {
      this.gameConfig.currentHearts = this.gameConfig.allHearts;
      this.gameConfig.currentLevel = 0;
      this.showGame();
    });
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
    <h2 class="audiocall__title">Audiocall</h2>
    <p>Тренировка Аудиовызов развивает словарный запас. Вы должны выбрать перевод услышанного слова. Выберите сложность от 1 до 6:</p>
    <ul class="group_of_words">
      ${this.groups
    .map((el) => `<li class="group_of_words__elem" data-value=${el}>${Number(el) + 1}</li>`)
    .join('')}
    </ul>
    `;
  }

  render(startTheGame: IWord[] | null) {
    setTimeout(() => {
      this.container = document.querySelector('.audiocall__game') as HTMLElement;
    }, 0);
    return `<div class="audiocall__game">${
      startTheGame ? this.textbookStartGame(startTheGame) : this.initGame()
    }</div>`;
  }
}

export default Audiocall;
