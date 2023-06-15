import React from "react";
import { createBrowserRouter } from "react-router-dom";

import RouteHome from "./routes/home";
import RouteLogin from "./routes/login";
import RouteUsers from "./routes/users";
import RouteSubcategories from "./routes/subcategories";

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
                }
            ]
        }
    ]
);

export default routers;
