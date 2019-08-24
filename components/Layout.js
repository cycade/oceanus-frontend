import NavigationBar from './layout/NavigationBar.js';
import Footer from './layout/Footer.js';

const layoutStyle = {
    'fontFamily': 'Helvetica, Arial, sans-serif'
}

export default function Layout(props) {
    return (
<div style={layoutStyle}>
    <NavigationBar />
    {props.children}
    <Footer />
</div>
    )
}