import { NextRequest, NextResponse } from "next/server";
import { readFileSync, readdirSync } from "fs";
import path from "path";
import { getTestDatasets } from "@/data/tests";

export async function GET(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Missing 'id' query parameter" }, { status: 400 });
  }

  const datasets = getTestDatasets();
  const dataset = datasets.find((d) => d.id === id);
  if (!dataset) {
    return NextResponse.json({ error: `Test dataset '${id}' not found` }, { status: 404 });
  }

  const datasetDir = path.join(process.cwd(), "data", id);

  try {
    const files = readdirSync(datasetDir);

    const images = files
      .filter((f) => f !== "form.json")
      .map((filename) => {
        const filePath = path.join(datasetDir, filename);
        const buffer = readFileSync(filePath);
        const ext = path.extname(filename).toLowerCase().slice(1);
        const mimeType = ext === "jpg" || ext === "jpeg" ? "image/jpeg" : `image/${ext}`;
        const base64 = buffer.toString("base64");
        return {
          name: filename,
          type: mimeType,
          content: `data:${mimeType};base64,${base64}`,
        };
      });

    const jsonPath = path.join(datasetDir, "form.json");
    const surveyJson = readFileSync(jsonPath, "utf-8");

    return NextResponse.json({ images, surveyJson });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to read test data files";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
