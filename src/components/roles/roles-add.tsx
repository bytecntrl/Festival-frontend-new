import React, { useState } from "react";

import { Permission } from "../../enums/permissions";

interface RolesAddProps {
    addRole: (name: string, permissions: string) => Promise<void>
}

function RolesAdd({ addRole }: RolesAddProps) {
    const [name, setName] = useState("");
    const [permission, setPermission] = useState<Permission>(Permission.ORDER);

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };

    const handlePermissionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = event.target.value as Permission;
        setPermission(selectedValue);
      };

    const handleClick = async () => {
        await addRole(name, permission);
        setName("");
        setPermission(Permission.ORDER);
    };

    const permissionOptions = Object.values(Permission).map((permission) => (
        <option key={permission} value={permission}>{permission.replace("_", " ")}</option>
    ));

    return (
        <>
            <button
                type="button"
                className="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#AddRoleModal"
            >
                Add Role
            </button>
            
            <div
                className="modal fade"
                id="AddRoleModal"
                aria-labelledby="AddRoleModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="AddRoleModalLabel">Add Subcaategory</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                        </div>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label htmlFor="name-field" className="col-form-label">Name:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="name-field"
                                    name="name"
                                    value={name}
                                    onChange={handleNameChange} 
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="permission-field" className="col-form-label">Permission:</label>
                                <select
                                    id="permission-field"
                                    className="form-select"
                                    name="permission"
                                    onChange={handlePermissionChange}
                                    value={permission}
                                >
                                    { permissionOptions }
                                </select>
                            </div>
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

export default RolesAdd;