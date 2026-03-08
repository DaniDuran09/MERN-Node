export interface CreateTableUseCase {
    execute: ( options: CreateTableOptons) => string;
}
export interface CreateTableOptons{
    base:number;
    limit?:number;
}
export class CreateTable implements CreateTableUseCase {

    constructor() {
        //DI - DEPENDENCY INJECTION
    }
    execute({base, limit = 10}:CreateTableOptons){
        let outputMessage = "";
        for (let i = 1; i <= limit; i++) {
            outputMessage += `${base} x ${i} = ${base * i} \n`;
        }
        return outputMessage;
    }

}