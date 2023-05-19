import styled from 'styled-components';
import { COLOR } from '../../style/theme';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Label = styled.label`
  margin-top: 2rem;
  margin-bottom: 0.7rem;
  font-weight: 300;
`;

const InputComponent = styled.input`
  margin-bottom: 0.5rem;
  height: 4.5vh;
  border-radius: 10px;
  border: 1px solid ${COLOR.input_border};
  padding: 0 0.5rem;
`;

const AlertMessage = styled.span`
  color: red;
`;

const Input = ({
  label,
  type,
  errorMessage,
  value,
  onChange,
  autocomplete,
  ...restProps
}) => {
  return (
    <Container>
      {label ? <Label>{label}</Label> : null}
      <InputComponent
        {...restProps}
        type={type}
        value={value}
        onChange={onChange}
        autocomplete={autocomplete}
      />
      {errorMessage ? <AlertMessage>{errorMessage}</AlertMessage> : null}
    </Container>
  );
};

export default Input;
