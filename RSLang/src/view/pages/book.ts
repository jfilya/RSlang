import BackendAPIController from '../../controller/api/api';
import { IWord } from '../../controller/api/interfaces';

class Book {
  color: string;

  numberHard: number;

  constructor() {
    this.color = '';
    this.numberHard = 0;
  }

  sectionBook(): string {
    return `
    <div class="hardest-words">
      <button color="pink">1</button>
      <button color="blue">2</button>
      <button color="turquoise">3</button>
      <button color="purple">4</button>
      <button color="green">5</button>
      <button color="yellow">6</button>
      <button color="hard">7</button>
    </div>
    <div class="pagination">
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
      <h3>${el.word}</h3>
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
      </div>`;
    });
    array.forEach((el) => {
      (document.querySelector(`.listen-${el.word}`) as HTMLButtonElement).onclick = () => {
        this.listenWords(el.audio, el.audioMeaning, el.audioExample);
      };
    });
  }

  backgroundWordsCard(number: number): void {
    const hardWords = document.querySelectorAll('.hardest-words button') as unknown as HTMLLIElement[];
    hardWords.forEach((el, i) => {
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

  async pagination(): Promise<void> {
    let indexPage = 0;
    const pagination = document.querySelector('#pagination') as HTMLUListElement;
    pagination.innerHTML = '';
    for (let i = 1; i <= 30; i += 1) {
      const li = document.createElement('li') as HTMLElement;
      li.innerText = String(i);
      pagination.append(li);
    }
    const arrowLeft = document.querySelector('#arrowPrev') as HTMLButtonElement;
    const arrowRight = document.querySelector('#arrowNext') as HTMLButtonElement;

    const list = document.querySelectorAll('#pagination li') as unknown as HTMLLIElement[];
    const showPage = async (li: Element): Promise<void> => {
      const active = document.querySelector('#pagination li.activeList') as HTMLLIElement;
      if (active) {
        active.classList.remove('activeList');
      }
      li.classList.add('activeList');
      const pageNum = (+li.innerHTML) - 1;
      const words = await BackendAPIController
        .getAllWords(pageNum, this.numberHard) as unknown as IWord[];
      this.bookItem(words);
      this.backgroundWordsCard(this.numberHard);
    };
    await showPage(list[0]);

    const disableBtn = () => {
      if (indexPage >= 29) {
        arrowRight.disabled = true;
        indexPage = 29;
      } else arrowRight.disabled = false;
      if (indexPage <= 0) {
        arrowLeft.disabled = true;
        indexPage = 0;
      } else arrowLeft.disabled = false;
    };
    disableBtn();
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
  }

  chooseWordDifficulty(): void {
    const hardWords = document.querySelectorAll('.hardest-words button') as unknown as HTMLLIElement[];
    hardWords.forEach((el) => {
      el.onclick = () => {
        this.numberHard = Number(el.innerHTML) - 1;
        this.pagination();
        this.color = el.getAttribute('color') as string;
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
}
export default Book;
