import { CONTAINER_MAX_WIDTH, MEDIA_QUERY } from 'lib/const'
import styled from 'styled-components'

export const Nav = styled.nav`
  background-color: var(--bg2);
  height: 44px;
  border-bottom: 1px solid var(--bd);
  position: sticky;
  top: 0;

  @media ${MEDIA_QUERY.tabletAndUp} {
    height: 54px;
  }

  .container {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    max-width: ${CONTAINER_MAX_WIDTH};
    margin: 0 auto;
    padding: 0 16px;
  }

  .left-block {
    position: absolute;
    left: 0;
    right: 0;
    text-align: center;

    @media ${MEDIA_QUERY.tabletAndUp} {
      right: auto;
    }
  }

  .right-block {
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: space-between;
    right: 0;
    left: 0;
    bottom: 0;
    font-size: 14px;
    height: 44px;
    padding: 0 8px;
    background-color: var(--bg2);

    @media ${MEDIA_QUERY.tabletAndUp} {
      position: absolute;
      left: auto;
      height: auto;
      bottom: auto;
      padding: 0;
    }
  }

  .log-out {
    margin-left: 8px;
  }
`
