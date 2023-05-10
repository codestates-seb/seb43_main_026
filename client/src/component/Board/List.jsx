//모듈
import styled from 'styled-components';

//아이콘
import { FaHeart } from 'react-icons/fa';
import { BiComment } from 'react-icons/bi';

const ListContainter = styled.ul`
  width: 100%;
`;

const Lists = styled.li`
  width: 100%;
  height: fit-content;
  padding: 13px 18px 13px 18px;
  border-bottom: 1px solid rgba(230, 231, 235, 1);
  cursor: pointer;
  @media ${(props) => props.theme.breakpoints.tabletMin} {
    padding: 10px 13px 10px 13px;
  }
`;

const MainInfo = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 3px;
  h2 {
    font-size: 14px;
    font-weight: 600;
    line-height: 20px;
    display: inline-block;
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

const ReactBox = styled.div`
  display: flex;

  width: 65px;
`;

const LikeBox = styled.div`
  display: flex;
  width: 50%;

  align-items: center;
  span {
    line-height: 20px;
    font-size: 12px;
    color: ${(props) => props.theme.color.font_comment};
  }
`;

const HeartIcon = styled(FaHeart)`
  margin-right: 3px;
  color: ${(props) => props.theme.color.main_blue};
`;

const CommentBox = styled.div`
  display: flex;
  width: 50%;
  justify-content: center;
  align-items: center;
  span {
    line-height: 20px;
    font-size: 12px;
    color: ${(props) => props.theme.color.font_comment};
  }
`;

const CommentIcon = styled(BiComment)`
  margin-right: 3px;
  transform: scaleX(-1);
  color: ${(props) => props.theme.color.main_blue};
`;
const SubInfo = styled.div`
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
  color: ${(props) => props.theme.color.main_dark_blue};
`;
const CreatDate = styled.span``;

const List = ({ posts }) => {
  return (
    <ListContainter>
      {posts &&
        posts.map((post) => (
          <Lists key={post.id}>
            <MainInfo>
              <h2>{post.title}</h2>
              <ReactBox>
                <LikeBox>
                  <HeartIcon size={13} />
                  <span>{post.likeCount}</span>
                </LikeBox>
                <CommentBox>
                  <CommentIcon size={13} />
                  <span>{post.commentCount}</span>
                </CommentBox>
              </ReactBox>
            </MainInfo>
            <SubInfo>
              <Writer>{post.writer}</Writer>
              <CreatDate>{post.date}</CreatDate>
            </SubInfo>
          </Lists>
        ))}
    </ListContainter>
  );
};

export default List;
