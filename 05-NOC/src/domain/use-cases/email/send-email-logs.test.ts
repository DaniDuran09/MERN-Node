
import { LogEntity } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository";
import { SendEmailLogs } from "./send-email-logs"


describe('SendEmailLogs()', () => {


    const mockEmailSservice = {
        sendEmailWithFileSystemLogs: jest.fn().mockReturnValue(true),
    }

    const mockLogRepository: LogRepository = {
        saveLog: jest.fn(),
        getLogs: jest.fn(),
    }


    const sendEmailLogs = new SendEmailLogs(
        mockEmailSservice as any,
        mockLogRepository
    );

    beforeEach(() => {
        jest.clearAllMocks();
    })

    test('should call senEmail and saveLog', async () => {

        const sendEmailLogs = new SendEmailLogs(
            mockEmailSservice as any,
            mockLogRepository
        );

        const result = await sendEmailLogs.execute('daniel@google.com')
        expect(result).toBe(true);
        expect(mockEmailSservice.sendEmailWithFileSystemLogs).toHaveBeenCalledTimes(1)
        expect(mockLogRepository.saveLog).toHaveBeenCalledWith(expect.any(LogEntity))
        expect(mockLogRepository.saveLog).toHaveBeenCalledWith({
            createdAt: expect.any(Date),
            level: 'low',
            message: 'Log email sent',
            origin: 'send-email-logs.ts',
        })
    })

    test('should log in case of error', async () => {

        mockEmailSservice.sendEmailWithFileSystemLogs.mockResolvedValue(false);

        const result = await sendEmailLogs.execute('daniel@google.com')
        expect(result).toBe(false);
        expect(mockEmailSservice.sendEmailWithFileSystemLogs).toHaveBeenCalledTimes(1)
        expect(mockLogRepository.saveLog).toHaveBeenCalledWith(expect.any(LogEntity))
        expect(mockLogRepository.saveLog).toHaveBeenCalledWith({
            createdAt: expect.any(Date),
            level: 'high',
            message: 'Error: Email log not sent',
            origin: 'send-email-logs.ts',
        })
    })


})