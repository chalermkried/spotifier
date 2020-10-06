import PropTypes from 'prop-types'
import styled from 'styled-components'

const Div = styled.div`
  display: inline-flex;
  align-items: center;

  .avatar {
    border-radius: 50%;
    width: 32px;
    height: 32px;
    overflow: hidden;
    flex-shrink: 0;
    margin-right: 8px;

    img {
      width: 100%;
    }
  }

  .name {
    max-width: 160px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`

function UserInfo({ image, name }) {
  return (
    <Div>
      <div className="avatar">
        <img src={image} />
      </div>
      <span className="name">{name || 'Loading...'}</span>
    </Div>
  )
}

UserInfo.propTypes = {
  image: PropTypes.string,
  name: PropTypes.string,
}

UserInfo.defaultProps = {
  image: undefined,
  name: undefined,
}

export default UserInfo
