import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useState } from 'react';

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const router = useRouter();
    const [errorMsg, setErrorMsg] = useState('');

    const onSubmit = async (data) => {
        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const response = await res.json();

            if (res.ok) {
                // Store the JWT token in localStorage
                localStorage.setItem('token', response.token);

                // Redirect to homepage after successful login
                router.push('/');
            } else {
                // If login fails, display an error message
                setErrorMsg(response.msg || 'Login failed');
            }
        } catch (error) {
            console.error('Error logging in:', error);
            setErrorMsg('An unexpected error occurred. Please try again.');
        }
    };

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        {...register('email', { required: 'Email is required' })}
                        placeholder="Enter your email"
                    />
                    {errors.email && <p>{errors.email.message}</p>}
                </div>

                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        {...register('password', { required: 'Password is required' })}
                        placeholder="Enter your password"
                    />
                    {errors.password && <p>{errors.password.message}</p>}
                </div>

                <button type="submit">Login</button>

                {errorMsg && <p style={{ color: 'red' }}>{errorMsg}</p>}
            </form>
        </div>
    );
};

export default Login;
