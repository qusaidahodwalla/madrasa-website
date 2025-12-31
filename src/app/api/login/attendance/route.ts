import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { getSheetValues } from "@/lib/googleSheets";

export async function POST(req: Request) {
  try {
    const { itsNo, password } = await req.json();

    if (!itsNo || !password) {
      return NextResponse.json({ error: "Missing ITS No or password" }, { status: 400 });
    }

    const rows = await getSheetValues("Attendance Team!A2:Z");

    for (const row of rows) {
      const [ITS_NO, , , , PASSWORD_HASH, ACTIVE] = row;

      if (String(ITS_NO) === String(itsNo)) {
        if (String(ACTIVE).toUpperCase() !== "TRUE") {
          return NextResponse.json({ error: "Account is inactive" }, { status: 403 });
        }

        const ok = await bcrypt.compare(password, String(PASSWORD_HASH ?? ""));
        if (!ok) {
          return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
        }

        return NextResponse.json({ success: true, role: "attendance", itsNo });
      }
    }

    return NextResponse.json({ error: "ITS No not found" }, { status: 404 });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message ?? "Server error" }, { status: 500 });
  }
}
