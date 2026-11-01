import fs from 'fs';  //Imports Node.js File System (fs) module.
import path from 'path' //Provides utilities for handling file and directory paths.
import { parse } from 'csv-parse/sync'; //Imports the synchronous CSV parser > Converts CSV text into JavaScript objects.

export function readCSV(filePath: string){   //Creates a reusable function.

    // const fullPath = path.resolve(filePath);
    // console.log ('Full File Path ', fullPath)

    const fileContent = fs.readFileSync(filePath);  //Reads the CSV file content into memory.

    const records = parse(fileContent,{
        columns:true,
        skip_empty_lines: true
    });
    return records;
}