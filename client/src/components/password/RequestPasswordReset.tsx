import React, { useState } from 'react';
import axiosInstance from '../../axiosInstance';

const RequestPasswordReset = () => {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosInstance.post('/api/auth/request-reset', { email });
            setStatus('Письмо с подтверждением отправлено!');
        } catch (error) {
            setStatus('Произошла ошибка, попробуйте снова.');
        }
    };

    return (
        <div>
            <h2>Запрос на изменение пароля</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Введите ваш email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <button type="submit">Отправить OTP</button>
            </form>
            {status && <p>{status}</p>}
        </div>
    );
};

export default RequestPasswordReset;