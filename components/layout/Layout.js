// import Link from 'next/link';
import Head from "next/head"
import Header from "./Header";
import {Global,css} from "@emotion/core";
const Layout = (props) => {
    return (  
        <>
        <Global 
            styles={css`
                :root{
                    --gray:#3d3d3d;
                    --gray2:#6f6f6f;
                    --gray3:#e1e1e1;
                    --orange:#da552f;
                }

                html{
                    font-size:62.5%;
                    box-sizing: border-box;
                }
                *, *:before *:after{
                    box-sizing:inherit;
                }
                body{
                    font-size: 1.6rem;
                    line-height: 1.5;
                    font-family: 'PT sans', sans-serif;
                }
                h1,h2,h3{
                    margin: 0 0 2rem 0;
                    line-height:1.5;
                }

                h1,h2{
                    font-family: 'Roboto Slab', serif;
                    font-weight:700;
                }
                h3{
                    font-family:'PT Sans', sans-serif;
                }
                ul{
                    list-style:none;
                    margin:0;
                    padding:0;
                }
                a{
                    text-decoration:none;
                }
                
            `}
        />

        <Head>
            <title>Product Hunt Clone firebase and Next.js</title>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.css" integrity="sha512-oHDEc8Xed4hiW6CxD7qjbnI+B07vDdX7hEPTvn9pSZO1bcRqHp8mj9pyr+8RVC2GmtEfI2Bi9Ke9Ass0as+zpg==" crossorigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=PT+Sans:wght@400;700&family=Roboto+Slab:wght@400;700&display=swap" rel="stylesheet" />

        <link rel="stylesheet" href="/styles/app.css"/>
        </Head>
        <Header></Header>
        <main>
            {props.children}
        </main>
        </>
    );
}
 
export default Layout;