import React, { useState, useRef } from "react";
import girlRoom from "/girl-room.webp";

const MysteryGame = () => {
  const [message, setMessage] = useState("");
  const [tries, setTries] = useState(3);
  const [disabled, setDisabled] = useState(false);
  const [winGlow, setWinGlow] = useState(false);
  const imgRef = useRef<HTMLImageElement | null>(null);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (disabled) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const img = imgRef.current;
    if (!img) return;

    const width = img.clientWidth;
    const height = img.clientHeight;

    // Adjusted for smaller 250px image
    // (Handle is still near top-right of the door, smaller region)
    const handleX = 0.78; // 78% from left
    const handleY = 0.26; // 26% from top
    const handleW = 0.07; // width zone
    const handleH = 0.07; // height zone

    const hit =
      x >= width * handleX &&
      x <= width * (handleX + handleW) &&
      y >= height * handleY &&
      y <= height * (handleY + handleH);

    if (hit) {
      setMessage(
        "🎉 Correct! The door handle is on the outside — which doesn’t make sense!"
      );
      setDisabled(true);
      setWinGlow(true);
      setTimeout(() => setWinGlow(false), 3000);
    } else {
      if (tries > 1) {
        setTries(tries - 1);
        setMessage(`❌ Not quite... ${tries - 1} tries left.`);
      } else {
        setMessage("💡 Out of tries! Try again!");
        setTries(3);
      }
    }
  };

  return (
    <div className="mt-32 flex flex-col md:flex-row items-center justify-center gap-10 max-w-6xl mx-auto px-6 relative">
      {winGlow && (
        <div className="absolute inset-0 bg-primary/40 animate-pulse-glow z-10 rounded-3xl"></div>
      )}

      {/* Left text */}
      <div className="md:w-1/2 text-center md:text-left z-20">
        <h2 className="text-4xl font-semibold text-primary mb-4">
          The Mystery in the Room
        </h2>
        <p className="text-muted-foreground mb-6">
        The void lies in a malfunction in this room ... You have <strong>3 tries</strong> to figure out what it is. Tap the image to guess!.
        </p>
        <p className="text-primary font-medium min-h-[40px] transition-all duration-300">
          {message}
        </p>
      </div>

      {/* Right image */}
      <div
        className="relative md:w-1/2 cursor-pointer z-20"
        onClick={handleClick}
        style={{ position: "relative", width: "100%", maxWidth: "250px" }}
      >
        <img
          ref={imgRef}
          src={girlRoom}
          alt="Girl Room Game"
          className="w-full rounded-xl shadow-lg hover:scale-[1.02] transition-transform duration-300"
        />
      </div>
    </div>
  );
};

export default MysteryGame;


