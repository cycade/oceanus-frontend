export default function NewsCard(props) {
    return (
    <div className="card">
        <img className="card-img-top" src={`../../static/img/N${props.num}.png`} alt="Card image cap"></img>
        <div className="card-body">
            <div className='mb-3'>
            {
                props.tags.map((tag, i) => {
                    return <button key={i} type="button" className="btn btn-sm btn-outline-secondary m-1" onClick={() => props.selectTag(tag)}>{tag}</button>;
                })
            }
            </div>
            <h5 className="card-title">{props.title}</h5>
            {/* <p className="card-text">{props.time.substring(0, 10)}</p> */}
            <p className="card-text">{props.desc}</p>
            
            <a href={props.url} className="btn btn-primary">Read More...</a>
        </div>
    </div>
    )
}