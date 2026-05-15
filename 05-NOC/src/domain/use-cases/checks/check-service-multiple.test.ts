import { LogEntity } from "../../entities/log.entity";
import { CheckServiceMultiple } from "./check-service-multiple";



describe('CheckService Multiple', () => {

    const mockRepository1 = {
        saveLog: jest.fn(),
        getLogs: jest.fn(),
    }
    const mockRepository2 = {
        saveLog: jest.fn(),
        getLogs: jest.fn(),
    }

    const successCallback = jest.fn();
    const errorCallback = jest.fn();

    const ckeckServiceMultiple = new CheckServiceMultiple([mockRepository1, mockRepository2], successCallback, errorCallback);

    beforeEach(() => {
        jest.clearAllMocks();
    })

    test('should call success callback when the fetchs returns true', async () => {
        const wasOk = await ckeckServiceMultiple.execute('https://google.com');

        expect(wasOk).toBe(true);
        expect(successCallback).toHaveBeenCalled();
        expect(errorCallback).not.toHaveBeenCalled();

        expect(mockRepository1.saveLog).toHaveBeenCalledWith(
            expect.any(LogEntity)
        );
        expect(mockRepository2.saveLog).toHaveBeenCalledWith(
            expect.any(LogEntity)
        );
    })

    test('should call errorcallback when the fetch returns false', async () => {
        const wasOk = await ckeckServiceMultiple.execute('https://gulugulugugule.com');

        expect(wasOk).toBe(false);
        expect(successCallback).not.toHaveBeenCalled();
        expect(errorCallback).toHaveBeenCalled();

        expect(mockRepository1.saveLog).toHaveBeenCalledWith(
            expect.any(LogEntity)
        );
        expect(mockRepository2.saveLog).toHaveBeenCalledWith(
            expect.any(LogEntity)
        );
    })
})