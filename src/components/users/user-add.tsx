import React, { useState } from "react";

import ROLES from "../../env/roles";

interface UserAddProps {
    addUser: (username: string, password: string, role: string) => Promise<void>
}

function UserAdd({ addUser }: UserAddProps) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState(0);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const name = event.target.name;
        const value = event.target.value;

        if (name === "username") {
            setUsername(value);
        } else if (name === "password") {
            setPassword(value);
        } else if (name === "role") {
            setRole(parseInt(value, 10));
        }
    };

    const handleClick = async () => {
        await addUser(username, password, ROLES[role]);
        setUsername("");
        setPassword("");
        setRole(0);
    };

    return (
        <>
            <button
                type="button"
                className="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#AddUserModal"
            >
                Add User
            </button>

            <div
                className="modal fade"
                id="AddUserModal"
                aria-labelledby="AddUserModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="AddUserModalLabel">Add User</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                        </div>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label htmlFor="username-field" className="col-form-label">Username:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="username-field"
                                    name="username"
                                    value={username}
                                    onChange={handleChange} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password-field" className="col-form-label">Password:</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="password-field"
                                    name="password"
                                    value={password}
                                    onChange={handleChange} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="role-field" className="col-form-label">Role:</label>
                                <select
                                    id="role-field"
                                    className="form-select"
                                    name="role"
                                    onChange={handleChange}
                                    value={role}
                                >
                                    {ROLES.map((role, index) => (
                                        <option value={index} key={index}>{role}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={handleClick}>
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default UserAdd;