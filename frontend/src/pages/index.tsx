"use client";
import axios from 'axios';
import { Grid } from 'gridjs-react';
import "gridjs/dist/theme/mermaid.css";
import Navbar from '../../components/navbar';
import ModalForm from '../../components/modalform';
import { SetStateAction, useEffect, useState } from 'react';


export default function Page() {
    const [inventoryData, setInventoryData] = useState([]);
    const [error, setError] = useState('');
    const loadInventoryData = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/v1/inventory');
            setInventoryData(response.data.data);
        } catch (error: any) {
            console.log("error",error)
            setError(error.message);
        }
    };
    useEffect(() => {
        loadInventoryData();
    }, []);

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

                            <ModalForm setError={setError} refreshData={loadInventoryData} />
                            <Grid
                                data={inventoryData}
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