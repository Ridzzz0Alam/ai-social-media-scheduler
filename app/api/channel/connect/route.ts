

export async function POST(request: Request) {
    try {
        
        
        
        return Response.json({ message: "Connected" });
    } catch (error) {
        return Response.json({ message: "Error connecting" }, { status: 500 });
    }
}