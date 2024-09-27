import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { signupUser } from "../../services/authService";

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
    <div>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Name:</label>
          <input 
            type="text" 
            {...register('username', { required: 'Name is required' })} 
            placeholder="Enter your name"
          />
          {errors.name && <p>{errors.name.message}</p>}
        </div>

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

        <div>
          <label>Role:</label>
          <select {...register('role', { required: 'Role is required' })}>
            <option value="">Select your role</option>
            <option value="attendee">Attendee</option>
            <option value="organizer">Organizer</option>
          </select>
          {errors.role && <p>{errors.role.message}</p>}
        </div>

        <button type="submit">Sign Up</button>

        {errorMsg && <p style={{ color: 'red' }}>{errorMsg}</p>}
      </form>
    </div>
  );
};

export default Signup;
