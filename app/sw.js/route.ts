export async function GET() {
    return new Response('', {
        status: 200,
        headers: {
            'Content-Type': 'application/javascript',
            'Cache-Control': 'no-cache, no-store, must-revalidate',
        },
    })
}
