import Header from './Header'

const layoutStyle = {
    'fontFamily': 'Helvetica, Arial, sans-serif'
}

export default function Layout(props) {
    return (
<div style={layoutStyle}>
    <Header />
    {props.children}
</div>
    )
}