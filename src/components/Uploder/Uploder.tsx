import React, { useEffect, useRef, useState } from "react";
import uploadIcon from "../../../public/assets/images/uploadCloud.svg";
import Image from "next/image";
import Modal from "../Modal/Modal";
import useCheckContainerSize from "@/redux/hooks/styling/useCheckContainerSize";

type WebCamProps = {
  getImage?: (image: string) => void;
  sizeLimit?: number;
  showtext?: boolean;
  uploadMsg?: string;
  showCaption?: boolean;
  labelClassName?: string;
  isImageOnly?: boolean;
  isRequired?: boolean;
  name?: string;
  getFileExt?: (val: any) => void;
  selectOptions?: string[];
  handleSelectOption?: (val: string) => void;
};

const DocUploadCompact: React.FC<WebCamProps> = ({
  getImage,
  showtext = false,
  sizeLimit,
  uploadMsg,
  showCaption,
  labelClassName,
  isImageOnly = false,
  getFileExt,
  name = "fileInput",
  isRequired,
  selectOptions,
  handleSelectOption,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const placeholderRef = useRef<HTMLDivElement>(null);
  const isSmallScreen = useCheckContainerSize(placeholderRef, 400);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [selectModal, setSelectModal] = useState<boolean>(false);
  const [imageFile, setImageFile] = useState<{
    file: File | null; // File object here
    extension: string;
    name: string;
  }>({
    file: null, // Initialize as null
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

      if (getFileExt) {
        setImageFile({
          file, // Assign the File object directly
          extension: filetype,
          name: file.name,
        });

        getFileExt({
          file,
          extension: filetype,
          name: file.name,
        });
      }

      setImageName(file.name);
      setShowWebcam(false);
      setShowImageUpload(true);
      setImageSrc(URL.createObjectURL(file)); // Used for preview only
    }
  };

  const renderImg = () => {
    return (
      <div className="whitespace-nowrap flex items-center justify-center w-3/4">
        <Image
          src={uploadIcon}
          alt={`${!imageSrc || !showImageUpload ? "upload icon" : "Captured"}`}
          className="max-w-md bg-transparent font-bold"
          width={30}
          height={30}
        />
        <p className="text-[#311302] font-semibold ml-4 text-[.6rem] lg:text-[1rem] md1:text-[0.8rem] ">
          {imageName ? `${imageName.slice(0, 20)}` : "Drag and Drop Photo"}
        </p>
      </div>
    );
  };

  const openFilePicker = () => {
    if (fileInputRef.current) fileInputRef.current.click();
    setSelectModal(false);
  };

  return (
    <div className="flex flex-col items-center -mt-2">
      {showtext && <h1 className="text-2xl font-bold mb-4">Webcam Capture</h1>}
      <p className={`mr-auto text-[#311302] font-[500] pb-1 ${labelClassName}`}>
        {uploadMsg}{" "}
        {isRequired ? <span className="text-errorRed font-bold">*</span> : ""}
      </p>
      <div
        ref={placeholderRef}
        className={`flex  flex-col justify-center md:justify-between ${
          isSmallScreen ? "" : "!flex-row"
        } py-4  border-dashed border-1 bg-white border-[#E4E7EC] w-full rounded-lg px-3 pr-6 items-center`}
        onClick={() => {
          selectOptions && setSelectModal(true);
        }}
      >
        {renderImg()}
        <label
          className="bg-[#EA5B0C]  hover:bg-[#311302] text-white font-bold py-2 px-4 rounded cursor-pointer ml-2 whitespace-nowrap text-[1rem] lg:text-[1rem] md1:text-[0.8rem]"
          htmlFor={!handleSelectOption ? name : ""}
        >
          {imageName ? "Change File" : "Browse Files"}
        </label>
        <input
          type="file"
          accept={isImageOnly ? ".png, .jpeg, .jpg" : ".png, .jpeg, .jpg, .pdf"}
          onChange={handleFileUpload}
          ref={fileInputRef}
          id={name}
          className="hidden"
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
        <p className="mr-auto text-[#935F43] font-[500] py-1 text-[0.85rem] ">
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
            {sizeLimit ? `${sizeLimit / (1024 * 1024)} MB` : "2 MB"}
          </span>
        </p>
      )}
      {selectOptions && (
        <Modal
          isOpen={selectModal}
          onClose={() => setSelectModal(false)}
          onOverlayClose={() => setSelectModal(false)}
        >
          <div className="">
            <h1 className="font-bold text-labelBlue text-lg">
              Select which ID type you want to upload
            </h1>
            <div className="flex flex-col mt-5">
              {selectOptions.map((opt) => (
                <label
                  className="border-b py-3 cursor-pointer "
                  key={opt}
                  onClick={() => {
                    handleSelectOption && handleSelectOption(opt);

                    openFilePicker();
                  }}
                >
                  <span className="ml-3 text-darkPrimary font-semibold">
                    {opt}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default DocUploadCompact;
