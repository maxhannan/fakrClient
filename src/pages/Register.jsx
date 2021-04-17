import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { useForm } from '../util/hooks';
import { useState, useContext } from 'react';
import { Form, Button, Container } from 'semantic-ui-react';

import { AuthContext } from '../context/auth';

const Register = (props) => {
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState({});

  const { onSubmit, handleChange, values } = useForm(registerUser, {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    update(_, { data: { register: userData } }) {
      context.login(userData);
      props.history.push('/');
    },
    onError(err) {
      setErrors(
        err && err.graphQLErrors[0]
          ? err.graphQLErrors[0].extensions.exception.errors
          : {},
      );
    },
    variables: values,
  });

  function registerUser() {
    addUser();
  }

  return (
    <Container text>
      <Form onSubmit={onSubmit} noValidate className={loading ? 'loading' : ''}>
        <h1>Register</h1>
        <Form.Input
          label="Username"
          placeholder="Username"
          name="username"
          error={errors.username ? true : false}
          value={values.username}
          onChange={handleChange}
        />
        <Form.Input
          label="Email"
          placeholder="Email"
          type="email"
          name="email"
          error={errors.email ? true : false}
          value={values.email}
          onChange={handleChange}
        />
        <Form.Input
          label="Password"
          placeholder="Password"
          type="password"
          name="password"
          error={errors.password ? true : false}
          value={values.password}
          onChange={handleChange}
        />
        <Form.Input
          label="Confirm Password"
          placeholder="Confirm Password"
          name="confirmPassword"
          type="password"
          error={errors.confirmPassword ? true : false}
          value={values.confirmPassword}
          onChange={handleChange}
        />
        <Button type="submit" primary>
          Register
        </Button>
      </Form>
      {Object.keys(errors).length > 0 && (
        <div className="ui error message">
          <ul className="list">
            {Object.values(errors).map((value) => (
              <li key={value}>{value}</li>
            ))}
          </ul>
        </div>
      )}
    </Container>
  );
};

const REGISTER_USER = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
      email
      token
      username
      createdAt
    }
  }
`;

export default Register;
