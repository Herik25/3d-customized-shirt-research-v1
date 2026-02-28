import React from "react";
import CustomButton from "./CustomButton";

function FilePicker({ file, setFile, readFile }) {
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  return (
    <div className="filepicker-container">
      <div className="flex-1 flex flex-col">
        <input
          type="file"
          id="file-upload"
          accept="image/*"
          onChange={handleFileChange}
        />
        <label htmlFor="file-upload" className="filepicker-label">
          Upload Image
        </label>

        <p className="mt-2 text-gray-500 text-xs truncate">
          {file ? `${file.name}` : "No file selected"}
        </p>
      </div>

      <div className="mt-4 flex flex-wrap gap-3">
        <CustomButton
          type={"outline"}
          title={"Logo"}
          handleClick={() => readFile("logo")}
          customStyles={"text-xs"}
        />
        <CustomButton
          type={"filled"}
          title={"Full"}
          handleClick={() => readFile("full")}
          customStyles={"text-xs"}
        />
      </div>
    </div>
  );
}

export default FilePicker;
