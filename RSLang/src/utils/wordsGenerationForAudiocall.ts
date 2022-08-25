import { IWord } from "../controller/api/interfaces"
import { IAudioCallGame } from "../view/pages/audiocall"

export function generateWordsForGame(realWord: IWord, fakeWords: IWord[]): IAudioCallGame {
  const randomizer = (fakeWords: IWord[]) => {
    let arr: string[] = [];
    do {
      const rand = Math.floor(Math.random() * fakeWords.length);
      if (!arr.includes(fakeWords[rand].wordTranslate)) arr.push(fakeWords[rand].wordTranslate);
    } while(arr.length < 3);
    return arr;
  }
  
  return {
      translation: realWord.wordTranslate,
      audioDescription: realWord.audio,
      fakeWords: randomizer(fakeWords),
      rightOrWrong: false
  }
}
