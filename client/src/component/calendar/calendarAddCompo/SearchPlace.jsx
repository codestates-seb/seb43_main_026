import styled from 'styled-components';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
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
  > p {
    margin-bottom: 30px;
    font-size: 18px;
    font-weight: 700;
    color: black;
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
const SearchBar = ({ place, handlePlace, handleSearch }) => {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <SearchBarContainer>
      <input
        type="text"
        defaultValue={place}
        onChange={handlePlace}
        onKeyDown={handleKeyDown}
      />
      <AiOutlineSearch
        size={26}
        className="search-icon"
        onClick={handleSearch}
      />
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

  // 키워드 검색
  const [info, setInfo] = useState();
  const [markers, setMarkers] = useState([]);
  const [map, setMap] = useState();
  const { kakao } = window;
  console.log(kakao.maps.services);
  const handleSearch = () => {
    if (!map) return;
    const ps = new kakao.maps.services.Places();
    ps.keywordSearch(place, (data, status) => {
      if (status === kakao.maps.services.Status.OK) {
        const bounds = new kakao.maps.LatLngBounds();
        let markers = [];

        for (let i = 0; i < data.length; i++) {
          markers.push({
            position: {
              lat: data[i].y,
              lng: data[i].x,
            },
            content: data[i].place_name,
          });
          bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
        }

        setMarkers(markers);
        console.log(markers);
        map.setBounds(bounds);
      }
    });
  };

  return (
    <MapContainer>
      <p>💡장소 찾아보기</p>
      <SearchBar
        place={place}
        handlePlace={handlePlace}
        handleSearch={handleSearch}
      />
      {/* 지도 로딩속도가 느려서 처음 렌더링 시 에러가 뜸 */}
      {location ? (
        <Map
          center={{ lat: location.latitude, lng: location.longitude }}
          style={{ width: '300px', height: '400px' }}
          level={4}
          onLoad={(map) => setMap(map)}
        >
          {markers.map((marker) => (
            <MapMarker
              key={`marker-${marker.content}-${marker.position.lat},${marker.position.lng}`}
              position={marker.position}
              onClick={() => setInfo(marker)}
            >
              {info && info.content === marker.content && (
                <div style={{ color: '#000' }}>{marker.content}</div>
              )}
            </MapMarker>
          ))}
        </Map>
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
      <SearchMap place={place} handlePlace={handlePlace} />{' '}
      <SearchButtons
        handleSearchModal={handleSearchModal}
        handlePlace={handlePlace}
        handleResetPlace={handleResetPlace}
      />
    </SearchPlaceContainer>
  );
};

export default SearchPlace;
