import MediaQuery from 'react-responsive';

const headerStyle = {
  "height": "65vh",
  "minHeight": "350px",
  "background": "no-repeat center center scroll",
  "WebkitBackgroundSize": "cover",
  "MozBackgroundSize": "cover",
  "OBackgroundSize": "cover",
  "backgroundSize": "cover",
  "backgroundImage": "url('/static/img/B001.jpg')"
}

const titleStyle = mt => {
  return {
    'textAlign': 'center',
    'color': 'white',
    'paddingTop': `${mt}vh`
  }
}

const descStyle = {
  'color': 'white',
  'textAlign': 'center'
}

export default function Banner() {
  return (
    <header style={headerStyle}>
      <div className='container px-3'>
        <MediaQuery query="(min-width: 769px)">
          <p className='display-4' style={titleStyle(45)}>Possum Minute</p>
        </MediaQuery>
        <MediaQuery query="(max-width: 769px)">
          <h1 style={titleStyle(36)}>Possum Minute</h1>
        </MediaQuery>
      <p style={descStyle}>Leadbeater's Possum is the only member of the genus Gymnobelideus and wild populations are confined to Victoria.</p>
      </div>
    </header>
  )
}