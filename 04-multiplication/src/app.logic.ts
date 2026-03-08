import fs from 'node:fs';
// @ts-ignore
import { yarg } from './config/plugins/args.plugin.ts'

let outputMessage = ''
const { b: base, l: limit, s: showTable } = yarg;
const output = 'outputs';
const header = `
===========================
        Tabla del ${base}
===========================
`

for (let i = 1; i <= limit; i++) {
    outputMessage += `${base} x ${i} = ${base * i} \n`;
}

outputMessage = header + outputMessage;

if (showTable) {
    console.log(outputMessage);
}
