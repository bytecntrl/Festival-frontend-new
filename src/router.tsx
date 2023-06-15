import React from "react";
import { createBrowserRouter } from "react-router-dom";

import RouteHome from "./routes/home";
import RouteLogin from "./routes/login";
import RouteProfile from "./routes/profile";
import RouteSubcategories from "./routes/subcategories";
import RouteUsers from "./routes/users";

const routers = createBrowserRouter(
    [
        {
            path: "/",
            element: <RouteHome />,
            children: [
                {
                    path: "/login",
                    element: <RouteLogin />
                },
                {
                    path: "/users",
                    element: <RouteUsers />
                },
                {
                    path: "/subcategories",
                    element: <RouteSubcategories />
                },
                {
                    path: "/profile",
                    element: <RouteProfile />
                }
            ]
        }
    ]
);

export default routers;
