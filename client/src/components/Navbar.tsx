import {Link} from "react-router-dom"

export default function Navbar() {
  return (
    <nav>
        <ul className="nav_links">
        <li><Link to="/">HOME</Link></li>
        </ul>
    </nav>
  )
}
