import { TSingInResponse, TUser, TWord, TUserWords, TStatisticsResp, TUserSettings } from "./types";
import { tokenKey, getToken } from "./localStorageHelper";

const BASE_URL  = 'https://rs-lang-project-for-rs-school.herokuapp.com';

export class BackendAPI {
    constructor() {
    }
    
    static async signIn(email: string, password: string) {
        const resp : TSingInResponse = await (await fetch(`${BASE_URL}/signin`, {method: 'POST', 
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email, password})})).json();
        localStorage.setItem(tokenKey, resp.token);
        return resp.userId;
    }

    static async createUser(user : TUser): Promise<TUser> {
        const resp : TUser = await (await fetch(`${BASE_URL}/users`, {method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)})).json();
        return resp;
    }

    static async getAllWords(page: number, group: number): Promise<TWord[]> {
        return await (await (fetch(`${BASE_URL}/words?page=${page}&group=${group}`))).json();
    }

    static async getWordByID(id: string): Promise<TWord> {
        return await (await (fetch(`${BASE_URL}/words/${id}`))).json();
    }

    static async getUserByID(id: string): Promise<TUser | null> {
        let token = getToken();
        if (!token) {
            return null;
        }
        return await (await (fetch(`${BASE_URL}/users/${id}`,
        {headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }}))).json();
    }

    static async updateUserByID(id: string, email: string, password: string): Promise<TUser | null> {
        let token = getToken();
        if (!token) {
            return null;
        }
        return await (await (fetch(`${BASE_URL}/users/${id}`,
        {method: 'PUT', headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }, body: JSON.stringify({email, password})}))).json();
    }


    static async deleteUserByID(id: string, email: string, password: string): Promise<void | null> {
        let token = getToken();
        if (!token) {
            return null;
        }
        await (fetch(`${BASE_URL}/users/${id}`,
        {method: 'DELETE', headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }}));
    }

    static async getNewToken(id: string): Promise<TSingInResponse | null> {
        let token = getToken();
        if (!token) {
            return null;
        }
        const newToken : TSingInResponse = await (await (fetch(`${BASE_URL}/users/${id}/tokens`, {headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }}))).json();

        localStorage.setItem(tokenKey, newToken.token);
        return newToken;
    }

    static async createUserWord(id: string, wordId: string, difficulty: string, optional = {}): Promise<TUserWords | null> {
        let token = getToken();
        if (!token) {
            return null;
        }
        return await (await (fetch(`${BASE_URL}/users/${id}/words/${wordId}`,
        {method: 'POST', headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }, body: JSON.stringify({difficulty, optional})}))).json();
    }

    static async getAllUserWords(id: string): Promise<TUserWords[] | null> {
        let token = getToken();
        if (!token) {
            return null;
        }
        return await (await (fetch(`${BASE_URL}/users/${id}/words`,
        {headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }}))).json();
    }

    static async getSingleUserWord(id: string, wordId: string): Promise<TUserWords | null> {
        let token = getToken();
        if (!token) {
            return null;
        }
        return await (await (fetch(`${BASE_URL}/users/${id}/words/${wordId}`,
        {headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }}))).json();
    }


    //другой айди для слова, отличающийся от метода POST
    static async updateUserWord(id: string, wordId: string, difficulty: string, optional = {}): Promise<TUserWords | null> {
        let token = getToken();
        if (!token) {
            return null;
        }
        return await (await (fetch(`${BASE_URL}/users/${id}/words/${wordId}`,
        {method: 'PUT', headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }, body: JSON.stringify({difficulty, optional})}))).json();
    }

    static async deleteUserWord(id: string, wordId: string): Promise<void | null> {
        let token = getToken();
        if (!token) {
            return null;
        }
        await (fetch(`${BASE_URL}/users/${id}/words/${wordId}`,
        {method: 'DELETE', headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }}));
    }

    static async getAllAggregatedWords(id: string, page: number, group: number, wordsPerPage: number, filter = {}): Promise<TWord[] | null> {
        let token = getToken();
        if (!token) {
            return null;
        }

        return await (await (fetch(`${BASE_URL}/users/${id}/aggregatedWords?group=${group}&page=${page}&wordsPerPage=${wordsPerPage}&filter=${JSON.stringify(filter)}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        }))).json();
    }

    static async getAggregatedWordsById(id: string, wordId: string): Promise<TUserWords | null> {
        let token = getToken();
        if (!token) {
            return null;
        }

        return await (await (fetch(`${BASE_URL}/users/${id}/aggregatedWords/${wordId}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        }))).json();
    }

    static async getUserStatistics(id: string): Promise<TStatisticsResp | null> {
        let token = getToken();
        if (!token) {
            return null;
        }

        return await (await (fetch(`${BASE_URL}/users/${id}/statistics`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        }))).json();
    }

    static async updateUserStatistics(id: string, learnedWords: number, optional = {}): Promise<TStatisticsResp | null> {
        let token = getToken();
        if (!token) {
            return null;
        }
        return await (await (fetch(`${BASE_URL}/users/${id}/statistics`,
        {method: 'PUT', headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }, body: JSON.stringify({learnedWords, optional})}))).json();
    }

    static async getUserSettings(id: string): Promise<TUserSettings | null> {
        let token = getToken();
        if (!token) {
            return null;
        }
        return await (await (fetch(`${BASE_URL}/users/${id}/settings`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        }))).json();
    }

    static async updateUserSettings(id: string, wordsPerDay: number, optional = {}): Promise<TUserSettings | null> {
        let token = getToken();
        if (!token) {
            return null;
        }
        return await (await (fetch(`${BASE_URL}/users/${id}/settings`,
        {method: 'PUT', headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }, body: JSON.stringify({wordsPerDay, optional})}))).json();
    }

}