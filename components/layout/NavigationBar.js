const togglerStyle = {
    ':focus': {
      'outline': 'none',
      'box-shadow': 'none'
    },
    ':active': {
      'outline': 'none',
      'box-shadow': 'none'
    },
    'border': '0px'
}
  
export default function NavigationBar() {
    return (
<nav className='navbar navbar-expand-lg navbar-light bg-light py-2 fixed-top'>
    <a className='navbar-brand ml-3' href='/'>Possum Minute</a>
    <button className='navbar-toggler mr-3' data-toggle='collapse' data-target='#navitem' aria-controls="navitem" aria-expanded="false" aria-label="Toggle navigation" style={togglerStyle}>
        <i className="fa fa-angle-double-down" aria-hidden="true"></i>
    </button>

    <div className='collapse navbar-collapse justify-content-end' id='navitem'>
        <ul className='navbar-nav mr-auto mt-2 mt-lg-0'>
            <li className='nav-item' data-target='#navitem' data-toggle='collapse'>
                <a className='nav-link'  href='#bgstory'>Background Story</a>
            </li>
            <li className='nav-item' data-target='#navitem' data-toggle='collapse'>
                <a className='nav-link'  href='#chart'>Chart</a>
            </li>
            <li className='nav-item' data-target='#navitem' data-toggle='collapse'>
                <a className='nav-link'  href='#map'>Occurrence Record Map</a>
            </li>
            <li className='nav-item' data-target='#navitem' data-toggle='collapse'>
                <a className='nav-link'  href='#news'>News</a>
            </li>
        </ul>
    </div>
</nav>

    );
}