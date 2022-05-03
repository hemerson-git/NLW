import styled from "styled-components";

export const ProfileContainer = styled.div`
  margin-top: 25px;
  display: flex;
  align-items: center;

  > img {
    width: 5.5rem;
    height: 5.5rem;
    border-radius: 50%;
    object-fit: cover;
  }

  div {
    margin-left: 1.5rem;

    p {
      font-size: 1rem;
      margin-top: 0.5rem;

      img {
        margin-right: 0.5rem;
      }
    }

    strong {
      font-size: 1.5rem;
      font-weight: 600;
      color: ${({ theme }) => theme.colors.title};
    }
  }
`;
