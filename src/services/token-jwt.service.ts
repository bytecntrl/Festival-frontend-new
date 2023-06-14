import jwtDecode from "jwt-decode";

import ROLES from "../env/roles";

interface Token {
    username: string
    role: string
    exp: number
}

export default class TokenJwtService {
    private token = "";

    constructor(token: string) {
        this.token = token;
    }

    isTokenExpired(): boolean {
        if (this.token !== "") {
            return new Date((jwtDecode(this.token) as Token).exp * 1000) < new Date();
        }

        return true;
    }

    isLoggedIn(): boolean {
        return !this.isTokenExpired();
    }

    isAdmin(): boolean {
        if (this.isLoggedIn()) {
            return (jwtDecode(this.token) as Token).role == "admin";
        }

        return false;
    }

    hasRoles(): boolean {
        if (this.isLoggedIn()) {
            return ROLES.includes((jwtDecode(this.token) as Token).role);
        }
        
        return false;
    }

    getUsername(): string {
        if (this.isLoggedIn()) {
            return (jwtDecode(this.token) as Token).username;
        }
        
        return "";
    }
}
