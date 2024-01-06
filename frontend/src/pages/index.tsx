"use client";
import { Grid } from 'gridjs-react';
import "gridjs/dist/theme/mermaid.css";
import Navbar from '../../components/navbar';
import ModalForm from '../../components/modalform';

export default function Page() {
    return (
        <>
            <Navbar />
            <div className='container'>
                <div className='row'>
                    <div className='col-md my-4'>
                        <div className='page-title'>
                            <h1>Inventory Management System</h1>
                        </div>

                        <div className='page-body'>
                            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                                Add New
                            </button>

                            <ModalForm />
                            <Grid
                                data={[
                                    ['Laptop', 'New 15.6" laptop with SSD', 20, 5, 30, 7],
                                    ['Laptop', 'New 15.6" laptop with SSD', 20, 5, 30, 7],
                                    ['Golden', 'New 15.6" laptop with SSD', 20, 5, 30, 7],
                                    ['Laptop', 'New 15.6" laptop with SSD', 20, 5, 30, 7],
                                ]}
                                columns={[
                                    'Name', 
                                    'Description', 
                                    'Current Stock', 
                                    'Reorder Level', 
                                    'Optimal Stock Level', 
                                    'Lead Time Days' 
                                ]}
                                search={true}
                                pagination={{
                                    limit: 2,
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}