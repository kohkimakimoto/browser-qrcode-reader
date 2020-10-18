import { useEffect, useRef, useState } from "react";
import Head from "next/head";
import jsQR from "jsqr";
import { Modal } from "../components/modal";
import { useInterval } from "../hooks/useInterval";

export default function Index() {
  const videoRef = useRef({} as HTMLVideoElement);
  const canvasRef = useRef({} as HTMLCanvasElement);
  const [modalShown, setModalShown] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [data, setData] = useState("");

  useEffect(() => {
    (async () => {
      const { mediaDevices } = navigator;
      const video = videoRef.current;
      const canvas = canvasRef.current;

      if (mediaDevices && video !== null && canvas !== null) {
        const stream = await mediaDevices.getUserMedia({
          audio: false,
          video: {
            facingMode: {
              exact: 'environment',
            },
          },
        });
        video.srcObject = stream;
        video.onloadedmetadata = () => {
          setVideoLoaded(true);
        };
      }
    })().catch((err) => {
      console.log(err);
    });
  }, []);

  useInterval(() => {
    if (!videoLoaded) return;
    if (modalShown) return;
    if (data !== "") return;

    // check whether QR code exists.
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const code = jsQR(imageData.data, canvas.width, canvas.height);
    if (code) {
      setData(code.data);
      setModalShown(true);
    }
  }, 1000);

  const handleCloseModle = () => {
    setModalShown(false);
    setData("");
  };

  return (
    <>
      <Head>
        <title>Browser QRcode Reader</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="bg-white">
        <video
          id="video-area"
          ref={videoRef}
          className="min-h-full min-w-full fixed right-0 bottom-0"
          autoPlay
          playsInline
        ></video>
        <div className="hidden">
          <canvas id="canvas-area" ref={canvasRef}></canvas>
        </div>
        <Modal shown={modalShown} onClose={handleCloseModle} data={data} />
      </div>
    </>
  );
}
