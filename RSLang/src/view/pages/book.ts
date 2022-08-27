import BackendAPIController from '../../controller/api/api';
import { IWord } from '../../controller/api/interfaces';

class Book {
  sectionBook(): string {
    return `
    <ul class="hardest-words">
      <li>1</li>
      <li>2</li>
      <li>3</li>
      <li>4</li>
      <li>5</li>
      <li>6</li>
      <li>7</li>
    </ul>
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
      <audio controls>
      <source src="https://rs-lang-project-for-rs-school.herokuapp.com/${el.audio}" type="audio/ogg; codecs=vorbis">
      </audio>
      <p>${el.textMeaning}</p>
      <p>${el.textMeaningTranslate}</p>
      <p>${el.textExample}</p>
      <p>${el.textExampleTranslate}</p>
      </div>`;
    });
  }

  pagination(number: number): void {
    const pagination = document.querySelector('#pagination') as HTMLUListElement;
    for (let i = 1; i <= 30; i += 1) {
      const li = document.createElement('li') as HTMLElement;
      li.innerText = String(i);
      pagination.append(li);
    }
    const arrowLeft = document.querySelector('#arrowPrev') as HTMLButtonElement;
    const arrowRight = document.querySelector('#arrowNext') as HTMLButtonElement;
    let indexPage = 0;
    const list = document.querySelectorAll('#pagination li') as unknown as HTMLLIElement[];
    const showPage = async (li: Element): Promise<void> => {
      const active = document.querySelector('#pagination li.activeList') as HTMLLIElement;
      if (active) {
        active.classList.remove('activeList');
      }
      li.classList.add('activeList');
      const pageNum = +li.innerHTML;
      const words = await BackendAPIController.getAllWords(pageNum, number) as unknown as IWord[];
      this.bookItem(words);
    };
    const disableBtn = () => {
      if (indexPage >= 19) {
        arrowRight.disabled = true;
        indexPage = 29;
      } else arrowRight.disabled = false;
      if (indexPage <= 0) {
        arrowLeft.disabled = true;
        indexPage = 0;
      } else arrowLeft.disabled = false;
    };
    showPage(list[0]);
    arrowRight.addEventListener('click', (): void => {
      indexPage += 1;
      disableBtn();
      showPage(list[indexPage]);
    });
    arrowLeft.addEventListener('click', (): void => {
      indexPage -= 1;
      disableBtn();
      showPage(list[indexPage]);
    });
    this.chooseWordDifficulty();
  }

  chooseWordDifficulty(): void {
    const hardWords = document.querySelectorAll('.hardest-words li') as unknown as HTMLLIElement[];
    hardWords.forEach((el) => {
      el.onclick = () => {
        console.log(el.style.backgroundColor);
        this.pagination(Number(el.innerHTML) - 1);
        (document.querySelectorAll('.words__item') as unknown as HTMLDivElement[]).forEach((w) => {
          w.style.background = `${el.style.backgroundColor}`;
        });
      };
    });
  }
}
export default Book;
