import React from "react";
import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";
import Dashboard from "./components/dashboard/Dashboard";
import Login from "./components/Login/Login";
import Offer from "./components/Offer/Offer";
import Customer from "./components/Customers/Customer";
import Employee from "./components/employee/Employee";
import Dealer from "./components/dealer/Dealer";
import Vendor from "./components/vendor/Vendors";
import Booking from "./components/booking/Booking";
import Service from "./components/services/Service";
import CreateService from "./components/services/CreateServices";
import CreateEmployee from "./components/employee/CreateEmployee";
import CreateDealer from "./components/dealer/CreateDealer";
import CreateOffer from "./components/Offer/CreateOffer";
import ServiceAdditionalProblems from "./components/aditional_problem/Service_Additional_Problems";
import CreateAdditionalProblems from "./components/aditional_problem/CreateAdditionalProblems";
import EditDealer from "./components/dealer/EditDealer";
import EditService from "./components/services/EditServices";
import Banner from "./components/banner/Banner";
import CreateBanner from "./components/banner/CreateBanner";
import Bikes from "./components/bikes/bike";
import CreateBike from "./components/bikes/addBike";
import EditEmployee from "./components/employee/EditEmployee";
import Payment from "./components/payment/payment";
import ServiceFeature from "./components/services feature/ServiceFeature";
import CreateServiceFeature from "./components/services feature/CreateServicesFeature";
import EditServiceFeature from "./components/services feature/EditServiceFeature";
import CreateServicesSalientFeature from "./components/services salient feature/CreateServicesSalientFeature";
import EditServiceSalientFeature from "./components/services salient feature/EditServiceSalientFeature";
import ServiceSalientFeature from "./components/services salient feature/ServiceSalientFeature";
import Sidebar from "./components/home/Sidebar";
import Notfound from "./components/NotFound/Notfound";
import Admin from "./components/admin/Admin";
import CreateAdmin from "./components/admin/addAdmin";
// import "./App.css";

function App() {


  return (
    <>
      <Router>

        <Routes>

          <Route exact path="/login" element={<Login />} />
          <Route path="*" element={<Notfound/>} />

          <Route element={<SidebarLayout />}>
            <Route exact path="/" element={<Dashboard />} />

            <Route exact path="/dashboard" element={<Dashboard />} />

            <Route exact path="/customer" element={<Customer />} />

            <Route exact path="/admin" element={<Admin />} />
            <Route exact path="/addadmin" element={<CreateAdmin />} />

            <Route exact path="/payment" element={<Payment />} />

            <Route exact path="/employee" element={<Employee />} />
            <Route exact path="/addemployee" element={<CreateEmployee />} />
            <Route exact path="/editdealer" element={<EditDealer />} />

            <Route exact path="/dealer" element={<Dealer />} />
            <Route exact path="/adddealer" element={<CreateDealer />} />
            <Route exact path="/editemployee" element={<EditEmployee />} />

            <Route exact path="/vendor" element={<Vendor />} />

            <Route exact path="/offer" element={<Offer />} />
            <Route exact path="/addoffer" element={<CreateOffer />} />

            <Route exact path="/bike" element={<Bikes />} />
            <Route exact path="/addbike" element={<CreateBike />} />

            <Route exact path="/banner" element={<Banner />} />
            <Route exact path="/addbanner" element={<CreateBanner />} />

            <Route exact path="/booking" element={<Booking />} />

            <Route exact path="/service" element={<Service />} />
            <Route exact path="/newservice" element={<CreateService />} />
            <Route exact path="/editservice" element={<EditService />} />

            <Route exact path="/servicefeature" element={<ServiceFeature />} />
            <Route exact path="/newservicefeature" element={<CreateServiceFeature />} />
            <Route exact path="/editservicefeature" element={<EditServiceFeature />} />

            <Route exact path="/servicesalientfeature" element={<ServiceSalientFeature />} />
            <Route exact path="/newservicesalientfeature" element={<CreateServicesSalientFeature />} />
            <Route exact path="/editservicesalientfeature" element={<EditServiceSalientFeature />} />

            <Route
              exact
              path="/service_additional_problems"
              element={<ServiceAdditionalProblems />}
            />

            <Route
              exact
              path="/add_additional_problems"
              element={<CreateAdditionalProblems />}
            />
          </Route>

        </Routes>

      </Router>
    </>
  );
}


const SidebarLayout = () => (
  <>
    <Sidebar />
    <Outlet />
  </>
);

export default App;
