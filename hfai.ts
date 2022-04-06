import {
    parse,
    difference,
} from 'https://deno.land/std@0.133.0/datetime/mod.ts';

const args = Deno.args;

/** Exits the application with the given error message. */
function exit(error: string): never {
    console.error(error);
    Deno.exit(1);
}

if (args.length != 1) {
    exit('expected at least one argument!');
}

/** A list of currently supported date formats. */
const formats = [
    'yyyy-MM-dd',
    'yyyy/MM/dd',
    'yyyy.MM.dd',
    'dd-MM-yyyy',
    'dd/MM/yyyy',
    'dd.MM.yyyy',
    'MM-dd',
    'MM/dd',
    'MM.dd',
    'dd-MM',
    'dd/MM',
    'dd.MM',
];

let date: Date | null = null;

for (let i = 0; i < formats.length; i++) {
    try {
        date = parse(args[0], formats[i]);
        break;
    } catch {
        continue;
    }
}

if (date) {
    const today = new Date();
    console.log(
        difference(today, date, { units: ['years', 'months', 'weeks', 'days'] })
    );
} else {
    exit('unexpected/unsupported date format!');
}
