import styled from 'styled-components';

// styled-component
// 지도 컨테이너
const MapContainer = styled.div`
  width: 500px;
`;
const SearchPlaceContainer = styled.div``;

// component
// 지도
const Map = () => {
  return (
    <MapContainer>
      <div id="map" style={{ width: '500px', height: '400px' }}></div>{' '}
    </MapContainer>
  );
};

const SearchPlace = () => {
  return (
    <SearchPlaceContainer>
      <Map />
    </SearchPlaceContainer>
  );
};

export default SearchPlace;
