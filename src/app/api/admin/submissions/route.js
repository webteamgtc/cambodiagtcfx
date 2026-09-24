import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/adminAuth";
import { listCambodiaFormSubmissions } from "@/lib/cambodiaFormDb";

export async function GET(req) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const limit = searchParams.get("limit");
    const skip = searchParams.get("skip");

    const data = await listCambodiaFormSubmissions({ limit, skip });
    return NextResponse.json({ success: true, ...data });
  } catch (error) {
    console.error("[admin/submissions]", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to load submissions",
        details: process.env.NODE_ENV === "development" ? error.message : undefined,
      },
      { status: 500 }
    );
  }
}
