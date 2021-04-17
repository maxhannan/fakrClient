import { useQuery } from '@apollo/client';
import { Grid, Transition, Container } from 'semantic-ui-react';
import { FETCH_POSTS_QUERY } from '../util/graphql';
import { AuthContext } from '../context/auth';
import { useContext } from 'react';
import PostCard from '../components/PostCard';
import PostForm from '../components/PostForm';

const Home = () => {
  const { user } = useContext(AuthContext);

  const { loading, data: { getPosts: posts } = {} } = useQuery(
    FETCH_POSTS_QUERY,
  );

  return (
    <Container>
      <Grid columns={1}>
        <Grid.Row className="page-title">
          <h1>Recent Posts</h1>
        </Grid.Row>
        <Grid.Row>
          {user && (
            <Grid.Column>
              <PostForm />
            </Grid.Column>
          )}
          {loading ? (
            <Container text>
              <h1>Loading...</h1>
            </Container>
          ) : (
            <Transition.Group>
              {posts &&
                posts.map((post) => (
                  <Grid.Column key={post.id} style={{ marginBottom: '20px' }}>
                    <PostCard post={post} />
                  </Grid.Column>
                ))}
            </Transition.Group>
          )}
        </Grid.Row>
      </Grid>
    </Container>
  );
};

export default Home;
