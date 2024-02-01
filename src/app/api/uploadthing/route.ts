import { createRouteHandler } from "uploadthing/next";
import { UTApi } from "uploadthing/server";
import { ourFileRouter } from "./core";
import { NextRequest } from "next/server";

export const { GET, POST } = createRouteHandler({
  router: ourFileRouter
});

export async function DELETE(req: NextRequest) {
  const utapi = new UTApi();

  const { files } = await req.json() as { files: string[] };
  
  if (!files) {
    return Response.json({ error: "files is required" }, { status: 400 });
  }

  if (typeof files === "string") {
    return Response.json({ error: "files must be an array" }, { status: 400 });
  }

  if (files.length === 0) {
    return Response.json({ error: "files must not be empty" }, { status: 400 });
  }

  try {
    return Response.json(await utapi.deleteFiles(files));
  } catch (e: any) {
    return Response.json({ error: e.message }, { status: 500 });
  }
}