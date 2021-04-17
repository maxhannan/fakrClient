import { Button, Form, Icon } from 'semantic-ui-react';
import { useForm } from '../util/hooks';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import { FETCH_POSTS_QUERY } from '../util/graphql';

const PostForm = () => {
  const { onSubmit, handleChange, values } = useForm(createPostCallback, {
    body: '',
  });

  const [createPost, { error }] = useMutation(CREATE_POST_MUTATION, {
    variables: values,
    update(proxy, result) {
      const data = proxy.readQuery({
        query: FETCH_POSTS_QUERY,
      });
      proxy.writeQuery({
        query: FETCH_POSTS_QUERY,
        data: {
          getPosts: [result.data.createPost, ...data.getPosts],
        },
      });
      values.body = '';
    },
    onError(err) {
      return err;
    },
  });

  function createPostCallback() {
    createPost();
  }
  return (
    <div style={{ marginBottom: '20px' }}>
      <Form onSubmit={onSubmit}>
        <h2>Create a post</h2>
        <Form.Field>
          <Form.TextArea
            rows={3}
            placeholder="Write your next masterpiece..."
            name="body"
            onChange={handleChange}
            value={values.body}
            error={error ? true : false}
          />
          <Button type="submit" icon labelPosition="right" color="blue">
            Post
            <Icon name="send" />
          </Button>
        </Form.Field>
      </Form>
      {error && (
        <div className="ui error message">
          <ul className="list">
            <li>{error.graphQLErrors[0].message}</li>
          </ul>
        </div>
      )}
    </div>
  );
};

const CREATE_POST_MUTATION = gql`
  mutation createPost($body: String!) {
    createPost(body: $body) {
      id
      body
      createdAt
      username
      likes {
        id
        username
        createdAt
      }
      likeCount
      comments {
        id
        username
        body
        createdAt
      }
      commentCount
    }
  }
`;
export default PostForm;
