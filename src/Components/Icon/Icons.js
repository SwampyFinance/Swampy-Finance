import styled from "styled-components";
import Bscscan from "./bscscan.png";
import Discord from "./discord.png";
import Telegram from "./telegram.png";

const IconContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-around;
  padding: 0px 80px 0px 80px;
  margin-top: 15px;
`;

const IconComponent = styled.img`
  width: 50px;
  height: 50px;
  margin-bottom: 50px;
`;

const Icon = () => {
  return (
    <IconContainer>
      <a href="https://t.me/BakedBeansMiner" target="__blank">
        <IconComponent src={Bscscan} alt="bscscan" />
      </a>
      <a href="https://t.me/SwampyFinance" target="__blank">
        <IconComponent src={Telegram} alt="bscscan" />
      </a>
      <a href="https://discord.gg/WUfHq4Wu6n" target="__blank">
        <IconComponent src={Discord} alt="bscscan" />
      </a>
    </IconContainer>
  );
};

export default Icon;
