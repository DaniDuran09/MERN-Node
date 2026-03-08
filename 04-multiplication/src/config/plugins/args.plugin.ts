import yargs from 'yargs';
import { hideBin } from 'yargs/helpers'

export const yarg = yargs(hideBin(process.argv))
    .option('b', {
        alias: 'base',
        type: 'number',
        demandOption: true,
        describe: 'multiplication table base',
    })
    .option('l', {
        alias: 'limit',
        type: 'number',
        default: 10,
        describe: 'limit of table',
    })
    .option('s', {
        alias: 'show',
        type: 'boolean',
        default: false,
        describe: ' show multiplication table'
    })
    .option('n', {
        alias: 'name',
        type: 'string',
        default: 'table',
        describe: 'name of file'
    })
    .option('d', {
        alias: 'destination',
        type: 'string',
        default: 'outputs',
        describe: 'destination file'
    })
    .check((argv, options) => {
        if (argv.b < 1) throw "error: base should be greater than 0"
        return true
    })
    .parseSync();

