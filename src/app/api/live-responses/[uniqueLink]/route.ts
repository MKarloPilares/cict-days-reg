const groups = new Map<string, Set<ReadableStreamController<Uint8Array>>>();

export async function GET(
  req: Request,
  { params }: { params: Promise<{ uniqueLink: string }> },
) {
  const { uniqueLink } = await params;

  const stream = new ReadableStream({
    async start(controller) {
      if (!groups.has(uniqueLink)) {
        groups.set(uniqueLink, new Set());
      }

      groups.get(uniqueLink)?.add(controller);

      req.signal.addEventListener("abort", () => {
        groups.get(uniqueLink)?.delete(controller);
      });
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}

export async function POST(
  req: Request,
  { params }: { params: Promise<{ uniqueLink: string }> },
) {
  const { uniqueLink } = await params;
  const result = await req.json();
  const encoder = new TextEncoder();

  const clients = groups.get(uniqueLink) ?? new Set();
  const messageData = JSON.stringify(result);

  clients.forEach(client => {
    client.enqueue(encoder.encode(`data: ${messageData}\n\n`));
  });

  return Response.json({ success: true });
}
