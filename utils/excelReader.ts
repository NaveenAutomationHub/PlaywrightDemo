import * as XLSX from 'xlsx';
import path from 'path';

export type LoginData = {
    username: string;
    password: string;
    expected: string;
    run: boolean;
};

export function readExcel(filePath: string, sheetName: string): LoginData[] {
    const fullPath = path.resolve(filePath);
    console.log('Full Path is ', fullPath);

    const workbook = XLSX.readFile(fullPath);
    const sheet = workbook.Sheets[sheetName];
    const data = XLSX.utils.sheet_to_json<Record<string, unknown>>(sheet, { defval: '' });

    return data.map((row) => ({
        username: String(row.username ?? '').trim(),
        password: String(row.password ?? '').trim(),
        expected: String(row.expected ?? '').trim().toLowerCase(),
        run: String(row.run ?? 'false').trim().toLowerCase() === 'true' || String(row.run ?? 'false').trim().toLowerCase() === 'yes'
    }));
}