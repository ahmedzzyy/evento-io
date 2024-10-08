import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { loginUser } from "@/services/authService";
import styles from "@/styles/Login.module.css";

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const router = useRouter();
    const [errorMsg, setErrorMsg] = useState('');

    const onSubmit = async (data) => {
        try {
            const response = await loginUser(data);

            localStorage.setItem('token', response.token);

            // Redirect to homepage after successful login
            router.push('/');
        } catch (error) {
            console.error('Error logging in:', error);
            setErrorMsg('An unexpected error occurred. Please try again.');
        }
    };

    return (
        <div className={styles.loginContainer}>
            <form className={styles.loginForm} onSubmit={handleSubmit(onSubmit)}>
                <h2 className={styles.loginTitle}>Login</h2>
                <div className={styles.formGroup}>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        name="email"
                        {...register('email', { required: 'Email is required' })}
                        placeholder="Enter your email"
                        className={styles.inputField}
                    />
                    {errors.email && <p className={styles.errorMessage}>{errors.email.message}</p>}
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        name="password"
                        {...register('password', { required: 'Password is required' })}
                        placeholder="Enter your password"
                        className={styles.inputField}
                    />
                    {errors.password && <p className={styles.errorMessage}>{errors.password.message}</p>}
                </div>

                <button type="submit" className={styles.submitBtn}>Login</button>

                {errorMsg && <p className={styles.errorMessage}>{errorMsg}</p>}
            </form>
        </div>
    );
};

export default Login;
