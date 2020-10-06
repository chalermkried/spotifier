import styled from 'styled-components'
import PropTypes from 'prop-types'
import { useMemo } from 'react'

const Div = styled.div`
  background-color: var(--bg2);
  border: 1px solid var(--bd);
  padding: 12px 0;

  .block {
    padding: 0 12px;
    font-size: 14px;
    line-height: 2;
  }

  .artist {
    &::first-letter {
      text-transform: uppercase;
    }
  }

  .name {
    font-size: 24px;
  }

  .image {
    margin: 16px 0;
    width: 100%;

    img {
      width: 100%;
    }
  }
`

function getArtistNames(artists) {
  return artists.reduce(
    (names, artist) => (names += `${names ? ', ' : ''}${artist.name}`),
    '',
  )
}

function Card({ artists, image, type, date, name, tracks, spotifyUri }) {
  const parsedDate = useMemo(() => new Date(date).toDateString(), [date])

  return (
    <Div>
      <div className="block">
        <div className="artist">
          <b>{type}</b> by <b>{getArtistNames(artists)}</b>
        </div>
        <h4 className="name">{name}</h4>
      </div>
      <div className="image">
        <img alt={name} src={image.url} />
      </div>
      <div className="block">
        <div className="date">{parsedDate}</div>
        <div className="tracks">
          Total tracks: <b>{tracks}</b>
        </div>
      </div>
    </Div>
  )
}

Card.propTypes = {
  artists: PropTypes.arrayOf(PropTypes.shape({ name: PropTypes.string }))
    .isRequired,
  date: PropTypes.string.isRequired,
  image: PropTypes.shape({ url: PropTypes.string }).isRequired,
  name: PropTypes.string.isRequired,
  spotifyUri: PropTypes.string.isRequired,
  tracks: PropTypes.number.isRequired,
  type: PropTypes.oneOf(['album', 'single']).isRequired,
}

export default Card
