import styled from 'styled-components';
import { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { COLOR } from '../../style/theme';
import { FaHeart } from 'react-icons/fa';
import { BiComment } from 'react-icons/bi';

const Container = styled.ul`
  padding-top: 3px;
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  min-height: 700px;
  justify-content: center;
`;

const Item = styled.li`
  margin-top: 13px;
  padding: 0 1.5%;
  display: flex;
  flex-direction: column;
`;
const Image = styled.div`
  width: 180px;
  height: 288px;
  overflow: hidden;
  border-radius: 5px;
  background-color: ${COLOR.bg};
  @media screen and (max-width: 385px) {
    width: 320px;
    height: 200px;
  }
  img {
    width: 180px;
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
    color: ${COLOR.font_comment};
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
  color: ${COLOR.main_dark_blue};
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
  color: ${COLOR.main_dark_blue};
`;

const EndDetect = styled.div`
  width: 100%;
  height: 20px;
`;

const NoData = styled.span`
  width: 100%;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
`;

const Dash = ({ posts, setCurrentPage, orderBy, currentPage, isDash }) => {
  const [data, setData] = useState([]);
  const sentinelRef = useRef(null);

  const options = {
    root: null,
    rootMargin: '0px',
    threshold: 1,
  };

  const observer = useRef(
    new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        const existingIds = data.map((item) => item.boardId);
        const newPosts = posts.filter(
          (post) => !existingIds.includes(post.boardId)
        );

        if (newPosts.length > 0) {
          setCurrentPage((prev) => prev + 1);
        }
      }
    }, options)
  );

  useEffect(() => {
    if (observer.current && sentinelRef.current) {
      observer.current.observe(sentinelRef.current);
    }

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [setCurrentPage]);

  useEffect(() => {
    const existingIds = data.map((item) => item.boardId);
    const newPosts = posts.filter(
      (post) => !existingIds.includes(post.boardId)
    );
    if (orderBy === 'latest') {
      setData((prevData) => [...newPosts, ...prevData]);
    } else {
      setData((prevData) => [...prevData, ...newPosts]);
    }
  }, [posts, orderBy, currentPage]);

  useEffect(() => {
    setData([]);
    setCurrentPage(1);
  }, [orderBy]);

  useEffect(() => {
    setData((prevData) => [...prevData, ...posts]);
  }, [isDash]);

  return (
    <>
      <Container>
        {data.length ? (
          data.map((post) => (
            <Item key={post.boardId}>
              <Link to={`/board/${post.boardId}`}>
                <Image>
                  <img src={post.boardImageAddress} alt="캘린더 이미지" />
                </Image>
                <Info>
                  <Title>{post.title}</Title>
                  <Reaction>
                    <Like>
                      <HeartIcon size={15} />
                      <span>{post.boardLikeCount}</span>
                    </Like>
                    <Comment>
                      <CommentIcon size={15} />
                      <span>{post.commentCount}</span>
                    </Comment>
                  </Reaction>
                </Info>
              </Link>
            </Item>
          ))
        ) : (
          <NoData>
            {posts.length > 0 ? '데이터가 없습니다' : '로딩 중...'}
          </NoData>
        )}
        <EndDetect ref={sentinelRef} />
      </Container>
    </>
  );
};

export default Dash;
