import React, { useCallback, useEffect, useState } from 'react';

import ErrorMessage from '../components/error-message';
import PageButton from '../components/page-button';
import RolesAdd from '../components/roles/roles-add';
import RolesTable from '../components/roles/roles-table';
import useHttpClient from '../hooks/http-client';
import BaseResponse from '../models/base.model';
import { Role, RolesReponse } from '../models/roles.model';


export default function RouteRoles() {
    const [page, setPage] = useState(1);
    const [pageNum, setPageNum] = useState(1);
    const [state, setState] = useState<Role[]>([]);
    const [message, setMessage] = useState("");

    const client = useHttpClient();

    client.setHeader();

    const fetchData = useCallback(async () => {
        const data = await client.get<RolesReponse>('/roles', { page });

        if (data.error) {
            setMessage(data.message);
            return;
        }

        setState(data.roles);
        setPageNum(data.pages);
        // eslint-disable-next-line
    }, [page]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const delRole = async (id: number) => {
        setMessage("");

        const data = await client.remove<BaseResponse>(`/roles/${id}`);

        if (data.error) {
            setMessage(data.message);
            return;
        }

        setPage(1);
        fetchData();
    }

    const addRole = async (name: string, permissions: string) => {
        setMessage("");

        const data = await client.post<BaseResponse>('/roles', {
            name,
            permissions
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
            <RolesTable data={state} delRole={delRole} />
            <div className="d-flex justify-content-end">
                <div className="btn-group" role="group">
                    {pages}
                </div>
            </div>
            <RolesAdd addRole={addRole} />
        </div>
    );
}
