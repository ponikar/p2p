import React from 'react'
import './App.css'
import { MeetingArea } from './components/meeting/meeting-area/meeting-area.component'
import { WebCamStreaming } from './components/webcam-streaming/webcam-streaming.component'

function App() {
  return <React.Fragment>
    <MeetingArea />
    {/* <WebCamStreaming /> */}
  </React.Fragment>
}

export default App
