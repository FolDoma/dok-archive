import type { NextApiRequest, NextApiResponse } from 'next';
import Papa from 'papaparse';

type SheetRow = Record<string, string>; // or `unknown` if values can be anything

export default async function handler(
    req: NextApiRequest, res: NextApiResponse
) {
    try {
        const sheetId = '1s6ux3b-k5z6-8eyWzYIe5UW951DYZmJfMLG7alyWRk4';
        const gid = '0';
        const url = `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv&id=${sheetId}&gid=${gid}`;

        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Failed to fetch sheet');
        }

        const csv = await response.text();

        // Tell TS each row is a SheetRow object
        const parsed = Papa.parse<SheetRow>(csv, { header: true }).data;

        // Filter empty rows and reverse
        const jsonData = parsed
            .filter((row): row is SheetRow => Object.values(row).some(Boolean))
            .reverse();

        res.status(200).json({ data: jsonData });
    } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'Unknown error';
        res.status(500).json({ error: message });
    }
}
