import React, { useCallback, useEffect, useState } from 'react';

import ErrorMessage from '../components/error-message';
import PageButton from '../components/page-button';
import SubcategoriesAdd from '../components/subcategories/subcategories-add';
import SubcategoriesTable from '../components/subcategories/subcategories-table';
import useHttpClient from '../hooks/http-client';
import BaseResponse from '../models/base.model';
import { SubcategoriesResponse, Subcategory } from '../models/subcategories.model';

export default function RouteSubcategories() {
    const [page, setPage] = useState(1);
    const [pageNum, setPageNum] = useState(1);
    const [state, setState] = useState<Subcategory[]>([]);
    const [message, setMessage] = useState("");

    const client = useHttpClient();

    client.setHeader();

    const fetchData = useCallback(async () => {
        const data = await client.get<SubcategoriesResponse>('/subcategories', { page });

        if (data.error) {
            setMessage(data.message);
            return;
        }

        setState(data.categories);
        setPageNum(data.pages);
        // eslint-disable-next-line
    }, [page]);

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

        setPage(1);
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
            <SubcategoriesTable data={state} delSubcategory={delSubcategory} />
            <div className="d-flex justify-content-end">
                <div className="btn-group" role="group">
                    {pages}
                </div>
            </div>
            <SubcategoriesAdd addSubcategory={addSubcategory} />
        </div>
    );
}
