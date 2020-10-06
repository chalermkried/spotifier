import { CONTAINER_MAX_WIDTH } from 'lib/const'
import styled from 'styled-components'

export const Nav = styled.nav`
  background-color: var(--bg2);
  height: 54px;
  border-bottom: 1px solid var(--bd);

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
  }

  .right-block {
    position: absolute;
    right: 0;
    display: flex;
    align-items: center;
    font-size: 14px;
  }

  .log-out {
    margin-left: 8px;
  }
`
