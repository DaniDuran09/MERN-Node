import { LogEntity } from "../../entities/log.entity";
import { CheckService } from "./check-service";

describe('CheckService', () => {


    const mockRepository = {
        saveLog: jest.fn(),
        getLogs: jest.fn(),
    }

    const successCallback = jest.fn();
    const errorCallback = jest.fn();


    const checkService = new CheckService(mockRepository, successCallback, errorCallback);

    beforeEach(() => {
        jest.clearAllMocks();
    })

    test('should call success callback when the fetch returns true', async () => {

        const wasOk = await checkService.execute('https://google.com');

        expect(wasOk).toBe(true)
        expect(successCallback).toHaveBeenCalled();
        expect(errorCallback).not.toHaveBeenCalled();

        expect(mockRepository.saveLog).toHaveBeenCalledWith(
            expect.any(LogEntity)
        );

    })

    test('should call errorCallback when the fetch returns false', async () => {

        const wasOk = await checkService.execute('https://gulugulugugule.com');

        expect(wasOk).toBe(false)
        expect(successCallback).not.toHaveBeenCalled();
        expect(errorCallback).toHaveBeenCalled();

        expect(mockRepository.saveLog).toHaveBeenCalledWith(
            expect.any(LogEntity)
        );

    })
})