import React from "react";

export type PropsType = {
  readonly shown: boolean;
  readonly onClose: () => void;
  readonly data: string;
};

export const Modal: React.FC<PropsType> = (props: PropsType) => {
  const { shown, onClose, children, data } = props;

  const handleClose = () => {
    onClose();
  };

  const handleOpen = (url: string) => {
    window.open(url, "_blank");
    onClose();
  };

  return shown ? (
    <div className="fixed w-full h-full top-0 left-0 flex items-center justify-center" onClick={handleClose}>
      <div className="absolute w-full h-full bg-gray-900 opacity-50"></div>
      <div className=" bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
        <div className="py-4 text-left px-6">
          <div className="flex justify-between items-center pb-3">
            <p className="text-2xl font-bold">Detected QR code</p>
            <div className="cursor-pointer z-50" onClick={handleClose}>
              <svg
                className="fill-current text-black"
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 18 18"
              >
                <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"></path>
              </svg>
            </div>
          </div>
          <p>
            <a className="text-indigo-500 hover:text-indigo-400" target="_blank" href={data}>
              {data}
            </a>
          </p>
          <div className="flex justify-end pt-2">
            <button
              className="px-3 bg-transparent p-1 rounded-lg text-indigo-500 hover:bg-gray-100 hover:text-indigo-400 mr-2"
              onClick={handleOpen.bind(this, data)}
            >
              Open
            </button>
            <button className="px-3 bg-indigo-500 p-1 rounded-lg text-white hover:bg-indigo-400" onClick={handleClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  ) : null;
};
