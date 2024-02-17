import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest | Request, res: NextApiResponse) {
  return NextResponse.json({ name: "File uploaded" });
}
