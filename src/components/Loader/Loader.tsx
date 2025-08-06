import Image from "next/image";
import React, { useEffect, useState } from "react";
import { MdErrorOutline } from "react-icons/md";
import leadwayLogo from "../../../public/assets/images/Image 1.svg"
import Spinner from "../Spinner/Spinner";

export interface AlertModalProps {
  title?: string;
  message?: string;
  icon?: string;
  show: boolean;
  loading?: boolean;
  onConfirm: () => void;
  onCancel?: () => void;
  confirmText?: string;
  cancelText?: string;
}

const AlertModal: React.FC<AlertModalProps> = ({
  title,
  message,
  show,
  icon,
  loading = false,
  onConfirm,
  onCancel,
  confirmText = "Ok",
  cancelText = "Cancel",
}) => {
  const [animate, setAnimate] = useState(false);

  // Trigger the modal animation when loading is true
  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;

    if (loading) {
      interval = setInterval(() => {
        setAnimate((prev) => !prev);
      }, 500); // Alternate animation every 500ms
    } else {
      setAnimate(false);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [loading]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-black opacity-50 fixed inset-0" />
      <div
        className={`bg-white p-6 rounded-lg shadow-lg z-10 w-96 transform transition-transform ${
          loading && animate ? "translate-y-2" : "translate-y-0"
        }`}
        style={{
          transition: "transform 0.5s ease-in-out", // Adjust transition duration here
        }}
      >
        {loading ? (
          <div className="flex flex-col gap-5">
            <div className="flex flex-col justify-center items-center">
              <Image src={leadwayLogo} alt="" width={200} height={200} />
              {/* <h1 className="font-semibold text-[#311302]  text-[1rem]">
                Leadway <br /> Trustee
              </h1> */}
            </div>
            <Spinner size="40" />
          </div>
        ) : (
          <div className="">
            {icon == "error" && (
              <MdErrorOutline className="text-borderRed  m-auto" size={40} />
            )}
            <h2 className="text-xl font-semibold my-4 text-center">{title}</h2>
            <div
              className={`flex ${
                onCancel ? "justify-between" : "justify-end"
              } gap-4`}
            >
              {onCancel && (
                <button
                  className="px-4 py-2 bg-borderRed text-white rounded w-1/2"
                  onClick={onCancel}
                >
                  {cancelText}
                </button>
              )}
              <button
                className="px-3 py-2 bg-[#EA5B0C] text-white rounded font-semibold mx-auto hover:bg-[#311302] w-1/2"
                onClick={onConfirm}
              >
                {confirmText}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AlertModal;
