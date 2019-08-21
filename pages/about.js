import Head from 'next/head';
import Layout from '../components/Layout';

function Home() {
    return (
<div>
    <Head>
        <title>Oceanus page</title>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" /> */}
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous"></link>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"></script>
    </Head>
    <Layout>
        <div className="d-flex justify-content-center mt-3 pt-5">
            <h3>Built by OceanWorld</h3>
        </div>
        <div className="d-flex justify-content-center pt-3">
            <a href='https://mahara.infotech.monash.edu.au/mahara/view/blocks.php?id=35669'>View Our Mahara Page</a>
        </div>
    </Layout>
</div>
    );
}

export default Home;