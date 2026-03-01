import React from 'react';
import { useNavigate } from 'react-router-dom';

const CancelPage = () => {
    const navigate = useNavigate();

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>Payment Cancelled!</h1>
            {/* <p>Thank you for your payment. Your transaction has been completed successfully.</p> */}
            <button
                onClick={() => navigate('/')}
                style={{
                    padding: '10px 20px',
                    backgroundColor: '#4CAF50',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    fontSize: '16px'
                }}
            >
                Go to Home Page
            </button>
        </div>
    );
};

export default CancelPage;
