"use client";
import axios from 'axios';
import { Grid } from 'gridjs-react';
import "gridjs/dist/theme/mermaid.css";
import Navbar from '../../components/navbar';
import { SetStateAction, useEffect, useState } from 'react';


export default function Orders() {
    const [orderData, setOrderData] = useState([]);
    const [error, setError] = useState('');
    const ordersData = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/v1/inventory/product-orders');
            setOrderData(response.data.data);
        } catch (error: any) {
            console.log("error",error)
            setError(error.message);
        }
    };
    useEffect(() => {
        ordersData();
    }, []);

    return (
        <>
            <Navbar />
            <div className='container'>
                <div className='row'>
                    <div className='col-md my-4'>
                        <div className='page-title'>
                            <h1>Purchase Orders</h1>
                        </div>

                        <div className='page-body'>
                            <Grid
                                data={orderData}
                                columns={[
                                    'Name',
                                    'Quanitity Ordered',
                                    'Order Date',
                                    'Expected Delivery Date',
                                    'Status',
                                ]}
                                search={true}
                                pagination={{
                                    limit: 10,
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}