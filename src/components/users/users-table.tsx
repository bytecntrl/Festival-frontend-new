import React from "react";

import { User } from "../../models/users.model";

interface UserTableProps {
    data: User[]
    delUser: (id: number) => void
}


function UsersTable({ data, delUser }: UserTableProps) {
    const users: JSX.Element[] = data.map(v => (
        <tr key={v.id}>
            <th scope="row">{v.id}</th>
            <td>{v.username}</td>
            <td>{v.role}</td>
            <td>
                <button 
                    type="button" 
                    className="btn btn-danger"
                    onClick={() => delUser(v.id)}
                >
                    <i className="bi bi-trash" />
                </button>
            </td>
        </tr>
    ));

    return (
        <table className="table table-bordered">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Username</th>
                    <th scope="col">Role</th>
                    <th scope="col">Actions</th>
                </tr>
            </thead>
            <tbody>
                {users}
            </tbody>
        </table>
    );
}

export default UsersTable;
