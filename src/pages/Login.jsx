import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { useContext, useState } from 'react';
import { Form, Button, Container } from 'semantic-ui-react';
import { AuthContext } from '../context/auth';
import { useForm } from '../util/hooks';

const Login = (props) => {
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState({});
  const { onSubmit, handleChange, values } = useForm(loginUserCB, {
    username: '',
    password: '',
  });

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update(_, { data: { login: userData } }) {
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

  function loginUserCB() {
    loginUser();
  }

  return (
    <Container text>
      <Form onSubmit={onSubmit} noValidate className={loading ? 'loading' : ''}>
        <h1>Login</h1>
        <Form.Input
          label="Username"
          placeholder="Username"
          name="username"
          error={errors.username ? true : false}
          value={values.username}
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

        <Button type="submit" primary>
          Login
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

const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      email
      token
      username
      createdAt
    }
  }
`;

export default Login;
