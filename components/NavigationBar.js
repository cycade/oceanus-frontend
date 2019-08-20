export default function NavigationBar() {
    return (
<nav className='navbar navbar-expand-lg navbar-light bg-light'>
    <a className='navbar-brand' href='#'>Possum Minute</a>
    <button className='navbar-toggler' type='button' data-toggle='collapse' data-target='#navitem' aria-controls="navitem" aria-expanded="false" aria-label="Toggle navigation">
        <span className='navbar-toggler-icon'></span>
    </button>

    <div className='collapse navbar-collapse' id='navitem'>
        <ul className='navbar-nav mr-auto mt-2 mt-lg-0'>
            <li className='nav-item'>
                <a className='nav-link' href='#'>Occurrence Map</a>
            </li>
            <li className='nav-item'>
                <a className='nav-link' href='#'>News</a>
            </li>
            <li className='nav-item'>
                <a className='nav-link' href='#'>About</a>
            </li>
        </ul>
    </div>
</nav>
    )
}
