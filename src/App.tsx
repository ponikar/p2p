import React, { useRef } from "react";
import "./App.css";
import { MeetingArea } from "./components/meeting/meeting-area/meeting-area.component";
import { WebCamStreaming } from "./components/webcam-streaming/webcam-streaming.component";
import { motion } from "framer-motion";
import { BaseArea } from "./components/base/base-area.component";

function App() {
  const contstrainRef = useRef(null);
  return (
    <BaseArea>
      <motion.div ref={contstrainRef}>
        <MeetingArea />
        <WebCamStreaming contstrainRef={contstrainRef} />
      </motion.div>
    </BaseArea>
  );
}

export default App;
