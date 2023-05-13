import styled from 'styled-components';
import { Map } from 'react-kakao-maps-sdk';
import { useState, useEffect } from 'react';

// 아이콘
import { AiOutlineSearch } from 'react-icons/ai';
import { COLOR } from '../../../style/theme';
// styled-component
// 검색창
const SearchBarContainer = styled.div`
  position: relative;
  width: 300px;
  margin-bottom: 20px;
  > input {
    width: 100%;
    height: 40px;
    border: 2px solid ${COLOR.main_blue};
    border-radius: 20px;
    padding: 10px 20px;
    font-size: 16px;
    :focus {
      outline: 2px solid ${COLOR.main_blue_active};
      border: none;
    }
  }
  > .search-icon {
    position: absolute;
    top: 8px;
    right: 16px;
    color: ${COLOR.main_blue};
    cursor: pointer;
  }
`;

// 지도 컨테이너
const MapContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

// 저장&닫기 버튼
const SearchButtonContainer = styled.header``;

const SearchPlaceContainer = styled.div`
  width: 100%;
  height: 100%;
  z-index: 100;
  position: absolute;
  bottom: 20px;
  left: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(5px);
`;

// component
// 검색창
const SearchBar = ({ place, handlePlace }) => {
  return (
    <SearchBarContainer>
      <input type="text" defaultValue={place} onChange={handlePlace} />
      <AiOutlineSearch size={26} className="search-icon" />
    </SearchBarContainer>
  );
};
// 지도
const SearchMap = ({ place, handlePlace }) => {
  // 지도에 현재 위치 표시
  const [location, setLocation] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(successHandler, errorHandler);
  }, []);
  const successHandler = (response) => {
    // console.log(response);
    const { latitude, longitude } = response.coords;
    setLocation({ latitude, longitude });
  };

  const errorHandler = (error) => {
    console.log(error);
  };
  return (
    <MapContainer>
      <SearchBar place={place} handlePlace={handlePlace} />
      {/* 지도 로딩속도가 느려서 처음 렌더링 시 에러가 뜸 */}
      {location ? (
        <Map
          center={{ lat: location.latitude, lng: location.longitude }}
          style={{ width: '300px', height: '400px' }}
          level={4}
        />
      ) : null}
    </MapContainer>
  );
};

// 저장&닫기 버튼
const SearchButtons = ({ handleSearchModal, handleResetPlace }) => {
  return (
    <SearchButtonContainer>
      <button
        onClick={() => {
          handleResetPlace();
          handleSearchModal();
        }}
      >
        닫기
      </button>
      <button onClick={handleSearchModal}>저장</button>
    </SearchButtonContainer>
  );
};
const SearchPlace = ({
  handleSearchModal,
  place,
  handlePlace,
  handleResetPlace,
}) => {
  return (
    <SearchPlaceContainer>
      <SearchButtons
        handleSearchModal={handleSearchModal}
        handlePlace={handlePlace}
        handleResetPlace={handleResetPlace}
      />
      <SearchMap place={place} handlePlace={handlePlace} />
    </SearchPlaceContainer>
  );
};

export default SearchPlace;
