import useIntersection from 'components/shared/use-intersection'
import { apiGetNewRelease } from 'lib/api'
import { CONTAINER_MAX_WIDTH, MEDIA_QUERY } from 'lib/const'
import useStore from 'lib/store'
import { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import Card from './card'

const Section = styled.section`
  max-width: ${CONTAINER_MAX_WIDTH};
  margin: 32px auto;

  h3 {
    margin-bottom: 16px;
    margin-left: 12px;
    text-align: center;
  }

  .card-list {
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 12px;

    @media ${MEDIA_QUERY.tabletAndUp} {
      grid-template-columns: 1fr 1fr;
      grid-gap: 24px 16px;
    }
  }

  .fetch-trigger {
    height: 100vh;
    margin-top: -100vh;
  }

  .indicator {
    text-align: center;
    margin: 32px 0;
  }
`

function FeedBody() {
  const search = useStore((state) => state.search)
  const [items, setItems] = useState([])
  const [isFetching, setIsFetching] = useState(false)
  const triggerRef = useRef()
  const pageRef = useRef(1)
  const hasMore = useRef(true)
  const intersection = useIntersection(triggerRef, { threshold: 0.3 })

  async function fetchNewRelease() {
    if (isFetching || !hasMore.current) {
      return
    }

    setIsFetching(true)

    const res = await apiGetNewRelease({ page: pageRef.current })

    if (!res.albums.next) {
      hasMore.current = false
    }

    pageRef.current += 1
    setIsFetching(false)
    setItems([...items, ...res.albums.items])
  }

  useEffect(() => {
    fetchNewRelease()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (intersection?.isIntersecting) {
      fetchNewRelease()
    }
  }, [intersection?.isIntersecting])

  const bodyJsx = search ? (
    `searching!: ${search}`
  ) : (
    <>
      <h3>New Releases</h3>
      <div className="card-list">
        {items.map((item) => (
          <Card
            artists={item.artists}
            date={item.release_date}
            image={item.images[1]}
            key={item.id}
            name={item.name}
            spotifyUri={item.uri}
            tracks={item.total_tracks}
            type={item.album_type}
          />
        ))}
      </div>
      <div className="fetch-trigger" ref={triggerRef} />
      {isFetching && <div className="indicator">Fetching Data...</div>}
    </>
  )

  return <Section>{bodyJsx}</Section>
}

export default FeedBody
