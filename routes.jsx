import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Data from "../pages/data";
import About from "../pages/about/about";
import Contact from "../pages/contact/contact";
import Products from "../pages/products/products";
import Top from "../pages/top/top";
import Box from "../pages/box/box";
import Demand from "../pages/demand";
import Home from "../pages/main";
import Login from "../pages/login/login";



const routes = [

  {
    path: "/home",
    element: <Home/>,
    children: [],
  },
  {
    path: "/demand",
    element: <Demand/>,
    children: [],
  },
  {
    path: "/about",
    element: <About/>,
    children: [],
  },
  {
    path: "/login",
    element: <Login/>,
    children: [],
  },
  {
    path: "/contact",
    element: <Contact/>,
    children: [],
  },
  {
    path: "/products",
    element: <Products/>,
    children: [],
  },
  {
    path: "/top",
    element: <Top/>,
    children: [],
  },
  {
    path: "/box",
    element: <Box/>,
    children: [],
  },

  {
    path: "/data",
    element: <Data/>,
    children: [],
  },

];

const Router = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", 
    });
  }, [location]);

  return (
    <Routes>
      {routes.map((route, key) => (
        <Route key={key} path={route.path} element={route.element}>
          {route.children &&
            route.children?.map((child, key) => {
              return (
                <Route
                  path={child.path}
                  index={child.index ?? false}
                  key={key}
                  element={child.element}
                />
              ); 
            })}
        </Route>
      ))}
    </Routes>
  );
};

export default Router;