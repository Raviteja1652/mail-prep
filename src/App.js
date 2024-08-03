import React, { Fragment, useContext, useEffect } from "react";
import Auth from "./Components/Auth/Auth";
import AppContext from "./Store/AppContext";
import { Switch, Route, Redirect } from "react-router-dom";
import Navigation from "./Components/Navigation/Navigation";
import Compose from "./Components/Mail/Compose";
import Inbox from "./Components/Mail/Inbox";
import Sent from "./Components/Mail/Sent";
import Wrapper from "./Components/UI/Wrapper";
import Notification from "./Components/UI/Notification";


function App() {
  const ctx = useContext(AppContext);
  // const {status, title, message} = ctx.notification

  useEffect(() => {
    ctx.onLoad()
  }, [])

  return (
    <Fragment>
      {ctx.isLoggedIn && <Navigation />}
      <Switch>
        <Route path='/' exact>
          {!ctx.isLoggedIn ? (<Auth />) : (<Redirect to='/compose' />)}
        </Route>

        {ctx.isLoggedIn && (
          <Wrapper>
            <Route path='/compose'><Compose /></Route>
            <Route path='/inbox'><Inbox /></Route>
            <Route path='/sent'><Sent /></Route>
          </Wrapper>
        )}

        <Route path='/logout'>(<Redirect to='/' exact />)</Route>

        {/* stays on the same page when logged in without data */}
        {/* <Route path='*'>
          <Redirect to='/' />
        </Route> */}
      </Switch>
      {ctx.notification && <Notification status={ctx.notification.status} title={ctx.notification.title} message={ctx.notification.message} />}
    </Fragment>
    
  );
}

export default App;
