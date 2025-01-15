import React, { useState } from 'react';
import axiosInstance from '../../axiosInstance';

const ResetPassword = ({ email }) => {
    const [newPassword, setNewPassword] = useState('');
    const [status, setStatus] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axiosInstance.post('/api/auth/reset-password', { email, newPassword });
            setStatus('Пароль успешно изменен!');
        } catch (error) {
            setStatus('Произошла ошибка, попробуйте снова.');
        }
    };

    return (
        <div>
            <h2>Введите новый пароль</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="password"
                    placeholder="Введите новый пароль"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                />
                <button type="submit">Изменить пароль</button>
            </form>
            {status && <p>{status}</p>}
        </div>
    );
};

export default ResetPassword;