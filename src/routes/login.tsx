import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import useTokenJwt from '../stores/token-jwt';
import HttpClient from '../services/http-client.service';

export default function RouteLogin() {
    const [state, setState] = useState({"username": "", "password": ""});
    const [message, setMessage] = useState("");

    const {setTokenJwt, reset} = useTokenJwt();

    const client = new HttpClient(reset);

    const navigate = useNavigate();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const name = event.target.name;
        const value = event.target.value;
        setState(values => ({...values, [name]: value}));
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        if (!state.username || !state.password) {
            setMessage("Password or username missing");
            return;
        }

        const resp = await client.get("/auth", {username: state.username, password: state.password}) as {error: boolean, message: string, token: string};

        console.log(resp);

        if (resp.error) {
            setMessage(resp.message);
            return;
        }

        setTokenJwt(resp.token);

        return navigate("/");
    }

    return (
        <div className="container mt-3">
            {message ? <div className="alert alert-danger" role="alert">{message}</div> : null}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="formInputUsername" className="form-label">Username:</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="formInputUsername" 
                        placeholder="Input your username" 
                        name="username"
                        value={state.username}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="formInputPassword" className="form-label">Password:</label>
                    <input 
                        type="password" 
                        className="form-control" 
                        id="formInputPassword" 
                        placeholder="Input your password" 
                        name="password"
                        value={state.password}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
        </div>
    );
}
