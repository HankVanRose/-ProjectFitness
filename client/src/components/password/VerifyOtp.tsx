import React, { useState } from 'react';
import axiosInstance from '../../axiosInstance';

const VerifyOTP = ({ email }) => {
    const [otp, setOtp] = useState('');
    const [status, setStatus] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axiosInstance.post('/api/auth/verify-otp', { email, otp });
            setStatus('OTP подтвержден. Теперь вы можете изменить ваш пароль.');
        } catch (error) {
            setStatus('Неверный OTP, попробуйте снова.');
        }
    };

    return (
        <div>
            <h2>Подтвердите ваш OTP</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Введите ваш OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    required
                />
                <button type="submit">Подтвердить OTP</button>
            </form>
            {status && <p>{status}</p>}
        </div>
    );
};

export default VerifyOTP;