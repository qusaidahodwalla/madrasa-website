import { NextResponse } from "next/server";
import { google } from "googleapis";
import path from "path";

export async function GET() {
  try {
    const sheetId = process.env.GOOGLE_SHEET_ID;
    const credsPath = process.env.GOOGLE_APPLICATION_CREDENTIALS;

    if (!sheetId || !credsPath) {
      return NextResponse.json(
        { ok: false, error: "Missing env vars" },
        { status: 500 }
      );
    }

    const absoluteCredsPath = path.join(process.cwd(), credsPath);

    const auth = new google.auth.GoogleAuth({
      keyFile: absoluteCredsPath,
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth });

    const meta = await sheets.spreadsheets.get({
      spreadsheetId: sheetId,
    });

    const tabs =
      meta.data.sheets?.map((s) => s.properties?.title).filter(Boolean) ?? [];

    return NextResponse.json({ ok: true, tabs });
  } catch (err: any) {
    return NextResponse.json(
      { ok: false, error: err?.message ?? String(err) },
      { status: 500 }
    );
  }
}
