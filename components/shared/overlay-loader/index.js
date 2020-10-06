import styled from 'styled-components'

const OverlayDiv = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`

function OverlayLoader() {
  return <OverlayDiv>Loading...</OverlayDiv>
}

export default OverlayLoader
