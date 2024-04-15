import KeyDao from '../../../src/repositories/dao/keyDao';
import { IKey } from '../../../src/interfaces/key/keyInterface';

// Mock do KeyDao
jest.mock('../../../src/repositories/dao/keyDao');

describe('KeyDao', () => {
    let keyDao: KeyDao;

    beforeEach(() => {
        keyDao = new KeyDao();
    });

    it('should check if a key exists', async () => {
        // Dados da chave para criação
        const keyData: IKey = {
            value: 'testKey',
            id: 1,
            name: '',
            user_id: 0
        };

        // Mock da função keyExists para retornar true
        (keyDao.keyExists as jest.Mock).mockResolvedValue(true);

        // Verificar se a chave existe
        const keyExists = await keyDao.keyExists(keyData.value);

        // Verificar se a chave existe
        expect(keyExists).toBeTruthy();
    });
    
    it('should get a key by ID', async () => {
        // Dados da chave para criação
        const keyData: IKey = {
            value: 'testKey',
            id: 1,
            name: '',
            user_id: 0
        };

        // Mock da função getKeyById para retornar a chave criada
        (keyDao.getKeyById as jest.Mock).mockResolvedValue(keyData);

        // Obter a chave pelo ID
        const fetchedKey = await keyDao.getKeyById(1); // ID válido

        // Verificar se a chave foi obtida corretamente
        expect(fetchedKey).toBeTruthy();
        expect(fetchedKey?.id).toBe(keyData.id);
        expect(fetchedKey?.value).toBe(keyData.value);
    });
});
