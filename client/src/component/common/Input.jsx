import styled from 'styled-components';
import { COLOR } from '../../style/theme';

const Container = styled.div`
  display: flex;
  flex-direction: column;
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

const Input = ({ id, label, type, options, errors, register }) => {
  return (
    <Container>
      <Label htmlFor={id}>{label}</Label>
      <InputComponent id={id} type={type} {...register(id, options)} />
      {errors !== undefined && <AlertMessage>{errors.message}</AlertMessage>}
    </Container>
  );
};

export default Input;
