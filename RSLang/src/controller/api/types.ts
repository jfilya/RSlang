export type TSingInResponse = {
    message: string,
    token: string,
    refreshToken: string,
    userId: string,
    name: string
}

export type TUser = {
    name: string,
    email: string,
    password: string
}

export type TWord = {
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

export type TUserWords = {
    difficulty: string,
    optional: {}
}

export type TStatisticsResp = {
    learnedWords: number,
    optional: {}
}

export type TUserSettings = {
    wordsPerDay: number,
    optional: {}
}


