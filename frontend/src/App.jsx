import { useState } from "react";
import OpenAI from "openai";
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

  const openai = new OpenAI({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
  });

  const animateImage = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://127.0.0.1:5000/animate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageUrl: result }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const blob = await response.blob();
      const reader = new FileReader();
      reader.onloadend = function () {
        const base64data = reader.result;
        setLoading(false);
        setAnimatedResult(base64data);
      };
      reader.readAsDataURL(blob);
    } catch (error) {
      console.error("Error:", error);
      setLoading(false);
    }
  };

  const generateImage = async () => {
    setPlaceholder(`Generate ${prompt}...`);
    setLoading(true);
    const res = await openai.images.generate({
      model: "dall-e-3",
      prompt:
        prompt +
        " style: cute 2d image, arms and legs stretching out, white background only, no shadow",
      n: 1,
      size: "1024x1024",
    });
    setLoading(false);
    setResult(res.data[0].url);
  };

  return (
    <div className="app-main">
      {loading ? (
        <>
          <div>
            <h2 className="animate-progress">Animagic in process...</h2>
            <div>
              <Lottie options={defaultOptions} height={600} width={600} />
            </div>
          </div>
        </>
      ) : (
        <>
          <Lottie options={defaultOptions} height={150} width={150} />
          <img src="/logo.svg" alt="Your image" height={80} width={1000} />
          <br />
          <div className="app-columns">
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
                <img
                  src={animatedResult}
                  alt="Animated result"
                  width="500"
                  height="500"
                />
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
