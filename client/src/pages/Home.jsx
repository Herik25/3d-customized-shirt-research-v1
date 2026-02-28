import React from "react";
import { useSnapshot } from "valtio";
import state from "../store";
import { AnimatePresence, motion } from "framer-motion";
import {
  headContainerAnimation,
  headContentAnimation,
  headTextAnimation,
  slideAnimation,
} from "../config/motion";
import { CustomButton } from "../components";

function Home() {
  const snap = useSnapshot(state);

  return (
    <AnimatePresence>
      {snap.intro && (
        <motion.section className="home" {...slideAnimation("left")}>
          <motion.header {...slideAnimation("down")}>
            <img
              src="./threejs.png"
              alt="logo"
              className="h-8 w-8 object-contain"
            />
          </motion.header>

          <motion.div className="home-content" {...headContainerAnimation}>
            <motion.h1 className="head-text" {...headTextAnimation}>
              LET'S <br className="xl:block hidden" /> DO IT.
            </motion.h1>

            <motion.div
              {...headContentAnimation}
              className="flex flex-col gap-5"
            >
              <motion.p className="max-w-md font-normal text-gray-600 text-base">
                Create your unique and exclusive shirt with our brand-new 3D
                customization tool. <strong>Unleash your imagination</strong>{" "}
                and define your own style.
              </motion.p>

              <CustomButton
                type="filled"
                title="Customize Now"
                customStyles="w-48 h-12 rounded-full bg-blue-500 text-white"
                handleClick={() => (state.intro = false)}
              />
            </motion.div>
          </motion.div>
        </motion.section>
      )}
    </AnimatePresence>
  );
}

export default Home;
