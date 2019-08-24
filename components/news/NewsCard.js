export default function NewsCard(props) {
    return (
    <div className="card">
        {/* <img src="/static/img/P0001.jpg" className="card-img-top" alt="..." /> */}
        <div className="card-body">
        <div className='mb-3'>
            {
                props.tags.map(tag => {
                    return <button type="button" class="btn btn-sm btn-outline-secondary mx-1" onClick={() => props.selectTag(tag)}>{tag}</button>;
                })
            }
            </div>
            <h5 className="card-title">{props.title}</h5>
            <p className="card-text">{props.desc}</p>
            
            <a href={props.url} className="btn btn-primary">Read More...</a>
        </div>
    </div>
    )
}