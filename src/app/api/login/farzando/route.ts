import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { getSheetValues } from "@/lib/googleSheets";

export async function POST(req: Request) {
  try {
    const { itsNo, password } = await req.json();

    if (!itsNo || !password) {
      return NextResponse.json(
        { error: "Missing ITS No or password" },
        { status: 400 }
      );
    }

    // Read entire Farzando sheet
    const rows = await getSheetValues("Farzando!A2:Z");

    for (const row of rows) {
      const [
        ITS_NO,
        ,
        ,
        ,
        ,
        ,
        ,
        ,
        ,
        ,
        PASSWORD,
        ACTIVE,
      ] = row;

      if (String(ITS_NO) === String(itsNo)) {
        if (ACTIVE !== "TRUE") {
          return NextResponse.json(
            { error: "Account is inactive" },
            { status: 403 }
          );
        }

        const isValid = await bcrypt.compare(password, PASSWORD);

        if (!isValid) {
          return NextResponse.json(
            { error: "Invalid credentials" },
            { status: 401 }
          );
        }

        return NextResponse.json({
          success: true,
          role: "farzando",
          itsNo,
        });
      }
    }

    return NextResponse.json(
      { error: "ITS No not found" },
      { status: 404 }
    );
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message ?? "Server error" },
      { status: 500 }
    );
  }
}
