import styled from 'styled-components';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import { useState, useEffect, useCallback } from 'react';
import { COLOR, SIZE } from '../../style/theme';

// 아이콘
import { AiOutlineSearch } from 'react-icons/ai';
import Loading from '../common/Loading';

const { kakao } = window;

// styled-component
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

const SearchButtonContainer = styled.header`
  width: 280px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 30px;
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

const SearchPlaceModal = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media screen and (min-width: ${SIZE.tablet}) {
    padding: 40px 70px 20px;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0px 3px 5px 3px ${COLOR.bg_place};
  }
`;

const SearchPlaceContainer = styled.div`
  width: 100%;
  height: 100%;
  z-index: 100;
  margin-top: 20px;
  position: absolute;
  top: 0px;
  left: 0px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(5px);
`;

// component
const SearchBar = ({ place, handlePlace, handleSearch, handleClickSearch }) => {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearch();
    }
  };

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

const SearchMap = ({ place, setPlace }) => {
  // 지도에 현재 위치 표시
  const [location, setLocation] = useState(null);
  // 클릭된 장소의 위치
  const [currentLocation, setCurrentLocation] = useState(null);
  const [mapCenter, setMapCenter] = useState({
    lat: location?.latitude || 0,
    lng: location?.longitude || 0,
  });

  console.log(mapCenter);
  // 키워드 검색
  const [info, setInfo] = useState();
  const [markers, setMarkers] = useState([]);
  const [map, setMap] = useState();

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

  const handleSearch = useCallback(() => {
    const ps = new kakao.maps.services.Places();

    const callback = function (result, status) {
      if (status === kakao.maps.services.Status.OK) {
        // result.map((data) => {
        //   console.log(data);
        // });
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

  useEffect(() => {
    if (map && markers.length > 0) {
      const firstMarker = markers[0];
      setMapCenter({ lat: Number(firstMarker.y), lng: Number(firstMarker.x) });
    }
  }, [map, markers]);

  const handleClickSearch = (e) => {
    e.preventDefault();
    // 처음 클릭 이벤트 발생 시 map이 undefined가 뜨기 때문에 검색이 되지 않음->일단 주석 처리
    // if (!map) {
    //   console.log('실패');
    //   return;
    // }
    handleSearch();
  };

  const handlePlace = (e) => {
    setPlace(e.target.value);
  };

  return (
    <MapContainer>
      <p>💡 지역 + 수영장으로 입력해 주세요</p>
      <SearchBar
        place={place}
        handlePlace={handlePlace}
        handleSearch={handleSearch}
        handleClickSearch={handleClickSearch}
      />
      {location ? (
        <Map
          center={{ lat: location.latitude, lng: location.longitude }}
          style={{ width: '300px', height: '400px' }}
          level={7}
          onLoad={(map) => setMap(map)}
        >
          {currentLocation ? (
            <MapMarker
              position={{
                lat: currentLocation.latitude,
                lng: currentLocation.longitude,
              }}
            />
          ) : (
            <MapMarker
              position={{
                lat: location.latitude,
                lng: location.longitude,
              }}
            />
          )}
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
                      onClick={(e) => {
                        e.preventDefault();
                        setPlace(marker.place_name);
                        setCurrentLocation({
                          lat: Number(marker.y),
                          lng: Number(marker.x),
                        });
                      }}
                      value={marker.place_name}
                    >
                      {marker.place_name}
                    </button>
                  )}
                </MapMarker>
              ))
            : null}
        </Map>
      ) : (
        <Loading />
      )}
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
      <SearchPlaceModal>
        <SearchMap place={place} setPlace={setPlace} />
        <SearchButtons
          handleSearchModal={handleSearchModal}
          setPlace={setPlace}
        />
      </SearchPlaceModal>
    </SearchPlaceContainer>
  );
};

export default SearchPlace;
