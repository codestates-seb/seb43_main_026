import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { COLOR, SIZE } from '../../style/theme';
import { FaHeart } from 'react-icons/fa';
import { BiComment } from 'react-icons/bi';

const Containter = styled.ul`
  width: 100%;
  height: 650px;
`;

const Item = styled.li`
  width: 100%;
  height: fit-content;
  padding: 13px 18px 13px 18px;
  border-bottom: 1px solid rgba(230, 231, 235, 1);
  cursor: pointer;
  @media screen and(min-width: ${SIZE.tablet}) {
    padding: 10px 13px 10px 13px;
  }
`;

const TitleAndReaction = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 3px;
`;

const Title = styled.h2`
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
  display: inline-block;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Reaction = styled.div`
  display: flex;

  width: 65px;
`;

const Like = styled.div`
  display: flex;
  width: 50%;

  align-items: center;
  span {
    line-height: 20px;
    font-size: 12px;
    color: ${COLOR.font_comment};
  }
`;

const HeartIcon = styled(FaHeart)`
  margin-right: 3px;
  color: ${COLOR.main_blue};
`;

const Comment = styled.div`
  display: flex;
  width: 50%;
  justify-content: center;
  align-items: center;
  span {
    line-height: 20px;
    font-size: 12px;
    color: ${COLOR.font_comment};
  }
`;

const CommentIcon = styled(BiComment)`
  margin-right: 3px;
  transform: scaleX(-1);
  color: ${COLOR.main_blue};
`;
const WriterAndCreateAt = styled.div`
  font-size: 12px;
  height: 15px;
  display: flex;
  align-items: center;
`;
const Writer = styled.span`
  margin: 0px 2px 0px 1px;
  width: 50px;
  display: inline-block;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-weight: 600;
  color: ${COLOR.main_dark_blue};
`;
const CreatDate = styled.span``;

const List = ({ posts }) => {
  return (
    <Containter>
      {posts.length
        ? posts.map((post) => (
            <Item key={post.boardId}>
              <Link to={`/board/${post.boardId}`}>
                <TitleAndReaction>
                  <Title>{post.title}</Title>
                  <Reaction>
                    <Like>
                      <HeartIcon size={13} />
                      <span>{post.boardLikeCount}</span>
                    </Like>
                    <Comment>
                      <CommentIcon size={13} />
                      <span>{post.commentCount}</span>
                    </Comment>
                  </Reaction>
                </TitleAndReaction>
                <WriterAndCreateAt>
                  <Writer>{post.writer}</Writer>
                  <CreatDate>{post.createdAt.slice(0, 10)}</CreatDate>
                </WriterAndCreateAt>
              </Link>
            </Item>
          ))
        : null}
    </Containter>
  );
};

export default List;
