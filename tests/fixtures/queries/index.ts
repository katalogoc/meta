import fs from 'fs';
import path from 'path';

const read = (p: string) => fs.readFileSync(path.join(__dirname, p), { encoding: 'utf8' });

export const SAVE_TEXT = read('saveText.gql');
export const SAVE_AUTHOR = read('saveAuthor.gql');
export const GET_AUTHOR = read('getAuthor.gql');
