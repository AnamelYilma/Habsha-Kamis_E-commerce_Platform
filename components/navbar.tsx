import Link from "next/link";

export default function Navbar(){
    return(
        <nav className="mx-auto flex justify-around items-center" >
            <div>
                <Link href="/" ><h3>Habshia <span>Kamise</span></h3></Link>
            </div>
            <div >
                <ul className="list-none w-full flex gap-15  justify-evenly  items-center">
                    <Link href="/" className="">home</Link >
                    <Link href="/gallary" className="">Gallary</Link >
                    <Link href="/Contact" className="">Contact</Link>
                    <Link href="/about" className="">AboutUs</Link>
                </ul>
            </div>
            <div>
                <Link href="/gallary" > <button>Let See</button></Link>
            </div>
        </nav>
    )
}