import { Link, useLocation } from "react-router-dom";
import "./NavbarMobile.css";
import { navbarLinks } from "../../constants/links";

const NavbarMobile = () => {
	const { pathname } = useLocation();

	return (
		<div className="navbar-mobile">
			<ul className="navbar-mobile-links">
				{navbarLinks.map((link) => {
					const isHomeRoute = link.route === "/";
					const isActive = isHomeRoute
						? pathname === "/"
						: pathname.startsWith(link.route) && link.route !== "/";

					return (
						<Link to={link.route} key={link.label}>
							<li className={isActive ? "link-active" : ""}>
								<img
									src={isActive ? link.svgActive : link.svg}
									alt={link.label}
									className="link-img"
								/>
								{link.label}
							</li>
						</Link>
					);
				})}
			</ul>
		</div>
	);
};

export default NavbarMobile;
