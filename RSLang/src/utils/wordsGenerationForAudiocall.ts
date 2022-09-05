import { IWord } from '../controller/api/interfaces';

interface IAudioCallGame {
  translation: string,
  audioDescription: string,
  fakeWords: string[],
  rightOrWrong: boolean,
  word: string,
}

const randomizer = (fakeWords: IWord[]) => {
  const arr: string[] = [];
  do {
    const rand = Math.floor(Math.random() * fakeWords.length);
    if (!arr.includes(fakeWords[rand].wordTranslate)) arr.push(fakeWords[rand].wordTranslate);
  } while (arr.length < 3);
  return arr;
};

function generateWordsForGame(realWord: IWord, fakeWords: IWord[]): IAudioCallGame {
  return {
    translation: realWord.wordTranslate,
    audioDescription: realWord.audio,
    fakeWords: randomizer(fakeWords),
    rightOrWrong: false,
    word: realWord.word,
  };
}

export { IAudioCallGame, generateWordsForGame };
