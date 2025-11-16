import { useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import "./App.css";

export default function App() {
  const [prompt, setPrompt] = useState("");
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);

  const askAi = async () => {
    setLoading(true);
    setReply("");

    try {
      const res = await fetch("https://neightn.styra.in/webhook/react-to-openai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();
      setReply(data.message.content);
      console.log("Response from n8n:", data);
    } catch (error) {
      console.error("Error:", error);
      setReply("❌ Error fetching response.");
    }

    setLoading(false);
  };

  return (
    <div className="container">
      <h1 className="title">Mini AI Assistant</h1>

      <textarea
        className="input-box"
        placeholder="Ask something..."
        onChange={(e) => setPrompt(e.target.value)}
      />

      <button className="send-btn" onClick={askAi} disabled={loading}>
        {loading ? "Processing..." : "Send"}
      </button>

      {/* Loader */}
      {loading && (
        <div className="loader">
          <CircularProgress />
          <p>Generating response...</p>
        </div>
      )}

      {/* Reply */}
      {reply && !loading && (
        <div className="response-box">
          <h3>AI Response:</h3>
          <p>{reply}</p>
        </div>
      )}
    </div>
  );
}
