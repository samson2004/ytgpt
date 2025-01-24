import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    console.log("Body from api/openai:", body);

    const secret_openai_key = process.env.NEXT_OPENAI_SECRET_KEY || "your_openai_api_key_here";
    console.log(secret_openai_key);

    // if (!secret_openai_key) {
    //   return NextResponse.json({ error: "OpenAI API key is not set" }, { status: 500 });
    // }

    // if (!body.prompt) {
    //   return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
    // }

    // // Send request to OpenAI API
    // const openaiResponse = await fetch("https://api.openai.com/v1/chat/completions", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: `Bearer ${secret_openai_key}`,
    //   },
    //   body: JSON.stringify({
    //     model: "gpt-4", // Specify the model to use
    //     messages: [
    //       { role: "system", content: "You are a helpful assistant that summarizes YouTube videos into one major title, points and subheadings." },
    //       { role: "user", content: body.prompt },
    //     ],
    //     temperature: 0.7, // Adjust the creativity level
    //     max_tokens: 500, // Limit the response length
    //   }),
    // });

    // if (!openaiResponse.ok) {
    //   const error = await openaiResponse.json();
    //   console.log("Error from OpenAI API:", error);
    //   return NextResponse.json({ error: "Failed to fetch OpenAI API response", details: error }, { status: 500 });
    // }

    // const openaiData = await openaiResponse.json();
    // console.log("Response from OpenAI API:", openaiData);

    // // Extract the response content
    // const content = openaiData.choices[0]?.message?.content || "No content received";

    // return NextResponse.json({ content }, { status: 200 });
    return NextResponse.json({
      "id": "cmpl-xxxxxxxxxxxx",
      "object": "chat.completion",
      "created": 1677888100,
      "model": "gpt-4",
      "choices": [
        {
          "message": {
            "role": "assistant",
            "content": "### Title: Mastering Productivity: Simple Habits for Success\n\n#### 1. **Understanding Productivity**\n- Productivity is about maximizing output with minimal wasted effort.\n- Focus on managing time and energy effectively.\n\n#### 2. **Building a Morning Routine**\n- Start your day with a clear goal and a structured plan.\n- Engage in activities like journaling, meditation, or exercise to prepare mentally and physically.\n\n#### 3. **Eliminating Distractions**\n- Identify common distractions like social media and set boundaries.\n- Use tools like \"Do Not Disturb\" mode or productivity apps to stay focused.\n\n#### 4. **Adopting the Pomodoro Technique**\n- Work in short intervals (e.g., 25 minutes), followed by 5-minute breaks.\n- Helps maintain focus and prevents burnout over long work sessions.\n\n#### 5. **Prioritizing Self-Care**\n- Maintain good sleep hygiene to boost cognitive performance.\n- Eat healthy meals and stay hydrated throughout the day.\n\n#### 6. **Reflecting and Adjusting**\n- Review your daily performance and identify areas for improvement.\n- Be flexible and adapt your strategies as needed.\n\n**Conclusion:** By integrating these habits into your routine, you can significantly improve your productivity and achieve your goals efficiently."
          },
          "finish_reason": "stop",
          "index": 0
        }
      ],
      "usage": {
        "prompt_tokens": 120,
        "completion_tokens": 300,
        "total_tokens": 420
      }
    } ,{status:200});
  } catch (error) {
    console.log("Error in /api/openai/summarize:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
};
