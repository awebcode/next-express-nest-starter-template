export async function GET(request: Request, { params }: { params: { id: string } }) {
    const id = params.id; // 'a', 'b', or 'c'
    return Response.json({ id, success: true });
}
