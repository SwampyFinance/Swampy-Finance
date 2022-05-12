import styled from "styled-components";

const Title = styled.h2`
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  font-weight: 500;
  font-size: 1.25rem;
  line-height: 1.6;
  color: rgb(23, 33, 94);
  text-align: center;
  margin-bottom: 30px;
`;

const Text = () => {
  return (
    <div>
      <Title>
        The BNB Reward Pool with the tastiest daily return and lowest dev fee
      </Title>
    </div>
  );
};

export default Text;
