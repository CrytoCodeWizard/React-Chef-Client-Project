import "./App.css";
import { Switch, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import Home from "./pages/Home/Home";
import Navigation from "./components/Navigation/Navigation";
import MessageBox from "./components/MessageBox/MessageBox";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSelectedDate, selectAppLoading } from "./store/appState/appStateSelectors";
import { getUserWithStoredToken } from "./store/userLogin/userLoginActions";
import { createDate, setSelectedDate } from "./store/appState/appStateActions";
import moment from "moment";
import Loading from "./components/Loading/Loading";
import Profile from "./pages/Profile/Profile";
import MyProfile from "./pages/MyProfile/MyProfile";
import Inbox from "./pages/Inbox/Inbox";
import MyBookings from "./pages/MyBookings/MyBookings";
import Footer from "./components/Footer/Footer";
import EmployerProfile from "./pages/Employer/Employer";

function App() {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectAppLoading);
  const selectedDate = useSelector(getSelectedDate);

  useEffect(() => {
    dispatch(getUserWithStoredToken());
    dispatch(createDate());
    if (!selectedDate) {
      dispatch(setSelectedDate(moment(new Date()).format("YYYY-MM-DD")));
    }
  }, [dispatch, selectedDate]);

  return (
    <div className="App">
      <Navigation />
      <MessageBox />
      {isLoading ? <Loading /> : null}
      <Switch>
        <Route exact path="/profile/bookings" component={MyBookings} />
        <Route exact path="/profile/inbox" component={Inbox} />
        <Route exact path="/profile/employer" component={EmployerProfile} />
        <Route exact path="/profile" component={MyProfile} />
        <Route exact path="/users/:id/profile" component={Profile} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/" component={Home} />
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
