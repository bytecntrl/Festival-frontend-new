import React from "react";

import { Role } from "../../models/roles.model";

interface RolesTableProps {
    data: Role[]
    delRole: (id: number) => void
}

function RolesTable({ data, delRole }: RolesTableProps) {
    const subcategories: JSX.Element[] = data.map(v => (
        <tr key={v.id}>
            <th scope="row">{v.id}</th>
            <td>{v.name.replace("_", " ")}</td>
            <td>{v.permissions}</td>
            <td>
                <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => delRole(v.id)}
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
                    <th scope="col">Name</th>
                    <th scope="col">Permissions</th>
                    <th scope="col">Actions</th>
                </tr>
            </thead>
            <tbody>
                {subcategories}
            </tbody>
        </table>
    );
}

export default RolesTable;
