#!/usr/bin/node
import gutenbergImport from '../import/gutenberg';

async function main() {
    for await (const doc of gutenbergImport()) {
        console.log(doc);
    }
}

main();