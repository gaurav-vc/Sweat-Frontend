import React from 'react';
import { motion } from 'framer-motion';

export const MediaRenderer = ({ src, alt, className, style, ...props }) => {
  if (!src) return null;

  // Check if it's a video by looking at the extension or content
  const isVideo = src.match(/\.(mp4|webm|ogg)$/i) || src.includes('video');

  if (isVideo) {
    return (
      <video
        src={src}
        autoPlay
        loop
        muted
        playsInline
        className={className}
        style={{ width: '100%', height: '100%', objectFit: 'cover', ...style }}
        {...props}
      />
    );
  }

  // Fallback to Image
  // Using motion.img by default to support animation props if passed
  return (
    <motion.img
      src={src}
      alt={alt || "Media content"}
      className={className}
      style={{ width: '100%', height: '100%', objectFit: 'cover', ...style }}
      {...props}
    />
  );
};
