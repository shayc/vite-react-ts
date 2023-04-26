import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../app/hooks';
import type { LoginRequest } from '../../app/services/auth';
import { useLoginMutation } from '../../app/services/auth';
import { ProtectedComponent } from './ProtectedComponent';
import { setCredentials } from './authSlice';

function PasswordInput({
  name,
  onChange,
}: {
  name: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  return (
    <div>
      <input
        type={show ? 'text' : 'password'}
        placeholder="Enter password"
        name={name}
        onChange={onChange}
      />
      <button onClick={handleClick}>{show ? 'Hide' : 'Show'}</button>
    </div>
  );
}

export const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [formState, setFormState] = React.useState<LoginRequest>({
    username: '',
    password: '',
  });

  const [login, { isLoading }] = useLoginMutation();

  const handleChange = ({
    target: { name, value },
  }: React.ChangeEvent<HTMLInputElement>) =>
    setFormState((prev) => ({ ...prev, [name]: value }));

  return (
    <div>
      <div>Hint: enter anything, or leave it blank and hit login</div>

      <input
        onChange={handleChange}
        name="username"
        type="text"
        placeholder="Email"
      />

      <PasswordInput onChange={handleChange} name="password" />

      <button
        onClick={async () => {
          try {
            const user = await login(formState).unwrap();
            dispatch(setCredentials(user));
            navigate('/');
          } catch (error) {
            console.log('error', error);
          }
        }}
      >
        Login
      </button>

      <ProtectedComponent />
    </div>
  );
};

export default Login;
