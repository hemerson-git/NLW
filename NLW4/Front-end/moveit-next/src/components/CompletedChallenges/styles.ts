import styled from "styled-components";

export const CompletedChallengesContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  margin: 1.5rem 0;
  padding: 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.line};

  font-weight: 500;
`;
