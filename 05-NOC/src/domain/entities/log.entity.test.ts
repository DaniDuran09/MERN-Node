import { LogEntity, LogSeverityLevel } from "./log.entity"

describe('log.entity.ts', () => {

    const dataObj = {
        message: 'Hi everyone',
        level: LogSeverityLevel.high,
        origin: 'log.entity.test.ts'
    }

    test('should create a log entity instance', () => {

        const log = new LogEntity(dataObj);

        expect(log).toBeInstanceOf(LogEntity);
        expect(log.message).toBe(dataObj.message);
        expect(log.level).toBe(dataObj.level);
        expect(log.origin).toBe(dataObj.origin);
        expect(log.createdAt).toBeInstanceOf(Date);

    })

    test(' shoyuld create a LogEntity instance from Json', () => {

        const json = `{"message":"Service https://google.com working","level":"low","createdAt":"2026-05-13T18:11:35.254Z","origin":"check-service.ts"}`

        const log = LogEntity.fromJson(json);

        expect(log).toBeInstanceOf(LogEntity);
        expect(log.message).toBe("Service https://google.com working");
        expect(log.level).toBe(LogSeverityLevel.low);
        expect(log.origin).toBe("check-service.ts");
        expect(log.createdAt).toBeInstanceOf(Date);
    })


    test('should create a log entity instance from Object', () => {

        const log = LogEntity.fromObject(dataObj);

        expect(log).toBeInstanceOf(LogEntity);
        expect(log.message).toBe(dataObj.message);
        expect(log.level).toBe(dataObj.level);
        expect(log.origin).toBe(dataObj.origin);
        expect(log.createdAt).toBeInstanceOf(Date);
    })
})