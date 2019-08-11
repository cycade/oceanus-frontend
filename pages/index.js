import Head from 'next/head'

function Home() {
    return (
        <div>
            <Head>
                <title>Oceanus page</title>
                <link rel="stylesheet" href="https://unpkg.com/purecss@1.0.1/build/pure-min.css" integrity="sha384-oAOxQR6DkCoMliIh8yFnu25d7Eq/PHS21PClpwjOTeU2jRSq11vu66rf90/cZr47" crossOrigin="anonymous"></link>
            </Head>
        <div>Blue Planet</div>
        <a className="pure-button" href="#">A Pure Button</a>
        </div>
    );
}

export default Home;