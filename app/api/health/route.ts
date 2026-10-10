export const dynamic = "force-dynamic";

export function GET() {
  return Response.json({
    status: "ok",
    service: "project01",
    timestamp: new Date().toISOString()
  });
}
