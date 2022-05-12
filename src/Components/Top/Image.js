import Logo from "./beansImage.png";
import styled from "styled-components";

const LogoContent = styled.img`
  object-fit: scale-down;
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 90%;
  height: 160px;
  margin-bottom: -40px;
`;

const Image = () => {
  return <LogoContent src={Logo} alt="Beans-Logo" />;
};

export default Image;
