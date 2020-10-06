import { MEDIA_QUERY } from 'lib/const'
import { useRef, useState } from 'react'
import styled from 'styled-components'

const Div = styled.div`
  width: 100%;
  position: relative;
  z-index: 1;
  display: flex;

  @media ${MEDIA_QUERY.tabletAndUp} {
    width: auto;
  }

  .input {
    display: none;

    &.force-open {
      display: inline-block;
      flex-grow: 1;
    }

    @media ${MEDIA_QUERY.tabletAndUp} {
      display: inline-block;
    }
  }

  .icon {
    display: inline-flex;
    border: 0;
    background-color: transparent;
    width: 32px;
    flex-shrink: 0;

    &.search {
      margin-right: 12px;
    }

    img {
      width: 100%;
    }

    @media ${MEDIA_QUERY.tabletAndUp} {
      display: none;
    }
  }
`

function Search() {
  const [isForceOpened, setIsForceOpened] = useState(false)
  const inputRef = useRef()

  const forceOpenSearchOn = () => {
    setIsForceOpened(true)

    requestAnimationFrame(() => {
      inputRef.current.focus()
    })
  }

  const forceOpenSearchOff = () => {
    setIsForceOpened(false)
  }

  return (
    <Div>
      <button className="icon search" type="button" onClick={forceOpenSearchOn}>
        <img alt="search" src="/icons/search.svg" />
      </button>
      <input
        className={`input${isForceOpened ? ' force-open' : ''}`}
        type="text"
        placeholder="Search"
        ref={inputRef}
      />
      {isForceOpened && (
        <button
          className="icon close"
          type="button"
          onClick={forceOpenSearchOff}
        >
          <img alt="search" src="/icons/x-circle.svg" />
        </button>
      )}
    </Div>
  )
}

export default Search
