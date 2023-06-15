import React from "react";

import { Subcategory } from "../../models/subcategories.model";

interface SubcategoriesTableProps {
    data: Subcategory[]
    delSubcategory: (id: number) => void
}

function SubcategoriesTable({ data, delSubcategory }: SubcategoriesTableProps) {
    const subcategories: JSX.Element[] = data.map(v => (
        <tr key={v.id}>
            <th scope="row">{v.id}</th>
            <td>{v.name}</td>
            <td>{v.order}</td>
            <td>
                <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => delSubcategory(v.id)}
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
                    <th scope="col">Order</th>
                    <th scope="col">Actions</th>
                </tr>
            </thead>
            <tbody>
                {subcategories}
            </tbody>
        </table>
    );
}

export default SubcategoriesTable;
