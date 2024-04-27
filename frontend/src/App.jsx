import { useState } from "react";
import { Configuration, OpenAIApi } from "openai";
import "./App.css";
import Lottie from "react-lottie";
import animationData from "./assets/dino-lottie.json";

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

function App() {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [placeholder, setPlaceholder] = useState(
    "A teddy bear that is a Warriors superfan"
  );
  const [animatedResult, setAnimatedResult] = useState("");

  const configuration = new Configuration({
    apiKey: import.meta.env.VITE_Open_AI_Key,
  });

  const openai = new OpenAIApi(configuration);

  const animateImage = async () => {
    try {
      const response = await fetch("https://your-animation-api.com/animate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageUrl: result }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setAnimatedResult(data.animatedImageUrl);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const generateImage = async () => {
    setPlaceholder(`Search ${prompt}..`);
    setLoading(true);
    const res = await openai.createImage({
      prompt: prompt,
      n: 1,
      size: "512x512",
    });
    setLoading(false);
    setResult(res.data.data[0].url);
  };

  return (
    <div className="app-main">
      {loading ? (
        <>
          <h2>Generating...Please Wait...</h2>
          <div class="lds-ripple">
            <div></div>
            <div></div>
          </div>
        </>
      ) : (
        <>
          <h1>Animasaurus</h1>
          <div className="app-columns">
            <div className="input-column">
              <Lottie options={defaultOptions} height={200} width={200} />
            </div>
            <div className="input-column">
              <h2>Describe your character</h2>
              <textarea
                className="app-input"
                placeholder={placeholder}
                onChange={(e) => setPrompt(e.target.value)}
                rows="10"
                cols="40"
              />
              <button onClick={generateImage}>Generate</button>
              {result.length > 0 ? (
                <img className="result-image" src={result} alt="result" />
              ) : (
                <></>
              )}
            </div>
            <div className="output-column">
              <h2>Animate your character</h2>
              <button onClick={animateImage}>Animate</button>
              {animatedResult && (
                <img src={animatedResult} alt="Animated result" />
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
