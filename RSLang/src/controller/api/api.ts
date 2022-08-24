import {
  ISingInResponse,
  IUser,
  IWord,
  IUserWords,
  IStatisticsResp,
  IUserSettings,
} from './interfaces';
import { tokenKey, getToken } from '../../utils/localStorageHelper';

const BASE_URL = 'https://rs-lang-project-for-rs-school.herokuapp.com';

export default class BackendAPIController {
  static async signIn(email: string, password: string) {
    const resp : ISingInResponse = await (await fetch(`${BASE_URL}/signin`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })).json();
    localStorage.setItem(tokenKey, resp.token);
    return resp.userId;
  }

  static async createUser(user : IUser): Promise<IUser> {
    const resp : IUser = await (await fetch(`${BASE_URL}/users`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })).json();
    return resp;
  }

  static async getAllWords(page: number, group: number): Promise<IWord[]> {
    return (await (fetch(`${BASE_URL}/words?page=${page}&group=${group}`))).json();
  }

  static async getWordByID(id: string): Promise<IWord> {
    return (await (fetch(`${BASE_URL}/words/${id}`))).json();
  }

  static async getUserByID(id: string): Promise<IUser | null> {
    const token = getToken();
    if (!token) {
      return null;
    }
    return (await (fetch(
      `${BASE_URL}/users/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    ))).json();
  }

  static async updateUserByID(id: string, email: string, password: string): Promise<IUser | null> {
    const token = getToken();
    if (!token) {
      return null;
    }
    return (await (fetch(
      `${BASE_URL}/users/${id}`,
      {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      },
    ))).json();
  }

  static async deleteUserByID(id: string): Promise<void | null | number> {
    const token = getToken();
    if (!token) {
      return null;
    }
    await (fetch(
      `${BASE_URL}/users/${id}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    ));
    return 1;
  }

  static async getNewToken(id: string): Promise<ISingInResponse | null> {
    const token = getToken();
    if (!token) {
      return null;
    }
    const newToken : ISingInResponse = await (await (fetch(`${BASE_URL}/users/${id}/tokens`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }))).json();

    localStorage.setItem(tokenKey, newToken.token);
    return newToken;
  }

  static async createUserWord(
    id: string,
    wordId: string,
    difficulty: string,
    optional = {},
  ): Promise<IUserWords | null> {
    const token = getToken();
    if (!token) {
      return null;
    }
    return (await (fetch(
      `${BASE_URL}/users/${id}/words/${wordId}`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ difficulty, optional }),
      },
    ))).json();
  }

  static async getAllUserWords(id: string): Promise<IUserWords[] | null> {
    const token = getToken();
    if (!token) {
      return null;
    }
    return (await (fetch(
      `${BASE_URL}/users/${id}/words`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    ))).json();
  }

  static async getSingleUserWord(id: string, wordId: string): Promise<IUserWords | null> {
    const token = getToken();
    if (!token) {
      return null;
    }
    return (await (fetch(
      `${BASE_URL}/users/${id}/words/${wordId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    ))).json();
  }

  // другой айди для слова, отличающийся от метода POST
  static async updateUserWord(
    id: string,
    wordId: string,
    difficulty: string,
    optional = {},
  ): Promise<IUserWords | null> {
    const token = getToken();
    if (!token) {
      return null;
    }
    return (await (fetch(
      `${BASE_URL}/users/${id}/words/${wordId}`,
      {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ difficulty, optional }),
      },
    ))).json();
  }

  static async deleteUserWord(id: string, wordId: string): Promise<void | null | number> {
    const token = getToken();
    if (!token) {
      return null;
    }
    await (fetch(
      `${BASE_URL}/users/${id}/words/${wordId}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    ));
    return 1;
  }

  static async getAllAggregatedWords(
    id: string,
    page: number,
    group: number,
    wordsPerPage: number,
    filter = {},
  ): Promise<IWord[] | null> {
    const token = getToken();
    if (!token) {
      return null;
    }

    return (await (fetch(`${BASE_URL}/users/${id}/aggregatedWords?${new URLSearchParams({
      group: String(group || '0'),
      page: String(page || '0'),
      wordsPerPage: String(wordsPerPage || '20'),
      filter: JSON.stringify(filter),
    })}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }))).json().then((req) => req[0].paginatedResults);
  }

  static async getAggregatedWordsById(id: string, wordId: string): Promise<IUserWords | null> {
    const token = getToken();
    if (!token) {
      return null;
    }

    return (await (fetch(`${BASE_URL}/users/${id}/aggregatedWords/${wordId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }))).json();
  }

  static async getUserStatistics(id: string): Promise<IStatisticsResp | null> {
    const token = getToken();
    if (!token) {
      return null;
    }

    return (await (fetch(`${BASE_URL}/users/${id}/statistics`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }))).json();
  }

  static async updateUserStatistics(
    id: string,
    learnedWords: number,
    optional = {},
  ): Promise<IStatisticsResp | null> {
    const token = getToken();
    if (!token) {
      return null;
    }
    return (await (fetch(
      `${BASE_URL}/users/${id}/statistics`,
      {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ learnedWords, optional }),
      },
    ))).json();
  }

  static async getUserSettings(id: string): Promise<IUserSettings | null> {
    const token = getToken();
    if (!token) {
      return null;
    }
    return (await (fetch(`${BASE_URL}/users/${id}/settings`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }))).json();
  }

  static async updateUserSettings(
    id: string,
    wordsPerDay: number,
    optional = {},
  ): Promise<IUserSettings | null> {
    const token = getToken();
    if (!token) {
      return null;
    }
    return (await (fetch(
      `${BASE_URL}/users/${id}/settings`,
      {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ wordsPerDay, optional }),
      },
    ))).json();
  }
}
