import React from "react";
import "./App.css";
import { CreateMeeting } from "./pages/create-meeting.page";
import { MeetingAreaPage } from "./pages/meeting-area.page";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { BaseArea } from "./components/base/base-area.component";
function App() {
  return (
    <BaseArea>
      <Router>
        <Switch>
          <Route path="/:meetingId" exact component={MeetingAreaPage} />
          <Route path="/me" exact component={MeetingAreaPage} />
          <Route path="/" exact component={CreateMeeting} />
        </Switch>
      </Router>
    </BaseArea>
  );
}

export default App;
