import React from "react";
import { useSnapshot } from "valtio";
import state from "../store";

function CustomButton({ type, title, customStyles, handleClick }) {
  const snap = useSnapshot(state);
  const generateStyle = (type) => {
    if (type === "filled") {
      return {
        backgroundColor: snap.color,
        color: "#fff",
      };
    } else if (type === "outline") {
      return {
        border: "1px solid #1dc071",
        color: "#1dc071",
      };
    } else {
      return {};
    }
  };

  return (
    <button
      className={`px-2 py-1.5 flex-1 rounded-md ${customStyles}`}
      onClick={handleClick}
      style={generateStyle(type)}
    >
      {title}
    </button>
  );
}

export default CustomButton;
