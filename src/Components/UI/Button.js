import styled from "styled-components";

const ButtonContainer = styled.button`
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  position: relative;
  box-sizing: border-box;
  -webkit-tap-highlight-color: transparent;
  outline: 0px;
  border: 0px;
  cursor: pointer;
  user-select: none;
  vertical-align: middle;
  appearance: none;
  text-decoration: none;
  font-family: Montserrat;
  line-height: 1.75;
  text-transform: uppercase;
  transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  background-color: rgb(96, 168, 48);
  border-radius: 8px;
  font-weight: 400;
  font-size: 1.2rem;
  padding: 10px;
  min-width: 138px;
  color: rgb(0, 0, 0);
  display: none;
  margin: -24px auto 48px;
  width: 95%;
`;

const Button = () => {
  return <ButtonContainer>Hey</ButtonContainer>;
};

export default Button;
