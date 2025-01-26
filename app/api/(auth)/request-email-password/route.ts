import axios from "axios";
import "dotenv/config";
const API_URL = process.env.API_URL;
export async function POST(req: Request) {
  const data = await req.json();
  console.log(data.userEmail);
  try {
    const response = await axios.post(`${API_URL}/password-request`, {
      email: data.userEmail,
    });
    return new Response(JSON.stringify(response.data), {
      status: response.status,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.log("this error" + (err as Error).message);
    return new Response(
      JSON.stringify({
        status: 500,
        message: (err as Error).message || "Internal server error",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
