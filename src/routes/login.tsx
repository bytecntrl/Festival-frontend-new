import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import ErrorMessage from '../components/error-message';
import { LoginResponse } from '../models/auth.model';
import HttpClient from '../services/http-client.service';
import useTokenJwt from '../stores/token-jwt';

export default function RouteLogin() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
  
    const { setTokenJwt } = useTokenJwt();
  
    const client = new HttpClient();
    const navigate = useNavigate();
  
    const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
    };
  
    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };
  
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    
        if (!username || !password) {
            setMessage("Password or username missing");
            return;
        }
    
        const resp = await client.get<LoginResponse>("/auth", {
            username: username,
            password: password,
        });
    
        if (resp.error) {
            setMessage(resp.message);
            return;
        }
    
        setTokenJwt(resp.token!);
    
        return navigate("/");
    };
  
    return (
        <div className="container mt-3">
            <ErrorMessage message={message}/>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="formInputUsername" className="form-label">
                        Username:
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="formInputUsername"
                        placeholder="Input your username"
                        value={username}
                        onChange={handleUsernameChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="formInputPassword" className="form-label">
                        Password:
                    </label>
                    <input
                        type="password"
                        className="form-control"
                        id="formInputPassword"
                        placeholder="Input your password"
                        value={password}
                        onChange={handlePasswordChange}
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    Login
                </button>
            </form>
        </div>
    );
}
