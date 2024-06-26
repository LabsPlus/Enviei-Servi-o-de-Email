import KeyDao from "../repositories/dao/keyDao";
import { IKey } from "../interfaces/key/keyInterface";
import bycript from 'bcrypt';

export default class KeyService {

    private keyDao: KeyDao;

    constructor() {
        this.keyDao = new KeyDao();
    }

    public async generateUniqueKey(length: number): Promise<string> {

        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789*/+_@#$%&*';
        let key = '';

        for (let i = 0; i < length; i++) {
            key += characters.charAt(Math.floor(Math.random() * characters.length));
        }

        if (await this.keyExists(key)) {
            return this.generateUniqueKey(length);
        }

        return key;
    }

    public async encriptKey(keyValue: string): Promise<string> {

        const salt = await bycript.genSalt(10);
        const encriptedKey = await bycript.hash(keyValue, salt);

        return encriptedKey;
    }

    public async compareKeys(key: string, hashedKey: string): Promise<boolean> {

        const equals = await bycript.compare(key, hashedKey);
        return equals;

    }


    public async getKeyById(id: number): Promise<IKey | null> {
        try {
            const key = await this.keyDao.getKeyById(id);
            return key;
        } catch (error) {
            throw new Error(`Erro ao buscar chave por ID: ${error}`);
        }
    }

    public async keyExists(key: string): Promise<boolean> {
        try {

            return await this.keyDao.keyExists(key);

        } catch (error) {
            throw new Error(`Erro ao buscar chave: ${error}`);
        }
    }

}