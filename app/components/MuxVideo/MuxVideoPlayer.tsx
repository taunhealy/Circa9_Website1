"use client";

import React from "react";
import MuxVideo from "@mux/mux-video-react";
import "./muxvideo.scss";

interface MuxVideoPlayerProps {
  playbackId: string;
  videoTitle?: string;
  autoPlay?: boolean;
  muted?: boolean;
}

const MuxVideoPlayer: React.FC<MuxVideoPlayerProps> = ({
  playbackId,
  videoTitle,
  autoPlay = true,
  muted = true,
}) => {
  return (
    <MuxVideo
      style={{ height: "100%", maxWidth: "100%" }}
      playbackId={playbackId}
      streamType="on-demand"
      controls={false}
      autoPlay={autoPlay}
      loop
      muted={muted}
    />
  );
};

export default MuxVideoPlayer;
