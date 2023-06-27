import React, { useCallback, useEffect, useState } from 'react';

import ErrorMessage from '../components/error-message';
import PageButton from '../components/page-button';
import UserAdd from '../components/users/user-add';
import UsersTable from '../components/users/users-table';
import useHttpClient from '../hooks/http-client';
import BaseResponse from '../models/base.model';
import { RolesNameReponse } from '../models/roles.model';
import { RegisterResponse, User, UsersReponse } from '../models/users.model';

export default function RouteUsers() {
    const [page, setPage] = useState(1);
    const [pageNum, setPageNum] = useState(1);
    const [state, setState] = useState<User[]>([]);
    const [message, setMessage] = useState("");
    const [roles, setRoles] = useState<Record<number, string>>({});

    const client = useHttpClient();

    client.setHeader();

    const fetchData = useCallback(async () => {
        const data = await client.get<UsersReponse>('/users', { page: page });
        const rolesData = await client.get<RolesNameReponse>('/roles/name');

        if (data.error) {
            setMessage(data.message);
            return;
        }

        if (Object.keys(rolesData.roles).length === 0)
            setMessage("First set the roles");

        setState(data.users);
        setPageNum(data.pages);
        setRoles(rolesData.roles);
        // eslint-disable-next-line
    }, [page]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const delUser = async (id: number) => {
        setMessage("");

        const data = await client.remove<BaseResponse>(`/users/${id}`);

        if (data.error) {
            setMessage(data.message);
            return;
        }

        setPage(1);
        fetchData();
    }

    const addUser = async (username: string, password: string, roleId: number) => {
        setMessage("");

        const data = await client.post<RegisterResponse>('/auth', {
            username,
            password,
            role_id: roleId
        });

        if (data.error) {
            setMessage(data.message);
            return;
        }

        setPage(1);
        fetchData();
    }

    const pages: JSX.Element[] = Array.from(Array(pageNum).keys()).map((x) => (
        <PageButton
            key={x.toString()}
            pageNumber={x + 1}
            isActive={x + 1 === page}
            onClick={() => setPage(x + 1)}
        />
    ));

    return (
        <div className="container mt-4">
            <ErrorMessage message={message} />
            <UsersTable
                data={state}
                delUser={delUser}
                roles={roles}
            />
            <div className="d-flex justify-content-end">
                <div className="btn-group" role="group">
                    {pages}
                </div>
            </div>
            {Object.entries(roles).length > 0 && <UserAdd roles={roles} addUser={addUser} />}
        </div>
    );
}
