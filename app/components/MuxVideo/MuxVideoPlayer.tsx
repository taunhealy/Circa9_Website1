// Import necessary libraries and styles
import React from "react";
import MuxVideo from "@mux/mux-video-react";
import "./muxvideo.scss";

// Define the props for the MuxVideoPlayer component
interface MuxVideoPlayerProps {
  playbackId?: string;
  videoTitle?: string;
  autoPlay?: boolean;
  muted?: boolean;
  startTime?: number; // Add startTime prop to set the start time
  src?: string;
}

// Define the MuxVideoPlayer component
const MuxVideoPlayer: React.FC<MuxVideoPlayerProps> = ({
  playbackId,
  videoTitle,
  autoPlay = true,
  muted = true,
  startTime = 15, // Default start time is set to 15 seconds
}) => {
  return (
    <div className="video-container">
      {/* Use MuxVideo component and pass the startTime prop */}
      <MuxVideo
        className="video-frame"
        playbackId={playbackId}
        streamType="on-demand"
        controls={false}
        autoPlay={autoPlay}
        loop
        muted={muted}
        // Set the startTime prop for the video
        startTime={startTime}
      />
    </div>
  );
};

// Export the MuxVideoPlayer component
export default MuxVideoPlayer;
