import { NavLink } from "react-router-dom";

import LinkModel from "../models/link.model";

export const LINKS = [
    new LinkModel(NavLink, "/login", "nav-link", "Login", (t) => !t.isLoggedIn()),
    new LinkModel(NavLink, "/order", "nav-link", "Order", (t) => t.hasRoles()),
    new LinkModel(NavLink, "/roles", "nav-link", "Roles", (t) => t.isAdmin()),
    new LinkModel(NavLink, "/users", "nav-link", "Users", (t) => t.isAdmin()),
    new LinkModel(NavLink, "/subcategories", "nav-link", "Subcategories", (t) => t.isAdmin()),
    new LinkModel(NavLink, "/products", "nav-link", "Products", (t) => t.isAdmin()),
    new LinkModel(NavLink, "/menu", "nav-link", "Menu", (t) => t.isAdmin()),
    new LinkModel(NavLink, "/profile", "nav-link", "Profile", (t) => t.isLoggedIn()),
];
