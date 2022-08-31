import { tokenKey, userID, getToken } from '../../utils/localStorageHelper';
import {
  ISingInResponse,
  IUser,
  IWord,
  IUserWords,
  IStatisticsResp,
  IUserSettings,
} from './interfaces';

const BASE_URL = 'https://rs-lang-project-for-rs-school.herokuapp.com';

class BackendAPIController {
  static async signIn(email: string, password: string) {
    const resp: ISingInResponse = await (
      await fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })
    ).json();
    localStorage.setItem(tokenKey, resp.token);
    localStorage.setItem(userID, resp.userId);
    return resp.userId;
  }

  static userID = localStorage.getItem(userID);

  static async createUser(user: IUser): Promise<IUser> {
    const resp: IUser = await (
      await fetch(`${BASE_URL}/users`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      })
    ).json();
    return resp;
  }

  static async getAllWords(page: number, group: number): Promise<IWord[]> {
    return (await fetch(`${BASE_URL}/words?page=${page}&group=${group}`)).json();
  }

  static async getWordByID(id: string): Promise<IWord> {
    return (await fetch(`${BASE_URL}/words/${id}`)).json();
  }

  static async getUserByID(): Promise<IUser | null> {
    const token = getToken();
    if (!token) {
      return null;
    }
    return (
      await fetch(`${BASE_URL}/users/${this.userID}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
    ).json();
  }

  static async updateUserByID(email: string, password: string): Promise<IUser | null> {
    const token = getToken();
    if (!token) {
      return null;
    }
    return (
      await fetch(`${BASE_URL}/users/${this.userID}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })
    ).json();
  }

  static async deleteUserByID(): Promise<void | null> {
    const token = getToken();
    if (!token) {
      return null;
    }
    await fetch(`${BASE_URL}/users/${this.userID}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    return null;
  }

  static async getNewToken(): Promise<ISingInResponse | null> {
    const token = getToken();
    if (!token) {
      return null;
    }
    const newToken: ISingInResponse = await (
      await fetch(`${BASE_URL}/users/${this.userID}/tokens`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
    ).json();

    localStorage.setItem(tokenKey, newToken.token);
    return newToken;
  }

  static async createUserWord(
    wordId: string,
    difficulty: string,
    optional = {},
  ): Promise<IUserWords | null> {
    const token = getToken();
    if (!token) {
      return null;
    }
    return (
      await fetch(`${BASE_URL}/users/${this.userID}/words/${wordId}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ difficulty, optional }),
      })
    ).json();
  }

  static async getAllUserWords(): Promise<IUserWords[] | null> {
    const token = getToken();
    if (!token) {
      return null;
    }
    return (
      await fetch(`${BASE_URL}/users/${this.userID}/words`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
    ).json();
  }

  static async getSingleUserWord(wordId: string): Promise<IUserWords | null> {
    const token = getToken();
    if (!token) {
      return null;
    }
    return (
      await fetch(`${BASE_URL}/users/${this.userID}/words/${wordId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
    ).json();
  }

  // другой айди для слова, отличающийся от метода POST
  static async updateUserWord(
    wordId: string,
    difficulty: string,
    optional = {},
  ): Promise<IUserWords | null> {
    const token = getToken();
    if (!token) {
      return null;
    }
    return (
      await fetch(`${BASE_URL}/users/${this.userID}/words/${wordId}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ difficulty, optional }),
      })
    ).json();
  }

  static async deleteUserWord(wordId: string): Promise<void | null> {
    const token = getToken();
    if (!token) {
      return null;
    }
    await fetch(`${BASE_URL}/users/${this.userID}/words/${wordId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    return null;
  }

  static async getAllAggregatedWords(
    page: number,
    group: number,
    wordsPerPage: number,
    filter = {},
  ): Promise<IWord[] | null> {
    const token = getToken();
    if (!token) {
      return null;
    }

    return (
      await fetch(
        `${BASE_URL}/users/${this.userID}/aggregatedWords?${new URLSearchParams({
          group: String(group || '0'),
          page: String(page || '0'),
          wordsPerPage: String(wordsPerPage || '20'),
          filter: JSON.stringify(filter),
        })}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        },
      )
    )
      .json()
      .then((req) => req[0].paginatedResults);
  }

  static async getAggregatedWordsById(wordId: string): Promise<IUserWords | null> {
    const token = getToken();
    if (!token) {
      return null;
    }

    return (
      await fetch(`${BASE_URL}/users/${this.userID}/aggregatedWords/${wordId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
    ).json();
  }

  static async getUserStatistics(): Promise<IStatisticsResp | null> {
    const token = getToken();
    if (!token) {
      return null;
    }

    return (
      await fetch(`${BASE_URL}/users/${this.userID}/statistics`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
    ).json();
  }

  static async updateUserStatistics(
    learnedWords: number,
    optional = {},
  ): Promise<IStatisticsResp | null> {
    const token = getToken();
    if (!token) {
      return null;
    }
    return (
      await fetch(`${BASE_URL}/users/${this.userID}/statistics`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ learnedWords, optional }),
      })
    ).json();
  }

  static async getUserSettings(): Promise<IUserSettings | null> {
    const token = getToken();
    if (!token) {
      return null;
    }
    return (
      await fetch(`${BASE_URL}/users/${this.userID}/settings`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
    ).json();
  }

  static async updateUserSettings(
    wordsPerDay: number,
    optional = {},
  ): Promise<IUserSettings | null> {
    const token = getToken();
    if (!token) {
      return null;
    }
    return (
      await fetch(`${BASE_URL}/users/${this.userID}/settings`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ wordsPerDay, optional }),
      })
    ).json();
  }
}

export { BASE_URL, BackendAPIController };
