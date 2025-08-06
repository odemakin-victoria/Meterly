import React, { useEffect, useRef, useState } from "react";
import UploadIconSvg from "../../../public/assets/images/uploadCloud.svg";
import { formatSize } from "../../utils";
import Image from "next/image";

interface FileUploaderProps {
  type?: "image" | "document";
  label: string;
  sizeLimit?: number;
  getFile?: (fileData: { file: File; extension: string }[]) => void;
  className?: string;
}

const FileUploader: React.FC<FileUploaderProps> = ({
  type,
  label,
  sizeLimit,
  getFile,
  className,
}) => {
  const inputref = useRef<HTMLInputElement>(null);
  const [nfiles, setNFiles] = useState<File[]>([]);
  const [fileExtensions, setFileExtensions] = useState<string[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]); // For previewing image files

  useEffect(() => {
    const fileData = nfiles.map((file, index) => ({
      file,
      extension: fileExtensions[index],
    }));
    getFile && getFile(fileData);
  }, [nfiles, fileExtensions]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    if (files.length > 0) {
      const validFiles: File[] = [];
      const extensions: string[] = [];
      const previews: string[] = [];

      files.forEach((file) => {
        let filetype = file.type.split("/")[1];
        if (sizeLimit && file.size > sizeLimit) {
          alert(`File cannot be larger than ${formatSize(sizeLimit)}`);
          return;
        }

        if (type === "image" && !["png", "jpeg", "jpg"].includes(filetype)) {
          alert("File must be an image");
          return;
        }

        if (!["jpg", "png", "jpeg", "pdf", "doc", "docx"].includes(filetype)) {
          alert(
            "File can be of format (.jpg, .png, .jpeg, .pdf, .doc, .docx) only"
          );
          return;
        }

        validFiles.push(file);
        extensions.push(filetype);

        if (type === "image") {
          const url = URL.createObjectURL(file);
          previews.push(url);
        }
      });

      setNFiles([...nfiles, ...validFiles]);
      setFileExtensions([...fileExtensions, ...extensions]);
      setPreviewUrls([...previewUrls, ...previews]);
    }
  };

  const handleButtonClick = () => {
    inputref.current?.click();
  };

  const handleRemoveFile = (index: number) => {
    const updatedFiles = nfiles.filter((_, idx) => idx !== index);
    const updatedExtensions = fileExtensions.filter((_, idx) => idx !== index);
    const updatedPreviews = previewUrls.filter((_, idx) => idx !== index);

    setNFiles(updatedFiles);
    setFileExtensions(updatedExtensions);
    setPreviewUrls(updatedPreviews);
  };

  return (
    <div className={`flex flex-col ${className} `}>
      <button
        className="hover:border-2 hover:border-primary rounded-md transition-all py-2 px-5 justify-center min-w-[100px] bg-[#f7f8fc] border border-disabledBgBorder"
        onClick={handleButtonClick}
      >
        <div className="flex items-center gap-3 justify-start">
          <Image alt="" src={UploadIconSvg} width={35} />
          <span className="text-left">
            {nfiles.length > 0 ? `${nfiles.length} files selected` : label}
          </span>
        </div>
        <input
          type="file"
          ref={inputref}
          className="hidden"
          accept={
            type === "image"
              ? ".jpg, .png, .jpeg"
              : ".jpg, .png, .jpeg, .pdf, .doc, .docx"
          }
          onChange={handleFileUpload}
          multiple
        />
      </button>

      {/* Preview section */}
      <div className="mt-4 flex flex-wrap gap-4">
        {previewUrls.length > 0 &&
          previewUrls.map((url, index) => (
            <div key={index} className="relative">
              <img
                src={url}
                alt={`preview ${index}`}
                className="w-24 h-24 object-cover rounded-md"
              />
              <button
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full h-[20px] w-[20px] text-xs"
                onClick={() => handleRemoveFile(index)}
              >
                x
              </button>
            </div>
          ))}
      </div>

      {/* File list for non-image files */}
      {/* <ul className="mt-4">
        {nfiles.length > 0 &&
          nfiles.map((file, index) => (
            <li key={index} className="flex items-center justify-between">
              <span>{file.name}</span>
              <button
                className="text-red-500 text-xs rounded-full h-[20px] w-[20px]"
                onClick={() => handleRemoveFile(index)}
              >
                x
              </button>
            </li>
          ))}
      </ul> */}
    </div>
  );
};

export default FileUploader;
