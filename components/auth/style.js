import { MEDIA_QUERY } from 'lib/const'
import styled from 'styled-components'

const Wrapper = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;

  .auth {
    background-color: var(--bg2);
    border: 1px solid var(--bd);
    padding: 40px 32px;
    width: 100%;
    min-height: 100%;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .title {
      margin: 0 0 40px;
    }

    @media ${MEDIA_QUERY.tabletAndUp} {
      width: 400px;
      min-height: auto;
    }
  }
`

export { Wrapper }