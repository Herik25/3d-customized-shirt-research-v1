import React from "react";
import CustomButton from "./CustomButton";

function AiPicker({ prompt, setPrompt, generatingImg, handleSubmit }) {
  return (
    <div className="aipicker-container">
      <textarea
        className="aipicker-textarea"
        name="prompt"
        id="prompt"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Ask AI..."
        rows={5}
      />
      <div className="flex flex-wrap gap-3">
        {generatingImg ? (
          <CustomButton
            type="outline"
            title="Generating..."
            customStyles="text-xs cursor-pointer"
          />
        ) : (
          <>
            <CustomButton
              type="filled"
              title="LOGO"
              customStyles="text-xs cursor-pointer"
              handleClick={() => handleSubmit("logo")}
            />

            <CustomButton
              type="filled"
              title="TEXTURE"
              customStyles="text-xs cursor-pointer"
              handleClick={() => handleSubmit("full")}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default AiPicker;
