export default function NewsCard(props) {
    return (
    <div className="card" style={{"width": "18rem"}}>
        <img src="/static/img/P0001.jpg" className="card-img-top" alt="..." />
        <div className="card-body">
            <h5 className="card-title">{props.title}</h5>
            <p className="card-text">{props.desc}</p>
            <a href={props.url} className="btn btn-primary">Read More...</a>
        </div>
    </div>
    )
}