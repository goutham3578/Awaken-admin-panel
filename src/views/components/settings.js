/*eslint-disable*/
import React, { useState } from 'react';
import { Button, Input } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { MdAddCircleOutline } from "react-icons/md";
import PlanDetailsForm from './plandetails';

const Settings = () => {
    const columns = [
        'Plan Type Frequencies',
        'Debt Types',
        'Goals list',
        'Investment Types',
        'Asset Types',
        'Liabilites Types',
        'Type of Insurancs',
        'Risk Capacity Requirement',
        'Financial Planner Assessment',
        'Recommendations',
        'Goil funds',
        'Fix Top Up'
    ]

    // Inline styles
    const styles = {
        form: {
            width: '100%',
            padding: '16px',
            borderRadius: '10px',
            borderColor: '#007bff',
        },
        headerRow: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            border: '1px solid #ddd',
            marginBottom: '8px',
            color: '#747474',
            width: "auto"
        },        
        headerItem: {
            flex: 1,
            textAlign: 'center',
            padding: '8px',
            width: 'auto',
            // borderBottom: '1px solid #ddd',
            fontWeight: 'bold',
            fontSize: '12px' // Adjust this value as needed
        }
    };

    return (
        <div className='bg-body-bg'>
            <div style={styles.headerRow}>
                {columns.map((column, index) => (
                    <div key={index} style={styles.headerItem}>
                        {column}
                    </div>
                ))}
            </div>
            <PlanDetailsForm />
        </div>
    );
};

export default Settings;
