import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { Button, Label } from 'semantic-ui-react';

// import MyPopup from '../util/MyPopup';

function LikeButton({ user, post: { id, likeCount, likes } }) {
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (user && likes.find((like) => like.username === user.username)) {
      setLiked(true);
    } else setLiked(false);
  }, [user, likes]);

  const [likePost] = useMutation(LIKE_POST_MUTATION, {
    variables: { postId: id },
  });

  const likeButton = user ? (
    liked ? (
      <Button color="red" icon="heart " basic></Button>
    ) : (
      <Button color="red" icon="heart outline" basic></Button>
    )
  ) : (
    <Button
      as={Link}
      to="/login"
      icon="heart outline"
      color="red"
      basic
    ></Button>
  );

  return (
    <Button as="div" labelPosition="right" onClick={user ? likePost : ''}>
      {likeButton}
      {/* <MyPopup content={liked ? 'Unlike' : 'Like'}>{likeButton}</MyPopup> */}
      <Label basic color="red" pointing="left">
        {likeCount}
      </Label>
    </Button>
  );
}

const LIKE_POST_MUTATION = gql`
  mutation likePost($postId: ID!) {
    likePost(postId: $postId) {
      id
      likes {
        id
        username
      }
      likeCount
    }
  }
`;

export default LikeButton;
