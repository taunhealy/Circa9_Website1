// MuxGIF.tsx
import React from "react";
import "./muxgif.scss";

interface MuxGIFProps {
  gifUrl: string;
  width: number;
  height: number;
}

const MuxGIF: React.FC<MuxGIFProps> = ({ gifUrl, width, height }) => {
  return (
    <div className="gif-container">
      <img
        className="gif-frame"
        src={gifUrl}
        alt="Animated GIF"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transform: "scale(0.875)",
          aspectRatio: `${width} / ${height}`,
        }}
      />
    </div>
  );
};

export default MuxGIF;
