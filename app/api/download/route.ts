import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const fileUrl = searchParams.get("url");
  const fileName = searchParams.get("name") || "downloaded-file";

  if (!fileUrl) {
    return NextResponse.json(
      { error: "No file URL provided" },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(fileUrl, { cache: "no-store" });

    if (!response.ok) {
      throw new Error("Failed to fetch file");
    }

    const fileBuffer = await response.arrayBuffer();
    return new Response(fileBuffer, {
      headers: {
        "Content-Disposition": `attachment; filename="${fileName}"`,
        "Content-Type":
          response.headers.get("Content-Type") || "application/octet-stream",
      },
    });
  } catch (error) {
    console.error("Error fetching file:", error);
    return NextResponse.json(
      { error: "Failed to download file" },
      { status: 500 }
    );
  }
}
