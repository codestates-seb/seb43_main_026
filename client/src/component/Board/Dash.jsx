//모듈
import styled from 'styled-components';

//아이콘
import { FaHeart } from 'react-icons/fa';
import { BiComment } from 'react-icons/bi';

const Container = styled.ul`
  padding-top: 3px;
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  justify-content: center;
`;

const DashBorad = styled.li`
  margin-top: 13px;
  padding: 0 1.5%;
  display: flex;
  flex-direction: column;
`;
const Image = styled.div`
  width: 177px;
  height: 288px;
  overflow: hidden;
  border-radius: 5px;
  @media screen and (max-width: 385px) {
    width: 320px;
    height: 200px;
  }
  img {
    width: 177px;
    height: 288px;
    object-fit: cover;
    @media screen and (max-width: 385px) {
      width: 320px;
      height: 200px;
    }
  }
`;
const Info = styled.div`
  margin: 5px 0px;
  width: 177px;
  display: flex;
  justify-content: space-between;
  @media screen and (max-width: 385px) {
    width: 320px;
  }
`;

const Title = styled.h2`
  font-size: 13px;
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
  span {
    font-size: 13px;
    color: ${(props) => props.theme.color.font_comment};
  }
  div {
    margin-right: 4px;
  }
`;

const Like = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  span {
    line-height: 20px;
  }
`;

const HeartIcon = styled(FaHeart)`
  margin-right: 2px;
  color: ${(props) => props.theme.color.main_dark_blue};
`;

const Comment = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  span {
    line-height: 20px;
  }
`;

const CommentIcon = styled(BiComment)`
  margin-right: 2px;
  transform: scaleX(-1);
  color: ${(props) => props.theme.color.main_dark_blue};
`;

const Dash = ({ posts }) => {
  return (
    <Container>
      {posts &&
        posts.map((post) => (
          <DashBorad key={post.id}>
            <Image>
              <img src={post.image} alt="캘린더 이미지" />
            </Image>
            <Info>
              <Title>{post.title}</Title>
              <Reaction>
                <Like>
                  <HeartIcon size={15} />
                  <span>{post.likeCount}</span>
                </Like>
                <Comment>
                  <CommentIcon size={15} />
                  <span>{post.commentCount}</span>
                </Comment>
              </Reaction>
            </Info>
          </DashBorad>
        ))}
    </Container>
  );
};

export default Dash;
