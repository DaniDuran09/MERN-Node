import nodemailer from "nodemailer";
import { EmailService, SendMailOptions } from "./email.service"

describe('EmailService', () => {

    const mockSendMail = jest.fn();

    nodemailer.createTransport = jest.fn().mockReturnValue({
        sendMail: mockSendMail
    })

    const emailService = new EmailService();

    beforeEach(() => {
        jest.clearAllMocks();
    })

    test('should send an email', async () => {

        const options: SendMailOptions = {
            to: 'daniel@google.com',
            subject: 'Logs del servidor',
            htmlBody: `<h1>Logs del servidor</h1>`
        }

        await emailService.sendEmail(options);

        expect(mockSendMail).toHaveBeenLastCalledWith({
            to: 'daniel@google.com',
            subject: 'Logs del servidor',
            html: `<h1>Logs del servidor</h1>`,
            attachments: expect.any(Array)
        })
    })


    test(' send email with attachments', async () => {

        const email = 'daniel@google.com';


        await emailService.sendEmailWithFileSystemLogs(email);

        expect(mockSendMail).toHaveBeenCalledWith({
            to: email,
            subject: 'Logs del servidor',
            html: expect.any(String),
            attachments: expect.arrayContaining([
                { filename: 'logs-all.log', path: './logs/logs-all.log' },
                { filename: 'logs-high.log', path: './logs/logs-high.log' },
                { filename: 'logs-medium.log', path: './logs/logs-medium.log' }
            ])
        })
    })
})