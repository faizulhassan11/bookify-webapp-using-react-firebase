import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { List } from "@mui/material";

const App = () => {
  const myroute = createBrowserRouter([
    { path: "/", element: <Login /> },
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },
    { path: "/home", element: <Home /> },
    { path: "/book/list", element: <List /> },
  ]);

  return <RouterProvider router={myroute} />;
};

export default App;
