import { BackendAPIController } from '../../controller/api/api';
import { IUserWords, IWord } from '../../controller/api/interfaces';
import checkAutorization from '../../utils/checkAutorization';
import Game from './game';
import Audiocall from './audiocall';
import SprintGame from './sprintgame';
import Footer from '../components/footer';

class Book {
  color: string;

  numberHard: number;

  audiocall: Audiocall;

  game: Game;

  sprintGame: SprintGame;

  footer: Footer;

  constructor() {
    this.color = '';
    this.numberHard = 0;
    this.audiocall = new Audiocall();
    this.game = new Game();
    this.sprintGame = new SprintGame();
    this.footer = new Footer();
  }

  sectionBook(): string {
    return `
    <div class="link-games">
      <div class="link-games__audiocall link-games__game">Аудиовызов</div>
      <div class="link-games__sprint link-games__game">Спринт</div>
    </div>
    <div class="hardest-words">
      <button color="pink">1</button>
      <button color="blue">2</button>
      <button color="turquoise">3</button>
      <button color="purple">4</button>
      <button color="green">5</button>
      <button color="yellow">6</button>
      <button class="hard-word-register" color="hard">7</button>
    </div>
    <div class="pagination">
    <button class="pagination__arrow  disableBtn" id="arrowStart">
      <svg width="10" height="11" viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0.958984 6.08789L9.99219 10.7852V9.44727L2.48242 5.53125L9.99219 1.625V0.287109L0.958984 4.98438V6.08789Z" fill="#292929"/>
      </svg>  
      <svg width="10" height="11" viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0.958984 6.08789L9.99219 10.7852V9.44727L2.48242 5.53125L9.99219 1.625V0.287109L0.958984 4.98438V6.08789Z" fill="#292929"/>
      </svg>  
    </button>
    <button class="pagination__arrow  disableBtn" id="arrowPrev">
      <svg width="10" height="11" viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0.958984 6.08789L9.99219 10.7852V9.44727L2.48242 5.53125L9.99219 1.625V0.287109L0.958984 4.98438V6.08789Z" fill="#292929"/>
      </svg>  
    </button>
    <div class="amount-words"> 
    <ul id="pagination"></ul>
    /30
    </div>
    <button class="pagination__arrow " id="arrowNext">
      <svg width="10" height="11" viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9.04102 6.08789L0.0078125 10.7852V9.44727L7.51758 5.53125L0.0078125 1.625V0.287109L9.04102 4.98438V6.08789Z" fill="#292929"/>
      </svg>
    </button>
    <button class="pagination__arrow " id="arrowEnd">
      <svg width="10" height="11" viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9.04102 6.08789L0.0078125 10.7852V9.44727L7.51758 5.53125L0.0078125 1.625V0.287109L9.04102 4.98438V6.08789Z" fill="#292929"/>
      </svg>
      <svg width="10" height="11" viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9.04102 6.08789L0.0078125 10.7852V9.44727L7.51758 5.53125L0.0078125 1.625V0.287109L9.04102 4.98438V6.08789Z" fill="#292929"/>
      </svg>
    </button>
    </div>
    <div class="words"></div>
    `;
  }

  bookItem(array: IWord[]): void {
    const words = document.querySelector('.words') as HTMLDivElement;
    words.innerHTML = '';
    array.forEach((el) => {
      words.innerHTML += `<div class="words__item">
      <img class="words__img" src="https://rs-lang-project-for-rs-school.herokuapp.com/${el.image}" alt="img-${el.word}">
      <h3 class="word-name">${el.word}</h3>
      <p>${el.wordTranslate}</p>
      <p>${el.transcription}</p>
      <button class="listen-${el.word}"><svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M24.9998 39.5832C33.054 39.5832 39.5832 33.054 39.5832 24.9998C39.5832 16.9457 33.054 10.4165 24.9998 10.4165C16.9457 10.4165 10.4165 16.9457 10.4165 24.9998C10.4165 33.054 16.9457 39.5832 24.9998 39.5832Z" stroke="black" stroke-width="2.08333" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M32.2915 25.0002L19.7915 32.2918V17.7085L32.2915 25.0002Z" stroke="black" stroke-width="2.08333" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M24.9998 47.3957C37.3687 47.3957 47.3957 37.3687 47.3957 24.9998C47.3957 12.631 37.3687 2.604 24.9998 2.604C12.631 2.604 2.604 12.631 2.604 24.9998C2.604 37.3687 12.631 47.3957 24.9998 47.3957Z" stroke="black" stroke-width="2.08333" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>      
      </button>
      <p>${el.textMeaning}</p>
      <p>${el.textMeaningTranslate}</p>
      <p>${el.textExample}</p>
      <p>${el.textExampleTranslate}</p>
      <div class="hidden-btn">
        <div class="mark-difficult difficult-${el.word}">Cложное</div>
        <div class="mark-cancellation cancellation-${el.word}">Отменить</div>
        <div class="mark-studied studied-${el.word}">Изученное</div>
      </div>
      </div>`;
    });
    this.btnClick(array);
    this.checkAutirisationBook();
  }

  btnClick(array: IWord[]): void {
    array.forEach((el) => {
      const btn = (document.querySelector(`.listen-${el.word}`) as HTMLButtonElement);
      if (btn) {
        btn.onclick = () => {
          this.listenWords(el.audio, el.audioMeaning, el.audioExample);
        };
      }
      const difficult = document.querySelector(`.difficult-${el.word}`) as HTMLDivElement;
      if (difficult) {
        difficult.onclick = async () => {
          await this.deleteUserWords(el, 'study');
          await this.addHardWords(el);
          const hardWordUser = await BackendAPIController
            .getAllUserWords() as unknown as IUserWords[];
          hardWordUser.forEach((h) => {
            (document.querySelectorAll('.word-name') as unknown as HTMLHeadElement[]).forEach((w) => {
              if (h.difficulty === 'hard' && h.optional.word === w.innerHTML) {
                ((w as HTMLHeadElement).parentNode as HTMLDivElement).setAttribute('color', 'hard');
              }
            });
          });
        };
      }
      const cancellation = document.querySelector(`.cancellation-${el.word}`) as HTMLDivElement;
      if (cancellation) {
        cancellation.onclick = async () => {
          await this.deleteUserWords(el, 'hard');
          await BackendAPIController.getAllUserWords();
          this.buildPageHard();
        };
      }

      const studied = document.querySelector(`.studied-${el.word}`) as HTMLDivElement;
      if (studied) {
        studied.onclick = async () => {
          const wordBlock = ((studied as HTMLDivElement).parentNode as HTMLDivElement)
            .parentNode as HTMLDivElement;
          if (wordBlock.getAttribute('color') === 'study') {
            wordBlock.setAttribute('color', `${localStorage.color}`);
            await this.deleteUserWords(el, 'study');
          } else {
            await this.deleteUserWords(el, 'hard');
            await this.addStudiedWords(el);
            const studiedWordUser = await BackendAPIController
              .getAllUserWords() as unknown as IUserWords[];
            studiedWordUser.forEach((h) => {
              (document.querySelectorAll('.word-name') as unknown as HTMLHeadElement[]).forEach(async (w) => {
                if (h.difficulty === 'study' && h.optional.word === w.innerHTML) {
                  ((w as HTMLHeadElement).parentNode as HTMLDivElement).setAttribute('color', 'study');
                }
              });
            });
          }
        };
      }
    });
  }

  backgroundWordsCard(number: number): void {
    const hardWords = document.querySelectorAll('.hardest-words button') as unknown as HTMLButtonElement[];
    hardWords.forEach((el, i) => {
      if (localStorage.color) {
        this.color = localStorage.color;
      }
      if (i === number) {
        this.color = el.getAttribute('color') as string;
      }
    });
    (document.querySelectorAll('.words__item') as unknown as HTMLDivElement[])
      .forEach((w) => {
        w.removeAttribute('color');
        w.setAttribute('color', `${this.color}`);
      });
  }

  async buildPageOrdinary(indexPage: number): Promise<void> {
    (document.querySelector('.pagination') as HTMLDivElement).style.display = 'flex';
    const pagination = document.querySelector('#pagination') as HTMLUListElement;
    pagination.innerHTML = '';
    for (let i = 1; i <= 30; i += 1) {
      const li = document.createElement('li') as HTMLElement;
      li.innerText = String(i);
      pagination.append(li);
    }
    const arrowLeft = document.querySelector('#arrowPrev') as HTMLButtonElement;
    const arrowRight = document.querySelector('#arrowNext') as HTMLButtonElement;
    const arrowStart = document.querySelector('#arrowStart') as HTMLButtonElement;
    const arrowEnd = document.querySelector('#arrowEnd') as HTMLButtonElement;

    const list = document.querySelectorAll('#pagination li') as unknown as HTMLLIElement[];
    const showPage = async (li: Element): Promise<void> => {
      const active = document.querySelector('#pagination li.activeList') as HTMLLIElement;
      if (active) {
        active.classList.remove('activeList');
      }
      li.classList.add('activeList');
      localStorage.setItem('activeList', li.innerHTML);
      const pageNum = (+li.innerHTML) - 1;

      const words = await BackendAPIController
        .getAllWords(pageNum, this.numberHard) as unknown as IWord[];
      this.bookItem(words);
      this.backgroundWordsCard(this.numberHard);
      this.linkGames(words, pageNum);
      const flag = await checkAutorization();
      if (flag) {
        // eslint-disable-next-line max-len
        const hardWordUser = await BackendAPIController.getAllUserWords() as unknown as IUserWords[];
        if (hardWordUser.length) {
          hardWordUser.forEach((h) => {
            (document.querySelectorAll('.word-name') as unknown as HTMLHeadElement[]).forEach((w) => {
              if (h.difficulty === 'hard' && h.optional.word === w.innerHTML) {
                ((w as HTMLHeadElement).parentNode as HTMLDivElement).setAttribute('color', 'hard');
              }
              if (h.difficulty === 'study' && h.optional.word === w.innerHTML) {
                ((w as HTMLHeadElement).parentNode as HTMLDivElement).setAttribute('color', 'study');
              }
            });
          });
        }
      }
    };
    await showPage(list[indexPage]);
    const disableBtn = () => {
      if (indexPage >= 29) {
        arrowRight.disabled = true;
        arrowEnd.disabled = true;
        indexPage = 29;
      } else {
        arrowRight.disabled = false;
        arrowEnd.disabled = false;
      }
      if (indexPage <= 0) {
        arrowLeft.disabled = true;
        arrowStart.disabled = true;
        indexPage = 0;
      } else {
        arrowLeft.disabled = false;
        arrowStart.disabled = false;
      }
    };
    disableBtn();
    arrowStart.onclick = (): void => {
      indexPage = 0;
      disableBtn();
      showPage(list[indexPage]);
    };
    arrowRight.onclick = (): void => {
      indexPage += 1;
      disableBtn();
      showPage(list[indexPage]);
    };
    arrowLeft.onclick = (): void => {
      indexPage -= 1;
      disableBtn();
      showPage(list[indexPage]);
    };
    arrowEnd.onclick = (): void => {
      indexPage = 29;
      disableBtn();
      showPage(list[indexPage]);
    };
  }

  async buildPageHard(): Promise<void> {
    const pagination = document.querySelector('#pagination') as HTMLUListElement;
    (document.querySelector('.pagination') as HTMLDivElement).style.display = 'none';
    pagination.innerHTML = '';
    const hardWordUser = await BackendAPIController
      .getAllUserWords() as unknown as IUserWords[];
    const words = [] as IWord[];
    hardWordUser.forEach((h) => {
      if (h.difficulty === 'hard') { words.push(h.optional); }
    }) as unknown as IWord[];
    this.bookItem(words);
    this.backgroundWordsCard(this.numberHard);
    const cancellation = document.querySelectorAll('.mark-cancellation') as unknown as HTMLDivElement[];
    cancellation.forEach((d) => {
      d.style.display = 'flex';
    });
    const difficult = document.querySelectorAll('.mark-difficult') as unknown as HTMLDivElement[];
    difficult.forEach((d) => {
      d.style.display = 'none';
    });
  }

  async pagination(): Promise<void> {
    let indexPage: number;
    if (localStorage.activeList) {
      indexPage = localStorage.activeList - 1;
    } else indexPage = 0;
    if (localStorage.numberHard) {
      this.numberHard = localStorage.numberHard;
    }
    if (+this.numberHard < 6) {
      this.buildPageOrdinary(indexPage);
      (document.querySelector('.link-games') as HTMLDivElement).style.display = 'flex';
    } else if (+this.numberHard === 6) {
      this.buildPageHard();
      (document.querySelector('.link-games') as HTMLDivElement).style.display = 'none';
    }
  }

  chooseWordDifficulty(): void {
    const hardWords = document.querySelectorAll('.hardest-words button') as unknown as HTMLButtonElement[];
    hardWords.forEach((el) => {
      el.onclick = () => {
        this.numberHard = Number(el.innerHTML) - 1;
        localStorage.setItem('numberHard', String(this.numberHard));
        this.pagination();
        this.color = el.getAttribute('color') as string;
        localStorage.setItem('color', this.color);
      };
    });
  }

  listenWords(audio: string, audioMeaning: string, audioExample: string): void {
    let songs = [`https://rs-lang-project-for-rs-school.herokuapp.com/${audio}`,
      `https://rs-lang-project-for-rs-school.herokuapp.com/${audioMeaning}`,
      `https://rs-lang-project-for-rs-school.herokuapp.com/${audioExample}`];

    const audioElements = [] as HTMLAudioElement[];
    for (let i = 0; i < songs.length; i += 1) {
      const a = new Audio(songs[i]);
      audioElements.push(a);
      (document.querySelectorAll('button') as unknown as HTMLButtonElement[])
        .forEach((b) => {
          b.disabled = true;
        });
      if (i === 0) {
        audioElements[i].play();
      } else {
        // eslint-disable-next-line @typescript-eslint/no-loop-func
        audioElements[i - 1].onended = () => {
          audioElements[i].play();
          songs = songs.slice(1);
        };
      }
      if (i === songs.length - 1) {
        audioElements[i].onended = () => {
          (document.querySelectorAll('button') as unknown as HTMLButtonElement[])
            .forEach((b) => {
              b.disabled = false;
            });
        };
      }
    }
  }

  async checkAutirisationBook(): Promise<void> {
    const flag = await checkAutorization();
    if (flag) {
      const markAsDifficult = document.querySelectorAll('.hidden-btn') as unknown as HTMLDivElement[];
      markAsDifficult.forEach((el) => {
        el.style.display = 'flex';
      });
      const words = document.querySelectorAll('.words__item') as unknown as HTMLDivElement[];
      words.forEach((el) => {
        el.style.paddingBottom = '60px';
      });
      const hardWordRegister = document.querySelector('.hard-word-register') as HTMLButtonElement;
      hardWordRegister.style.display = 'flex';
    }
  }

  async addHardWords(element: IWord): Promise<void> {
    const hardWordUser = await BackendAPIController.getAllUserWords() as unknown as IUserWords[];
    const verification = hardWordUser.filter((h) => h.difficulty === 'hard' && h.optional.word === element.word);
    if (verification.length === 0) {
      await BackendAPIController.createUserWord(
        element.id,
        'hard',
        element,
      );
    }
  }

  async addStudiedWords(element: IWord): Promise<void> {
    const hardWordUser = await BackendAPIController.getAllUserWords() as unknown as IUserWords[];
    const verification = hardWordUser.filter((h) => h.difficulty === 'study' && h.optional.word === element.word);
    if (verification.length === 0) {
      await BackendAPIController.createUserWord(
        element.id,
        'study',
        element,
      );
    }
  }

  async deleteUserWords(element: IWord, difficulty: string): Promise<void> {
    const wordUser = await BackendAPIController.getAllUserWords() as unknown as IUserWords[];
    wordUser.forEach(async (w) => {
      if (w && w.difficulty === difficulty) {
        await BackendAPIController.deleteUserWord(element.id);
      }
    });
  }

  async linkGames(startTheGame: IWord[], number: number): Promise<void> {
    await this.checkAutirisationBook();
    const audiocall = document.querySelector('.link-games__audiocall') as HTMLDivElement;
    const sprint = document.querySelector('.link-games__sprint') as HTMLDivElement;
    const workPages = document.querySelector('.work') as HTMLElement;
    audiocall.onclick = async () => {
      workPages.innerHTML = '<div class="audiocall__game"></div>';
      this.audiocall.render(startTheGame);
      this.footer.displayFooter();
    };
    sprint.onclick = async () => {
      const wordsAllHard = [] as IWord[];
      let n = number;
      const processArray = async () => {
        for (let i = n - 1; i > n - 4; i -= 1) {
          if (i < 0) {
            n = 30;
            i = 30;
          }
          // eslint-disable-next-line max-len, no-await-in-loop
          const array = await BackendAPIController.getAllWords(i, this.numberHard) as IWord[];
          array.forEach((e) => wordsAllHard.push(e));
        }
      };
      await processArray();
      const arrayStartGame = startTheGame.concat(wordsAllHard);
      workPages.innerHTML = '<div class="sprintgame__container"></div>';
      this.sprintGame.render(arrayStartGame);
      this.footer.displayFooter();
    };
  }
}
export default Book;
