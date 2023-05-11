import styled from 'styled-components';

const Input = ({ label }) => {
  return (
    <Container>
      <label htmlFor={label}>{label}</label>
    </Container>
  );
};

export default Input;

const Container = styled.div``;
