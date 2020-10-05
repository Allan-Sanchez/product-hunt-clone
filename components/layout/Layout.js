import Link from 'next/link';
const Layout = (props) => {
    return (  
        <>
        <h1>Header</h1>

        <nav>
        <Link href="/">home</Link>
        <Link href="/about-us">about us</Link>
        </nav>
        <main>
            {props.children}
        </main>
        </>
    );
}
 
export default Layout;