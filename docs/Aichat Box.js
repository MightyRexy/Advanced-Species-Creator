import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function AIChatBox({ prompt }) {
  const [messages, setMessages] = useState([{ role: "system", content: prompt }]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;
    
    const userMessage = { role: "user", content: input };
    setMessages([...messages, userMessage]);
    setInput("");

    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-4",
          messages: [...messages, userMessage],
          max_tokens: 100,
        }),
      });

      const data = await response.json();
      const aiResponse = { role: "ai", content: data.choices[0].message.content };
      setMessages((prev) => [...prev, aiResponse]);
    } catch (error) {
      console.error("Error fetching AI response:", error);
    }
  };

  return (
    <div className="p-4 border rounded-lg w-full max-w-lg">
      <h2 className="text-lg font-bold mb-2">AI Chat Assistant</h2>
      <div className="h-48 overflow-y-auto border p-2 mb-2">
        {messages.map((msg, index) => (
          <p key={index} className={msg.role === "ai" ? "text-blue-600" : "text-black"}>
            <strong>{msg.role === "ai" ? "AI:" : "You:"}</strong> {msg.content}
          </p>
        ))}
      </div>
      <div className="flex gap-2">
        <Input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask the AI..." />
        <Button onClick={sendMessage}>Send</Button>
      </div>
    </div>
  );
}
