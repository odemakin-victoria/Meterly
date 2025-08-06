import React, { useEffect, useRef, useState } from "react";
import uploadIcon from "../../../public/assets/images/humbleicons_upload 2.svg";
import Image from "next/image";
import Modal from "../Modal/Modal";
import Button from "../Button/Button";

type WebCamProps = {
  getImage?: (image: string) => void;
  sizeLimit?: number;
	testId?: string; // Get testId from props

  showtext?: boolean;
  uploadMsg?: string;
  showCaption?: boolean;
  labelClassName?: string;
  isImageOnly?: boolean;
  name?: string;
  getFileExt?: (val: any) => void;
  selectOptions?: string[];
  handleSelectOption?: (val: string) => void;
};

const WebCam: React.FC<WebCamProps> = ({
	testId, // Get testId from props
  getImage,
  showtext = false,
  sizeLimit,
  uploadMsg,
  showCaption,
  labelClassName,
  isImageOnly = false,
  getFileExt,
  name = "fileInput",
  selectOptions,
  handleSelectOption,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [selectModal, setSelectModal] = useState<boolean>(false);
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
  const [showImageModal, setShowImageModal] = useState<boolean>(false);

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
  const deleteFile = () => {
    setError("");
    setImageFile({
      file: "",
      extension: "",
      name: "",
    });
    setImageSrc("");
    setImageName("");
    setShowImageUpload(false);
    setShowImageModal(false);
 
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

	const previewImage = () => {

		setSelectModal(false)
		setShowImageModal(true);
    
  };
  const renderImg = () => {
    return (
      <div className="whitespace-nowrap mt-8 flex items-center justify-center w-3/4">
        <Image
          src={!imageSrc || !showImageUpload ? uploadIcon : imageSrc}
          alt={`${!imageSrc || !showImageUpload ? "upload icon" : "Captured"}`}
          className="max-w-md mt-2 md:my-4 shadow-sm"
          width={30}
          height={30}
        />
        <p className="text-[#935F43]  font-semibold ml-4 text-[.5rem] lg:text-[.9rem] md1:text-[0.6rem] ">
          {imageName ? imageName : "Drag and Drop Photo OR"}
        </p>
      </div>
    );
  };

  const openFilePicker = () => {
    if (fileInputRef.current) fileInputRef.current.click();
    setSelectModal(false);
  };

  return (
    <div className="flex flex-col items-center -mt-2 z-0">
      {showtext && <h1 className="text-2xl font-bold mb-4">Webcam Capture</h1>}
      <p className={`mr-auto text-grayText font-[500] pb-1 ${labelClassName}`}>
        {uploadMsg}
      </p>
      <div
		 data-testid={testId} // Apply the testId here

        className="flex flex-col justify-center md:justify-between lg:flex-col bg-white  md:pb-0 border-dashed  border-2 border-[#FABF9E] w-full rounded-lg px-3 pr-6 items-center"
        onClick={() => {
          selectOptions && setSelectModal(true);
        }}
      >
        {renderImg()}
        <label
          className="bg-[#EA5B0C]  mb-5 md:mb-14 hover:bg-[#311302] text-white font-bold py-2 px-4 md:mt-3 rounded cursor-pointer ml-2 whitespace-nowrap text-[.6rem] lg:text-[1rem] md1:text-[0.8rem]"
          htmlFor={!handleSelectOption ? name : ""}
        >
          {imageName ? "Change File" : "Browse Files"}
        </label>
        {imageSrc && (
          <Button
            title="X"
            onClick={deleteFile}
            className={`my-4  py-3 rounded-lgabsolute top-3 right-2 w-6 h-6 flex items-center justify-center bg-white text-gray-800 rounded-full shadow-md hover:bg-gray-200 z-5 `}
          />
        )}

        {/* Show View Image button only if an image is uploaded */}
        {/* {imageSrc && (
          <button
            className="bg-[#0DDE65] my-4 hover:bg-[#0DDE65] text-white font-bold py-2 px-4 md:mt-1 rounded cursor-pointer ml-2 whitespace-nowrap text-[.6rem] lg:text-[1rem] md1:text-[0.8rem]"
            onClick={previewImage}
          >
            View Image
          </button>
        )} */}
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
            Maximum size: {sizeLimit ? `${sizeLimit / (1024 * 1024)} MB` : "5 MB"}
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
                  <span className="ml-3 text-[#001f5c]  font-semibold">
                    {opt}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </Modal>
      )}
      {showImageModal && (
        <Modal
          isOpen={showImageModal}
          onClose={() => setShowImageModal(false)}
          onOverlayClose={() => setShowImageModal(false)}
        >
          <div className="flex flex-col items-center">
            <h1 className="text-lg font-bold mb-4">Uploaded Image</h1>
            {imageSrc && (
              <Image
                src={imageSrc}
                alt="Uploaded preview"
                width={500}
                height={400}
                className="rounded shadow-md"
              />
            )}
          </div>
        </Modal>
      )}
    </div>
  );
};

export default WebCam;
