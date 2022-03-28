import styled from "styled-components";

export const ExperienceBarContainer = styled.div`
  flex: 1;
  position: relative;
  display: flex;
  align-items: center;
`;

export const ExperienceBarText = styled.span`
  font-size: 1rem;
`;

export const Bar = styled.div`
  flex: 1;
  height: 4px;
  border: 4px;
  background-color: var(--gray-line);
  margin: 0 1.5rem;
  position: relative;

  > div {
    height: 4px;
    border-radius: 4px;
    background-color: var(--green);
  }
`;

export const CurrentExperience = styled.span`
  position: absolute;
  top: 12px;
  transform: translateX(-50%);
`;
