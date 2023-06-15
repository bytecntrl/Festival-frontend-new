import React, { useCallback, useEffect, useState } from 'react';

import ErrorMessage from '../components/error-message';
import SubcategoriesAdd from '../components/subcategories/subcategories-add';
import SubcategoriesTable from '../components/subcategories/subcategories-table';
import useHttpClient from '../hooks/http-client';
import BaseResponse from '../models/base.model';
import { SubcategoriesResponse, Subcategory } from '../models/subcategories.model';

export default function RouteSubcategories() {
    const [state, setState] = useState<Subcategory[]>([]);
    const [message, setMessage] = useState("");

    const client = useHttpClient();

    client.setHeader();

    const fetchData = useCallback(async () => {
        const data = await client.get<SubcategoriesResponse>('/subcategories');

        if (data.error) {
            setMessage(data.message);
            return;
        }

        setState(data.categories);
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const delSubcategory = async (id: number) => {
        setMessage("");

        const data = await client.remove<BaseResponse>(`/subcategories/${id}`);

        if (data.error) {
            setMessage(data.message);
            return;
        }

        fetchData();
    }

    const addSubcategory = async (name: string, order: number) => {
        setMessage("");

        const data = await client.post<BaseResponse>('/subcategories', {
            name,
            order
        });

        if (data.error) {
            setMessage(data.message);
            return;
        }

        fetchData();
    }

    return (
        <div className="container mt-4">
            <ErrorMessage message={message} />
            <SubcategoriesTable data={state} delSubcategory={delSubcategory} />
            <SubcategoriesAdd addSubcategory={addSubcategory}/>
        </div>
    );
}
