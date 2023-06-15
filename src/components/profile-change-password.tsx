import React, { useState } from 'react';

interface ProfileChangePasswordProps {
    changePassword: (password: string) => Promise<void>
}

export default function ProfileChangePassword({ changePassword }: ProfileChangePasswordProps) {
    const [password, setPassword] = useState("");

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const handleClick = async () => {
        await changePassword(password);
        setPassword("");
    };

    return (
        <>
            <button
                type="button"
                className="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#ChangePasswordModal"
            >
                Change Password
            </button>

            <div
                className="modal fade"
                id="ChangePasswordModal"
                aria-labelledby="ChangePasswordModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="ChangePasswordModalLabel">Change Password</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="passwordField" className="col-form-label">Password:</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="passwordField"
                                        value={password}
                                        onChange={handlePasswordChange}
                                    />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button
                                type="button"
                                className="btn btn-primary"
                                data-bs-dismiss="modal"
                                onClick={handleClick}
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
