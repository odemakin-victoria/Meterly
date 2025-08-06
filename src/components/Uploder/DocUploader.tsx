import React, { useEffect, useRef, useState } from "react";
import uploadIcon from "../../../public/assets/images/uploadIcon2.svg";
import Image from "next/image";
import { trimWithEllipses } from "@/utils";

type WebCamProps = {
  getImage?: (image: string) => void;
  sizeLimit?: number;
  showtext?: boolean;
  hasName?: string;
  isRequired?: boolean;
  uploadMsg?: string;
  showCaption?: boolean;
  labelClassName?: string;
  isImageOnly?: boolean;
  name?: string;
  getFileExt?: (val: any) => void;
  selectOptions?: string[];
  handleSelectOption?: (val: string) => void;
  placeholder: string;
};

const DocUploadCompact: React.FC<WebCamProps> = ({
  getImage,
  showtext = false,
  sizeLimit,

  isRequired,
  showCaption,

  isImageOnly = false,
  getFileExt,
  name = "fileInput",
  hasName,
  handleSelectOption,
  placeholder,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState({
    file: "",
    extension: "",
    name: "",
  });
  const [imageName, setImageName] = useState<string | null>(null);
  const [showWebcam, setShowWebcam] = useState<boolean>(false);
  const [showImageUpload, setShowImageUpload] = useState<boolean>(false);
  const [mediastream, setMediaStream] = useState<MediaStream | null>();
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if ((getImage || getFileExt) && imageSrc) {
      if (getFileExt) {
        getFileExt(imageFile);
      } else getImage && getImage(imageSrc || "");
    }
  }, [imageSrc]);

  useEffect(() => {
    return () => {
      stopWebcam();
    };
  }, []);
  useEffect(() => {
    hasName && setImageName(hasName);
  }, [hasName]);

  function stopWebcam() {
    if (mediastream) {
      mediastream.getTracks().forEach((track) => {
        track.stop();
      });
      setMediaStream(null);
    }
    if (videoRef.current) videoRef.current.srcObject = null;
  }

  const takePicture = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext("2d");
      context?.drawImage(videoRef.current, 0, 0, 500, 400);
      const imgData = canvasRef.current.toDataURL("image/png");
      setImageSrc(imgData);
      setShowWebcam(false);
      setShowImageUpload(true);
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    setError("");
    const file = event.target?.files?.[0];
    if (file) {
      let filetype = file.type.split("/")[1];
      if (sizeLimit && file.size > sizeLimit) {
        setError("size");

        if (fileInputRef.current) fileInputRef.current.value = "";
        return;
      }

      const allowedTypes = isImageOnly
        ? ["png", "jpeg", "jpg"]
        : ["png", "jpeg", "jpg", "pdf"];
      if (!allowedTypes.includes(filetype)) {
        setError("type");
        if (fileInputRef.current) fileInputRef.current.value = "";
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === "string") {
          if (getFileExt) {
            setImageFile({
              file: reader.result,
              extension: filetype,
              name: file.name,
            });
          }
          setImageSrc(reader.result);
          setImageName(file.name);
          setShowWebcam(false);
          setShowImageUpload(true);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const renderImg = () => {
    return (
      <div
        className=" cursor-pointer whitespace-nowrap flex items-center w-3/4 py-[14px]"
        onClick={() => openFilePicker()}
      >
        <Image
          src={!imageSrc || !showImageUpload ? uploadIcon : imageSrc}
          alt={`${!imageSrc || !showImageUpload ? "upload icon" : "Captured"}`}
          className="max-w-md"
          width={20}
          height={20}
        />
        <p className="text-primary font-bold ml-2  md1:text-[1rem] sm:hidden ">
          {imageName
            ? `${name} - ${trimWithEllipses(imageName, 10)}`
            : placeholder}
          {isRequired && !imageName && (
            <span className="text-errorRed mx-1">*</span>
          )}
        </p>
        <p className="text-primary font-bold ml-2  md1:text-[1rem] hidden sm:block">
          {imageName
            ? `${name} - ${
                imageName.length > 32
                  ? trimWithEllipses(imageName, 32)
                  : imageName
              }`
            : placeholder}
          {isRequired && !imageName && (
            <span className="text-errorRed mx-1">*</span>
          )}
        </p>
      </div>
    );
  };

  const openFilePicker = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  return (
    <div className="flex flex-col items-center my-4">
      {showtext && <h1 className="text-2xl font-bold mb-4">Webcam Capture</h1>}

      <div className="flex flex-col justify-center md:justify-between md:flex-row  md:pb-0 bg-disabledBg border border-disabledBgBorder pl-2  w-full rounded-xl">
        {renderImg()}
        <label
          className=""
          htmlFor={!handleSelectOption ? name : ""}
          onClick={() => openFilePicker()}
        ></label>
        <input
          type="file"
          accept={isImageOnly ? ".png, .jpeg, .jpg" : ".png, .jpeg, .jpg, .pdf"}
          onChange={handleFileUpload}
          ref={fileInputRef}
          id={name}
          className="hidden"
          onClick={() => openFilePicker()}
        />
      </div>
      <div className={`relative mb-4 ${!showWebcam && "hidden"}`}>
        <video
          ref={videoRef}
          width={500}
          height={400}
          autoPlay
          playsInline
          className="rounded"
        />
        <canvas
          ref={canvasRef}
          width={500}
          height={400}
          style={{ display: "none" }}
        />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded absolute bottom-2 left-2"
          onClick={takePicture}
        >
          Take Picture
        </button>
      </div>
      {showCaption && (
        <p className="mr-auto text-darkPrimary font-[500] py-2 text-[0.85rem] ">
          <span
            className={`${error == "type" && "fade-in text-red-800 font-bold"}`}
          >
            Supported file types: {isImageOnly ? "jpg, png." : "jpg, png, pdf."}
          </span>
          <span
            className={`${error == "size" && "fade-in text-red-800 font-bold"}`}
          >
            {" "}
            Maximum size:{" "}
            {sizeLimit ? `${sizeLimit / (1024 * 1024)} MB` : "5 MB"}
          </span>
        </p>
      )}
    </div>
  );
};

export default DocUploadCompact;