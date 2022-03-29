import styled from "styled-components";

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 30px;
`;

export const ButtonToggleTheme = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  transform: rotate(195deg);
  width: 40px;
  height: 40px;

  img {
    max-width: 100%;
  }
`;
