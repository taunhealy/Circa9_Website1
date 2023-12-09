// app\components\MuxThumbnail\MuxThumbnail.tsx

import React from "react";
import Image from "next/image";

export interface MuxThumbnailProps {
  playbackId?: string | number; // Add startTime prop to set the start time
  width: number;
  height: number;
  time: number;
  style?: React.CSSProperties; // Adjust the type to React.CSSProperties
  src?: string;
}

const MuxThumbnail: React.FC<MuxThumbnailProps> = ({
  playbackId,
  width = 1000,
  height = 1000,
  time = 5,
  style,
}) => {
  const thumbnailUrl = `https://image.mux.com/${playbackId}/thumbnail.png?time=5`;

  return (
    <Image
      src={thumbnailUrl}
      alt="Video Thumbnail"
      width={width}
      height={height}
      style={style} // Include style prop if provided
      onError={(e) => console.error("Error loading thumbnail:", e)}
    />
  );
};

export default MuxThumbnail;
