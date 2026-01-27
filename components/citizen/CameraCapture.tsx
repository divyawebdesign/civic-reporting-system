"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";

export default function CameraCapture({ onCapture }: { onCapture: (img: string) => void }) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [isCameraOn, setIsCameraOn] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);

  // Start camera
  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user" }, // ensures laptop front camera
        audio: false,
      });

      setStream(mediaStream);
      setIsCameraOn(true);

      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        videoRef.current.play();
      }
    } catch (error) {
      console.error("Error starting camera:", error);
    }
  };

  // Stop camera
  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }
    setIsCameraOn(false);
  };

  // Capture photo
  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const video = videoRef.current;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    const imageData = canvas.toDataURL("image/png");

    setPreviewImage(imageData);
    stopCamera();
    onCapture(imageData); // send photo to ReportForm
  };

  const retake = () => {
    setPreviewImage(null);
    startCamera();
  };

  return (
    <div className="space-y-3">
      {/* Button to open camera if no preview */}
      {!isCameraOn && !previewImage && (
        <Button type="button" onClick={startCamera} className="w-full">
          Open Camera
        </Button>
      )}

      {/* Live Camera Preview */}
      {isCameraOn && (
        <div className="flex flex-col items-center">
          <video
            ref={videoRef}
            className="w-full rounded-md border"
            autoPlay
          />

          <Button type="button" onClick={capturePhoto} className="mt-2 w-full">
            Capture
          </Button>
        </div>
      )}

      {/* Captured Image */}
      {previewImage && (
        <div className="flex flex-col items-center space-y-2">
          <img src={previewImage} alt="Captured" className="w-full rounded-md border" />

          <Button type="button" variant="outline" onClick={retake} className="w-full">
            Retake
          </Button>
        </div>
      )}

      <canvas ref={canvasRef} className="hidden"></canvas>
    </div>
  );
}
