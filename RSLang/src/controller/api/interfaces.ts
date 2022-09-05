export interface ISingInResponse {
  message: string,
  token: string,
  refreshToken: string,
  userId: string,
  name: string
}

export interface IUser {
  name: string,
  email: string,
  password: string
}

export interface IWord {
  id: string,
  group: number,
  page: number,
  word: string,
  image: string,
  audio: string,
  audioMeaning: string,
  audioExample: string,
  textMeaning: string,
  textExample: string,
  transcription: string,
  wordTranslate: string,
  textMeaningTranslate: string,
  textExampleTranslate: string
}

export interface IUserWords {
  difficulty: string,
  optional: IWord,
}

export interface IStatisticsResp {
  learnedWords: number,
  optional: IWord,
}

export interface IUserSettings {
  wordsPerDay: number,
  optional: {}
}

export interface IRegister {
  id: string;
  name: string;
  email: string;
}

export interface ISprintWord {
  audio: string,
  word: string,
  transcription: string,
  currentTranslate: string,
  correctTranslate: string,
  rightOrWrong: boolean
}

export interface IGameConfigSprint {
  points: number;
  currentLamps: number;
  allLamps: number;
  currentBirds: number;
  allBirds: number;
  currentTime: number;
  currentLevel: number,
  wordsForGame: ISprintWord[];
  statistics: {
    currentStreak: number;
    maxStreak: number;
  }
}
