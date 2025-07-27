'use client';
import React from 'react';

const Modal = ({ isOpen, setIsOpen, header, formComponent, lowerComponent,setLoginForm }) => {
  if (!isOpen) return null;

  return (
    <div
      className="w-full lg:min-w-screen min-h-screen flex items-center justify-center fixed top-0 left-0 bg-opacity-50 z-50 bg-white/30 backdrop-blur-lg"
      onClick={() => {
        setIsOpen(false);
        setLoginForm(true);
    }}
    >
      <div
        className="relative flex flex-col items-center justify-start gap-8 p-4 w-[90%] lg:w-[1000px] h-full bg-white border border-white/40 shadow-lg rounded-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {header && (
          <h2 className="w-full text-center text-2xl font-bold mb-4">{header}</h2>
        )}

        <div className="flex flex-col items-center justify-center gap-4 w-full lg:py-10">
          {formComponent}
          {lowerComponent}
           <div className="w-full text-center">
              <div
                className="font-semibold text-blue-600"
                
              >
                <span className='hover:cursor-pointer hover:underline'>Are you a Doctor? Login/Sign-Up Here</span>
              </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
