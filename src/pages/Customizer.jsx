import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useSnapshot } from "valtio";
import state from "../store";
import { fadeAnimation, slideAnimation } from "../config/motion";

import { DecalTypes, EditorTabs, FilterTabs } from "../config/constants";
import {
  CustomButton,
  ColorPicker,
  AiPicker,
  FilePicker,
  Tab,
} from "../components";
import { logoShirt } from "../assets";

function Customizer() {
  const snap = useSnapshot(state);
  const [file, setFile] = React.useState("");
  const [prompt, setPrompt] = React.useState("");
  const [generatingImg, setGeneratingImg] = React.useState(false);
  const [activeEditorTab, setActiveEditorTab] = React.useState("");
  const [activeFilterTab, setActiveFilterTab] = React.useState({
    logoShirt: true,
    stylishShirt: false,
  });

  const handleDecals = (type, result) => {
    const decalType = DecalTypes[type];
    state[decalType.stateProperty] = result;

    if (!activeFilterTab[decalType.filterTab]) {
      handleActiveFilterTab(decalType.filterTab);
    }
  };

  const handleActiveFilterTab = (tabName) => {
    switch (tabName) {
      case "logoShirt":
        state.isLogoTexture = !activeFilterTab[tabName];
        break;
      case "stylishShirt":
        state.isFullTexture = !activeFilterTab[tabName];
        break;
      default:
        state.isLogoTexture = true;
        state.isFullTexture = false;
    }

    setActiveFilterTab((prevState) => ({
      ...prevState,
      [tabName]: !prevState[tabName],
    }));
  };

  const readFile = (type) => {
    const reader = new FileReader();

    reader.onload = () => {
      handleDecals(type, reader.result);
      setActiveEditorTab("");
    };

    reader.readAsDataURL(file);
  };

  const handleSubmit = async () => {
    if (!prompt) alert("Please enter a prompt");

    try {
      setGeneratingImg(true);

      const response = await fetch("http://localhost:8080/api/v1/dalle", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();
      handleDecals("logo", `data:image/png;base64,${data.photo}`);
    } catch (error) {
      alert(error);
    } finally {
      setGeneratingImg(false);
      setActiveEditorTab("");
    }
  };

  const generateTabContent = (tab) => {
    switch (tab) {
      case "colorpicker":
        return <ColorPicker />;
      case "filepicker":
        return <FilePicker file={file} setFile={setFile} readFile={readFile} />;
      case "aipicker":
        return (
          <AiPicker
            prompt={prompt}
            setPrompt={setPrompt}
            generatingImg={generatingImg}
            handleSubmit={handleSubmit}
          />
        );
      default:
        return null;
    }
  };

  return (
    <AnimatePresence>
      {!snap.intro && (
        <>
          <motion.div
            key="custom"
            className="absolute top-0 left-0 z-10"
            {...slideAnimation("left")}
          >
            <div className="flex items-center min-h-screen">
              <div className="editortabs-container tabs">
                {EditorTabs.map((tab) => (
                  <Tab
                    key={tab.name}
                    tab={tab}
                    handleClick={() => setActiveEditorTab(tab.name)}
                  />
                ))}
                {generateTabContent(activeEditorTab)}
              </div>
            </div>
          </motion.div>

          <motion.div
            key="filter"
            className="absolute top-5 right-5 z-10"
            {...fadeAnimation}
          >
            <CustomButton
              type="filled"
              title="Go Back"
              customStyles="w-fit px-4 py-2.5 font-bold text-sm"
              handleClick={() => (state.intro = true)}
            />
          </motion.div>
          <motion.div
            className="filtertabs-container"
            {...slideAnimation("up")}
          >
            {FilterTabs.map((tab) => (
              <Tab
                key={tab.name}
                tab={tab}
                isFilterTab
                isActive={activeFilterTab[tab.name]}
                handleClick={() => handleActiveFilterTab(tab.name)}
              />
            ))}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default Customizer;
