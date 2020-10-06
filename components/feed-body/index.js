import { apiGetNewRelease } from 'lib/api'
import { CONTAINER_MAX_WIDTH, MEDIA_QUERY } from 'lib/const'
import useStore from 'lib/store'
import { useEffect, useState } from 'react'
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
`

function FeedBody() {
  const search = useStore((state) => state.search)
  const [items, setItems] = useState([])

  useEffect(() => {
    async function fetchNewRelease() {
      const res = await apiGetNewRelease({})

      setItems(res.albums.items)
    }

    fetchNewRelease()
  }, [])

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
    </>
  )

  return <Section>{bodyJsx}</Section>
}

export default FeedBody