import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json(); // Parse the JSON body
    console.log("data:", body);

    const { userId } = body; // Extract userId
    if (!userId) {
      return NextResponse.json({ error: "userId is required" }, { status: 400 });
    }

    console.log("userId from /api/cookiesetter:", userId);

    // Create a response
    const response = NextResponse.json({ message: "Cookie set successfully" });

    // Set headers and cookies
    response.headers.set("X-AUTH-COOKIE", "true");
    response.cookies.set("sessionId-forAuth", userId, {
      maxAge: 24 * 60 * 60, // 1 day
      path: "/", // Cookie available site-wide
    });

    // Debugging logs
    console.log("Response header X-AUTH-COOKIE ----------------->", response.headers.get("X-AUTH-COOKIE"));
    console.log("Response cookies sessionId-forAuth---------------->", {
      name: "sessionId-forAuth",
      value: userId,
      maxAge: 86400,
      path: "/",
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
    });

    return response;
  } catch (error) {
    console.error("Error in /api/cookiesetter:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
};

export const config = {
  matcher: "/api/cookiesetter",
};
