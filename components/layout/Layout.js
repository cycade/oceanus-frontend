import NavigationBar from './NavigationBar.js';
import Footer from './Footer.js';

const layoutStyle = {
    'fontFamily': 'Helvetica, Arial, sans-serif'
}

export default function Layout(props) {
    return (
<div style={layoutStyle}>
    <NavigationBar onLogout={props.onLogout.bind(this)}/>
    {props.children}
    <Footer />
</div>
    )
}