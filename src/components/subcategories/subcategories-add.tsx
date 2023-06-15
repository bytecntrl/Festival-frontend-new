import React, { useState } from "react";

interface SubcategoriesAddProps {
    addSubcategory: (name: string, order: number) => Promise<void>
}

function SubcategoriesAdd({ addSubcategory }: SubcategoriesAddProps) {
    const [name, setName] = useState("");
    const [order, setOrder] = useState(0);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const name = event.target.name;
        const value = event.target.value;

        if (name === "name") {
            setName(value);
        } else if (name === "order") {
            setOrder(parseInt(value, 10));
        }
    };

    const handleClick = async () => {
        await addSubcategory(name, order);
        setName("");
        setOrder(0);
    };

    return (
        <>
            <button
                type="button"
                className="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#AddSubCategoryModal"
            >
                Add Subcategory
            </button>
            
            <div
                className="modal fade"
                id="AddSubCategoryModal"
                aria-labelledby="AddSubCategoryModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="AddSubCategoryModalLabel">Add Subcaategory</h5>
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
                                    onChange={handleChange} 
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="order-field" className="col-form-label">Order:</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="order-field"
                                    min="0"
                                    name="order"
                                    value={order}
                                    onChange={handleChange}
                                />
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

export default SubcategoriesAdd;