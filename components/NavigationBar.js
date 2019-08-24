export default function NavigationBar() {
    return (
<nav className='navbar navbar-expand-lg navbar-light bg-light py-2 d-flex'>
    <a className='navbar-brand ml-5' href='/'>Possum Minute</a>
    <button className='navbar-toggler mr-5' data-toggle='collapse' data-target='#navitem' aria-controls="navitem" aria-expanded="false" aria-label="Toggle navigation">
        <i className="fa fa-angle-double-down" aria-hidden="true"></i>
    </button>

    <div className='collapse navbar-collapse justify-content-end' id='navitem'>
        <ul className='navbar-nav mr-auto mt-2 mt-lg-0'>
            <li className='nav-item'>
                <a className='nav-link' href='/record'>Occurrence Record Map</a>
            </li>
            <li className='nav-item'>
                <a className='nav-link' href='/news'>News</a>
            </li>
            <li className='nav-item'>
                <a className='nav-link' href='/about'>About</a>
            </li>
        </ul>
    </div>
</nav>
    )
}
