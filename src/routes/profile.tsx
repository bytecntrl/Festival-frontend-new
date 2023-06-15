import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';
import ErrorMessage from '../components/error-message';
import ProfileChangePassword from '../components/profile-change-password';
import useHttpClient from '../hooks/http-client';
import BaseResponse from '../models/base.model';
import TokenJwtService from '../services/token-jwt.service';
import useTokenJwt from '../stores/token-jwt';

export default function RouteProfile() {
    const { tokenJwt } = useTokenJwt();
    const [message, setMessage] = useState("");
    const token = new TokenJwtService(tokenJwt).getToken();

    const client = useHttpClient();
    const navigate = useNavigate();

    client.setHeader();

    const changePassword = async (password: string) => {
        const resp = await client.put<BaseResponse>("/users", {
            password: password,
        });

        if (resp.error) {
            setMessage(resp.message);
            return;
        }

        return navigate("/");
    };

    return (
        <div className="container mt-4">
            <ErrorMessage message={message} />
            <p><b>Username:&nbsp;</b>{token.username}</p>
            <p><b>Role:&nbsp;</b>{token.role}</p>
            <ProfileChangePassword changePassword={changePassword} />
        </div>
    );
}