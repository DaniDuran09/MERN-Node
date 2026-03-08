// @ts-ignore
import { CreateTable } from "../domain/use-cases/create-table.use-case.ts";
// @ts-ignore
import { SaveFile } from "../domain/use-cases/save-file.use.case.ts";

interface RunOptions {
    base: number;
    limit: number;
    showTable: boolean;
    fileName: string;
    fileDestination: string;
}



export class ServerApp {

    static run({ base, limit, showTable, fileName, fileDestination }: RunOptions) {
        console.log('server running...');

        const table = new CreateTable().execute({ base, limit });
        const wasCreated = new SaveFile().execute({
            fileContent: table,
            fileDestination: fileDestination,
            fileName: fileName
        });
        if (showTable) console.log(table);
        (wasCreated) ? console.log('File created') : console.log('File not created');

    }
}