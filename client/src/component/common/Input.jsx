import styled from 'styled-components';
import { COLOR } from '../../style/theme';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Label = styled.label`
  margin-bottom: 0.7rem;
  font-weight: 300;
`;

const InputComponent = styled.input`
  margin-bottom: 0.4rem;
  height: 4.5vh;
  border-radius: 10px;
  border: 1px solid ${COLOR.input_border};
  padding: 0 0.5rem;
`;

const AlertMessage = styled.span`
  color: red;
  font-size: 0.9rem;
  margin-bottom: 0.8rem;
`;

const Input = ({
  label,
  type,
  errorMessage,
  value,
  onChange,
  autocomplete,
  style,
  ...restProps
}) => {
  return (
    <Container style={style}>
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
