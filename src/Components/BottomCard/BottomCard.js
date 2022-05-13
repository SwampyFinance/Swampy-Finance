import styled from "styled-components";

const CardContent = styled.div`
  background: rgb(255, 255, 255);
  box-shadow: rgb(0 0 0 / 59%) 6px 6px 20px 6px;
  border-radius: 20px;
  padding: 12px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #ffffff;
  flex-direction: column;
  margin-bottom: 25px;
`;

const CardTitle = styled.h2`
  width: 100%;
  margin: 0px;
  font-size: 24px;
  font-weight: 500;
  line-height: 1.334;
  color: rgb(23, 33, 94);
  border-bottom: 5px solid;
  padding-bottom: 8px;
`;

const CardDescription = styled.div`
  display: flex;
  justify-content: space-between;
  align-content: center;
  flex-direction: row;
  width: 100%;
  margin-top: 10px;
`;

const CardDescText = styled.h2`
  margin-bottom: 5px;
  font-size: x-large;
`;

const CardDescText2 = styled.h2`
  display: flex;
  margin-bottom: 5px;
  font-size: x-large;
  justify-content: flex-end;
`;

const BottomCard = () => {
  return (
    <CardContent>
      <CardTitle>Hotel Information</CardTitle>
      <CardDescription>
        <div>
          <CardDescText>Daily Return</CardDescText>
          <CardDescText>APR</CardDescText>
          <CardDescText>Dev Fee</CardDescText>
        </div>
        <div>
          <CardDescText2>Up to 8%</CardDescText2>
          <CardDescText2>Up to 2,920%</CardDescText2>
          <CardDescText2>5%</CardDescText2>
        </div>
      </CardDescription>
    </CardContent>
  );
};

export default BottomCard;
