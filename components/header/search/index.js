import useDebounce from 'components/shared/use-debounce'
import { MEDIA_QUERY } from 'lib/const'
import useStore from 'lib/store'
import { useRef, useState } from 'react'
import styled from 'styled-components'

const Div = styled.div`
  width: ${(props) => (props.isForceOpened ? '100%' : 'auto')};
  position: relative;
  z-index: 1;
  display: flex;
  margin-right: auto;

  @media ${MEDIA_QUERY.tabletAndUp} {
    width: auto;
    margin-right: 0;
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
  const setSearch = useStore((state) => state.setSearch)
  const [localSearch, setLocalSearch] = useState()
  const [isForceOpened, setIsForceOpened] = useState(false)
  const inputRef = useRef()

  const forceOpenSearchOn = () => {
    setIsForceOpened(true)

    requestAnimationFrame(() => {
      inputRef.current.focus()
    })
  }

  const forceOpenSearchOff = () => {
    inputRef.current.value = ''
    setIsForceOpened(false)
    setLocalSearch()
  }

  const _ = useDebounce(
    () => {
      setSearch(localSearch)
    },
    1000,
    [localSearch],
  )

  const onInputChange = (e) => {
    setLocalSearch(e.target.value)
  }

  return (
    <Div isForceOpened={isForceOpened}>
      <button className="icon search" type="button" onClick={forceOpenSearchOn}>
        <img alt="search" src="/icons/search.svg" />
      </button>
      <input
        className={`input${isForceOpened ? ' force-open' : ''}`}
        type="text"
        placeholder="Search for album..."
        onChange={onInputChange}
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
