import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { signupUser } from "@/services/authService";
import styles from "@/styles/Login.module.css";

const Signup = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const router = useRouter();
  const [errorMsg, setErrorMsg] = useState('');

  const onSubmit = async (data) => {
    try {
      await signupUser(data);

      router.push('/auth/login');

    } catch (error) {
      console.error('Error signing up:', error);
      setErrorMsg('An unexpected error occurred. Please try again.');
    }
  };

  return (
    <div className={styles.loginContainer}>
      <form className={styles.loginForm} onSubmit={handleSubmit(onSubmit)}>
        <h2 className={styles.loginTitle}>Sign Up</h2>
        <div className={styles.formGroup}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            name="name"
            {...register('username', { required: 'Name is required' })}
            placeholder="Enter your name"
            className={styles.inputField}
          />
          {errors.name && <p className={styles.errorMessage}>{errors.name.message}</p>}
        </div>

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

        <div className={styles.formGroup}>
          <label htmlFor="role">Role:</label>
          <select name="role" {...register('role', { required: 'Role is required' })} className={styles.inputField}>
            <option value="">Select your role</option>
            <option value="attendee">Attendee</option>
            <option value="organizer">Organizer</option>
          </select>
          {errors.role && <p className={styles.errorMessage}>{errors.role.message}</p>}
        </div>

        <button type="submit" className={styles.submitBtn}>Sign Up</button>

        {errorMsg && <p className={styles.errorMessage}>{errorMsg}</p>}
      </form>
    </div>
  );
};

export default Signup;
