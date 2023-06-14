import React from "react";
import { NavLink, Link } from 'react-router-dom';

import TokenJwtService from "../services/token-jwt.service";

export default class LinkModel {
    constructor(
        public readonly type: typeof NavLink | typeof Link,
        public readonly to: string,
        public readonly className: string,
        public readonly text: string,
        public readonly check: (t: TokenJwtService) => boolean,
        public readonly onClick?: () => void,
    ) { }

    valueOf() {
        return <this.type
            to={this.to}
            className={this.className}
            onClick={this.onClick}
        >
            {this.text}
        </this.type>;
    }
}
