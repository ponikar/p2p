import React, { Suspense } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { BaseArea } from "./components/base/base-area.component";
import { store } from "./store/store";
import { Provider } from "react-redux";
import { ProtectedRoutes } from "./components/routes/protected-route.component";

const CreateMeeting = React.lazy(() => import("./pages/create-meeting.page"));
const MeetingAreaPage = React.lazy(() => import("./pages/meeting-area.page"));
const MeetingLeft = React.lazy(() => import("./pages/meeting-left.page"));

function App() {
  return (
    <Provider store={store}>
      <BaseArea>
        <Router>
          <Suspense fallback={<p> Loading.... </p>}>
            <Switch>
             <ProtectedRoutes
              path="/:meetingId"
              exact
              component={MeetingAreaPage}
            />
              <Route path="/" exact component={CreateMeeting} />
              <ProtectedRoutes path="/:meetingId/bye" exact component={MeetingLeft} />
            </Switch>
          </Suspense>
        </Router>
      </BaseArea>
    </Provider>
  );
}

export default App;
