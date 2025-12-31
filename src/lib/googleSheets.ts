import { google } from "googleapis";
import path from "path";

const SHEET_ID = process.env.GOOGLE_SHEET_ID!;
const CREDS_PATH = process.env.GOOGLE_APPLICATION_CREDENTIALS!;

function getAuth() {
  const absoluteCredsPath = path.join(process.cwd(), CREDS_PATH);

  return new google.auth.GoogleAuth({
    keyFile: absoluteCredsPath,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
}

export async function getSheetValues(range: string) {
  const auth = getAuth();
  const sheets = google.sheets({ version: "v4", auth });

  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: SHEET_ID,
    range,
  });

  return res.data.values ?? [];
}
