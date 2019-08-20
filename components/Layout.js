import NavigationBar from './NavigationBar'

const layoutStyle = {
    'fontFamily': 'Helvetica, Arial, sans-serif'
}

export default function Layout(props) {
    return (
<div style={layoutStyle}>
    <NavigationBar />
    {props.children}
</div>
    )
}