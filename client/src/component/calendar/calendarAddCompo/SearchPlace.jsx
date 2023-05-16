import styled from 'styled-components';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import { useState, useEffect, useCallback } from 'react';
import { COLOR } from '../../../style/theme';

// 아이콘
import { AiOutlineSearch } from 'react-icons/ai';

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
  > p {
    margin-bottom: 30px;
    font-size: 18px;
    font-weight: 700;
    color: black;
    border-bottom: 2px dashed ${COLOR.main_dark_blue};
    padding-bottom: 5px;
  }
  button {
    border: none;
    background-color: inherit;
    text-align: center;
  }
`;

// 저장&닫기 버튼
const SearchButtonContainer = styled.header`
  width: 280px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 50px;
  > button {
    width: 100px;
    height: 40px;
    border-radius: 20px;
    text-align: center;
    font-size: 16px;
    font-weight: 600;
    border: none;
    background-color: ${COLOR.main_blue};
    color: #ffff;
    :hover {
      background-color: ${COLOR.main_blue_hover};
    }
    cursor: pointer;
    :first-of-type {
      border: 2px solid ${COLOR.main_blue};
      background-color: #ffff;
      color: ${COLOR.main_blue_hover};
      :hover {
        background-color: ${COLOR.bg_blue};
        color: ${COLOR.main_dark_blue};
      }
    }
  }
`;

const SearchPlaceContainer = styled.div`
  width: 100%;
  height: 100%;
  z-index: 100;
  position: absolute;
  top: 10px;
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
const SearchBar = ({ place, handlePlace, handleSearch, handleClickSearch }) => {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };
  useEffect(() => {
    console.log(place);
  }, [place]);
  return (
    <SearchBarContainer>
      <input
        type="text"
        value={place}
        onChange={handlePlace}
        onKeyDown={handleKeyDown}
        placeholder="예시) 수원 수영장"
      />
      <AiOutlineSearch
        size={26}
        className="search-icon"
        onClick={handleClickSearch}
      />
    </SearchBarContainer>
  );
};

// 지도
const SearchMap = ({ place, setPlace }) => {
  // 지도에 현재 위치 표시
  const [location, setLocation] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(successHandler, errorHandler);
  }, []);

  const successHandler = (response) => {
    const { latitude, longitude } = response.coords;
    setLocation({ latitude, longitude });
  };

  const errorHandler = (error) => {
    console.log(error);
  };

  // 키워드 검색
  const [info, setInfo] = useState();
  const [markers, setMarkers] = useState([]);
  const [map, setMap] = useState();
  const { kakao } = window;

  const handleSearch = useCallback(() => {
    const ps = new kakao.maps.services.Places();

    const callback = function (result, status) {
      if (status === kakao.maps.services.Status.OK) {
        result.map((data) => {
          console.log(data);
        });
        setMarkers(result);
      }
    };
    ps.keywordSearch(place, callback);
  }, [map, place, kakao.maps.services.Places, kakao.maps.services.Status.OK]);

  useEffect(() => {
    if (map) {
      console.log(map);
      handleSearch();
    }
  }, [map, handleSearch]);
  const handleClickSearch = () => {
    if (!map) {
      console.log('실패');
      return;
    }
    handleSearch();
    console.log('클릭!');
  };

  const handlePlace = (e) => {
    setPlace(e.target.value);
  };
  console.log(place);
  return (
    <MapContainer>
      <p>💡 지역 + 수영장으로 더 쉽게 검색할 수 있어요</p>
      {location ? (
        <>
          <SearchBar
            place={place}
            handlePlace={handlePlace}
            handleSearch={handleSearch}
            handleClickSearch={handleClickSearch}
          />
          {/* 지도 로딩속도가 느려서 처음 렌더링 시 에러가 뜸 */}
          <Map
            center={{ lat: location.latitude, lng: location.longitude }}
            style={{ width: '300px', height: '400px' }}
            level={5}
            onLoad={(map) => setMap(map)}
          >
            {markers
              ? markers.map((marker) => (
                  <MapMarker
                    key={`marker-${marker.place_name}-${marker.x},${marker.y}`}
                    position={{ lat: Number(marker.y), lng: Number(marker.x) }}
                    onClick={() => setInfo(marker)}
                  >
                    {info && info.content === marker.content && (
                      <button
                        style={{ color: '#000' }}
                        onClick={() => setPlace(marker.place_name)}
                        value={marker.place_name}
                      >
                        {marker.place_name}
                      </button>
                    )}
                  </MapMarker>
                ))
              : null}
          </Map>
        </>
      ) : null}
    </MapContainer>
  );
};

// 저장&닫기 버튼
const SearchButtons = ({ handleSearchModal, setPlace }) => {
  const handleResetPlace = () => {
    setPlace('');
    handleSearchModal();
  };
  return (
    <SearchButtonContainer>
      <button onClick={handleResetPlace}>취소</button>
      <button onClick={handleSearchModal}>저장</button>
    </SearchButtonContainer>
  );
};

const SearchPlace = ({ handleSearchModal, place, setPlace }) => {
  return (
    <SearchPlaceContainer>
      <SearchMap place={place} setPlace={setPlace} />
      <SearchButtons
        handleSearchModal={handleSearchModal}
        setPlace={setPlace}
      />
    </SearchPlaceContainer>
  );
};

export default SearchPlace;
