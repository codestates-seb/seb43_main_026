//모듈
import styled from 'styled-components';
import { useRef, useEffect, useState } from 'react';

//공통 스타일
import { COLOR } from '../../style/theme';

//아이콘
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

const DashBorad = styled.li`
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

const Dash = ({ posts, setCurrentPage, isDash }) => {
  const [data, setData] = useState([]);
  const observer = useRef(null);
  const sentinelRef = useRef(null);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5, // 타겟의 50%가 보이는 시점에서 감지
    };

    const handleObserver = (entries) => {
      const target = entries[0];
      if (target.isIntersecting && isDash) {
        // isDash가 true일 때만 처리
        setCurrentPage((prev) => prev + 1);
      }
    };

    observer.current = new IntersectionObserver(handleObserver, options);

    // 컴포넌트가 마운트될 때 신호 타겟을 관찰
    if (observer.current && sentinelRef.current) {
      observer.current.observe(sentinelRef.current);
    }

    // 컴포넌트가 언마운트될 때 옵저버를 정리
    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [isDash, setCurrentPage]);

  useEffect(() => {
    // posts 상태가 업데이트될 때마다 `data`를 초기화하고 새로운 데이터로 설정
    setData(posts);
  }, [posts]);

  return (
    <Container>
      {data.length
        ? data.map((post) => (
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
          ))
        : null}
      <EndDetect ref={sentinelRef} />
    </Container>
  );
};

export default Dash;
