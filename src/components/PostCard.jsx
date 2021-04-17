import moment from 'moment';
import { Link } from 'react-router-dom';
import { Card, Image, Button } from 'semantic-ui-react';

import { AuthContext } from '../context/auth';
import { useContext } from 'react';
import LikeButton from './LikeButton';
import DeleteButton from './DeleteButton';

const PostCard = ({
  post: { body, createdAt, id, username, likeCount, commentCount, likes },
}) => {
  const { user } = useContext(AuthContext);

  return (
    <Card fluid>
      <Card.Content>
        <Image
          circular
          floated="right"
          size="mini"
          src="https://react.semantic-ui.com/images/avatar/large/molly.png"
        />
        <Card.Header>{username}</Card.Header>
        <Card.Meta as={Link} to={`/posts/${id}`}>
          {moment(createdAt).fromNow(true)}
        </Card.Meta>
        <Card.Description>{body}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <LikeButton user={user} post={{ id, likes, likeCount }} />
        <Button
          as={Link}
          to={`/posts/${id}`}
          color="blue"
          icon="comments"
          basic
          label={{
            basic: true,
            color: 'blue',
            pointing: 'left',
            content: commentCount,
          }}
        />
        {user && user.username === username && <DeleteButton postId={id} />}
      </Card.Content>
    </Card>
  );
};

export default PostCard;
