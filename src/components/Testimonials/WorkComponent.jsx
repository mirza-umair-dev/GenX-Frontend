import React, { useState } from "react";

const WorkComponent = ({ icon, title, description }) => {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      className="relative flex items-center  gap-4 lg:px-6 px-4 py-4 rounded-lg bg-white/10 group overflow-hidden w-full"
      style={{border: "1px solid rgba(255,255,255,0.1)"}}
    >
      {/* Border highlight */}
      <div
        className="absolute inset-0 rounded-lg pointer-events-none opacity-0 group-hover:opacity-30 transition duration-300"
        style={{
          background: `radial-gradient(200px circle at ${pos.x}px ${pos.y}px, rgba(255,255,255,0.6), transparent 80%)`
        }}
      ></div>

      <div className="lg:w-12 lg:h-12 w-8 h-8 bg-white/20 rounded flex items-center justify-center z-10 p-2">
        {icon}
      </div>
      <div className="z-10">
        <h1 className="text-white ">{title}</h1>
        <p className="text-sm text-white/40">{description}</p>
      </div>
    </div>
  );
};

export default WorkComponent;
