import { BrowserRouter, Route, Routes } from "react-router-dom";
import Body from "./components/Body";
import Login from "./components/Login";
import Profile from "./components/Profile";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import Feed from "./components/Feed";
import Connection from "./components/Connection";
import Request from "./components/Request";
import CancellationRefunds from "./components/CancellationRefunds";
import Privacy from "./components/Privacy";
import Shipping from "./components/Shipping";
import TermsConditions from "./components/TermsConditions";
import ContactUs from "./components/ContactUs";

function App() {
  return (
    <>
      <Provider store={appStore}>
        <BrowserRouter basename="/">
          <Routes>
            <Route path="/" element={<Body />}>
              <Route path="/" element={<Feed />} />
              <Route path="/login" element={<Login />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/connection" element={<Connection />} />
              <Route path="/request" element={<Request />} />
              <Route path="/cancellationrefunds" element={<CancellationRefunds/>} />
              <Route path="/privacy" element={<Privacy/>} />
              <Route path="/shipping" element={<Shipping/>} />
              <Route path="/terms" element={<TermsConditions/>} />
              <Route path="/contact" element={<ContactUs/>} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
