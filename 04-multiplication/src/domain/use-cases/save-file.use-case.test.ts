// @ts-ignore
import { SaveFile } from './save-file.use-case';
import fs from 'fs';
import { jest } from '@jest/globals'

describe("SaveFileUseCase", () => {

    const customOptions = {
        fileContent: 'custom content',
        fileDestination: 'custom-outputs',
        fileName: 'custom-table'
    }

    const filePath = `${customOptions.fileDestination}/${customOptions.fileName}.txt`;

    afterEach(() => {
        const outputFolderExists = fs.existsSync('outputs');
        if (outputFolderExists) fs.rmSync('outputs', { recursive: true });
        const customOutputFolderExists = fs.existsSync(customOptions.fileDestination);
        if (customOutputFolderExists) fs.rmSync(customOptions.fileDestination, { recursive: true });
    });

    test('should save file with default values', () => {
        const saveFile = new SaveFile()
        const filePath = 'outputs/table.txt'
        const options = {
            fileContent: 'test content',
        }

        const result = saveFile.execute(options)
        const fileExists = fs.existsSync(filePath)
        const fileContent = fs.readFileSync(filePath, { encoding: 'utf-8' })

        expect(result).toBe(true)
        expect(fileExists).toBe(true)
        expect(fileContent).toBe(options.fileContent)
    })

    test('should save file with custom values', () => {
        const saveFile = new SaveFile()

        const result = saveFile.execute(customOptions);
        const fileExists = fs.existsSync(filePath);
        const fileContent = fs.readFileSync(filePath, { encoding: 'utf-8' });

        expect(result).toBe(true);
        expect(fileExists).toBe(true);
        expect(fileContent).toBe(customOptions.fileContent);

    })

    test('should return false if directory could not be created', () => {

        jest.spyOn(fs, 'mkdirSync').mockImplementation(
            () => { throw new Error('error'); }
        )
        const saveFile = new SaveFile();
        const result = saveFile.execute(customOptions);

        expect(result).toBe(false);
        jest.restoreAllMocks();
    })


    test('should return false if file could not be created', () => {
        const saveFile = new SaveFile();
        const writeFileSpy = jest.spyOn(fs, 'writeFileSync').mockImplementation(
            () => { throw new Error('error'); }
        )

        const result = saveFile.execute({ fileContent: 'Hola' });

        expect(result).toBe(false);
        writeFileSpy.mockRestore();
    })
})