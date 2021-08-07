import React, { FC } from "react";
import "./App.css";
import { CreateMeeting } from "./pages/create-meeting.page";
import { MeetingAreaPage } from "./pages/meeting-area.page";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { BaseArea } from "./components/base/base-area.component";
import { store } from "./store/store";
import { Provider } from "react-redux";
const App: FC = () => {
  return (
    <Provider store={store}>
      <BaseArea>
        <Router>
          <Switch>
            <Route path="/:meetingId" exact component={MeetingAreaPage} />
            <Route path="/" exact component={CreateMeeting} />
          </Switch>
        </Router>
      </BaseArea>
    </Provider>
  );
};

export default App;
