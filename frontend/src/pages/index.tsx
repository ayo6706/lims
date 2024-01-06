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
                                    ['John', 'john@example.com'],
                                    ['Mike', 'mike@gmail.com'],
                                    ['John', 'jon@example.com'],
                                    ['Mike', 'mie@gmail.com']
                                ]}
                                columns={['Name', 'Email']}
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