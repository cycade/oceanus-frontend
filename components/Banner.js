const carouselItemStyle = img => {
  return {
    "height": "65vh",
    "min-height": "350px",
    "background": "no-repeat center center scroll",
    "-webkit-background-size": "cover",
    "-moz-background-size": "cover",
    "-o-background-size": "cover",
    "background-size": "cover",
    "background-image": img
  }
};

export default function Banner() {
  return (
    <header>
    <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
      <ol className="carousel-indicators">
        <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
        <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
      </ol>

      <div className="carousel-inner" role="listbox">
        <div className="carousel-item active" style={carouselItemStyle("url('https://source.unsplash.com/RCAhiGJsUUE/1920x1080')")}>
          <div className="carousel-caption">
            <p className="display-4 d-none d-sm-block">Help us to save leadbeater's possum!</p>
            <p className="h2 d-sm-none">Help us to save leadbeater's possum!</p>
            <p className="lead">Leadbeater's Possum is the only member of the genus Gymnobelideus and wild populations are confined to Victoria.</p>
          </div>
        </div>

        <div className="carousel-item" style={carouselItemStyle("url('https://source.unsplash.com/wfh8dDlNFOk/1920x1080')")}>
          <div className="carousel-caption d-none d-sm-block">
            <p className="display-4">The endangered Victoria’s faunal emblem</p>
            <p className="h2 d-sm-none">The endangered Victoria’s faunal emblem</p>
            <p className="lead">The species is found only in Victoria and lives primarily in the ash forests and sub-alpine woodlands of Victoria's central highlands to the east of Melbourne.</p>
          </div>
        </div>
      </div>
      <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="sr-only">Previous</span>
          </a>
      <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="sr-only">Next</span>
          </a>
    </div>
  </header>
  )
}