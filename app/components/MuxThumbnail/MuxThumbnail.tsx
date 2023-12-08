import React from "react";
import Image from "next/image";

interface MuxThumbnailProps {
  playbackId?: string | number; // Add startTime prop to set the start time
  width: number;
  height: number;
  time: number;
}

const MuxThumbnail: React.FC<MuxThumbnailProps> = ({
  playbackId,
  width = 214,
  height = 121,
  time = 5,
}) => {
  const thumbnailUrl = `https://image.mux.com/${playbackId}/thumbnail.png?width=${width}&height=${height}&time=${time}`;

  return (
    <Image
      src={thumbnailUrl}
      alt="Video Thumbnail"
      width={width}
      height={height}
    />
  );
};

export default MuxThumbnail;
