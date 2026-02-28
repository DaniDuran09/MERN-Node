import fs from 'node:fs';

let outputMessage = ''
const base = 6;
const output = 'outputs';
const header = `
===========================
        Tabla del ${base}
===========================
`
for (let i = 1; i <= 10; i++) {
    outputMessage += `${base} x ${i} = ${base * i} \n`;
}

outputMessage = header + outputMessage;

fs.mkdirSync(output, { recursive: true });
fs.writeFileSync(`outputs/tabla-${base}.txt`, outputMessage);
console.log(`Tabla del ${base} creada`);