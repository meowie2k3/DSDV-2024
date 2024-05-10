/*!

=========================================================
* Black Dashboard React v1.2.2
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/black-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
// javascript plugin used to create scrollbars on windows

import routes from "routes.js";

import { BackgroundColorContext } from "contexts/BackgroundColorContext";

function Admin(props) {
  const location = useLocation();
  const mainPanelRef = React.useRef(null);
  // React.useEffect(() => {
  //   if (navigator.platform.indexOf("Win") > -1) {
  //     document.documentElement.className += " perfect-scrollbar-on";
  //     document.documentElement.classList.remove("perfect-scrollbar-off");
  //     ps = new PerfectScrollbar(mainPanelRef.current, {
  //       suppressScrollX: true,
  //     });
  //     let tables = document.querySelectorAll(".table-responsive");
  //     for (let i = 0; i < tables.length; i++) {
  //       ps = new PerfectScrollbar(tables[i]);
  //     }
  //   }
  //   // Specify how to clean up after this effect:
  //   return function cleanup() {
  //     if (navigator.platform.indexOf("Win") > -1) {
  //       ps.destroy();
  //       document.documentElement.classList.add("perfect-scrollbar-off");
  //       document.documentElement.classList.remove("perfect-scrollbar-on");
  //     }
  //   };
  // });
  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    if (mainPanelRef.current) {
      mainPanelRef.current.scrollTop = 0;
    }
  }, [location]);
  // this function opens and closes the sidebar on small devices
  // const toggleSidebar = () => {
  //   document.documentElement.classList.toggle("nav-open");
  //   setsidebarOpened(!sidebarOpened);
  // };
  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/admin") {
        return (
          <Route path={prop.path} element={prop.component} key={key} exact />
        );
      } else {
        return null;
      }
    });
  };
  return (
    <BackgroundColorContext.Consumer>
      {({ color, changeColor }) => (
        <React.Fragment>
          <div className="wrapper">
            {/* <Sidebar
              routes={routes}
              logo={{
                outterLink: "https://www.creative-tim.com/",
                text: "Creative Tim",
                imgSrc: logo,
              }}
              toggleSidebar={toggleSidebar}
            /> */}
            <div style={{ paddingLeft: '15px', paddingRight: '15px' , paddingTop: '15px'}} data={color}>
              {/* <AdminNavbar
                brandText={getBrandText(location.pathname)}
                toggleSidebar={toggleSidebar}
                sidebarOpened={sidebarOpened}
              /> */}
              <Routes>
                {getRoutes(routes)}
                <Route
                  path="/"
                  element={<Navigate to="/admin/dashboard" replace />}
                />
              </Routes>
              {
                // we don't want the Footer to be rendered on map page
                // location.pathname === "/admin/maps" ? null : <Footer fluid />
              }
            </div>
          </div>
          {/* <FixedPlugin bgColor={color} handleBgClick={changeColor} /> */}
        </React.Fragment>
      )}
    </BackgroundColorContext.Consumer>
  );
}

export default Admin;
