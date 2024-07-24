import React from "react";
import { Link, useLocation } from "react-router-dom";

import "./BreadCrumbs.css";
import arrowCrumb from "../../assets/icons/arrow-crumb.svg";
import homeIcon from "../../assets/icons/home-icon-white.svg";

const routes = [
	{ path: "/login", name: "Login" },
	{ path: "/register", name: "Register" },
	{ path: "/rankings", name: "Rankings" },
	{ path: "/explore", name: "Explore" },
	{ path: "/hub", name: "Hub" },
	{ path: "/hub/create", name: "Create" },
];

const BreadCrumbs = () => {
	const location = useLocation();
	const pathnames = location.pathname.split("/").filter((x) => x);

	return (
		<nav aria-label="breadcrumbs">
			<ol className="breadcrumbs">
				{location.pathname !== "/" && (
					<li>
						<div className="crumb-wrapper">
							<Link to="/">
								<img
									src={homeIcon}
									alt="home"
									className="home-img"
								/>
							</Link>
							<img src={arrowCrumb} alt="arrow" />
						</div>
					</li>
				)}

				{pathnames.map((value, index) => {
					const last = index === pathnames.length - 1;
					const to = `/${pathnames.slice(0, index + 1).join("/")}`;
					const routeName = routes.find(
						(route) => route.path === to
					)?.name;

					return (
						<li className="crumb" key={to}>
							{last ? (
								<span>{routeName}</span>
							) : (
								<div className="crumb-wrapper">
									<Link to={to}>{routeName}</Link>
									<img src={arrowCrumb} alt="arrow" />
								</div>
							)}
						</li>
					);
				})}
			</ol>
		</nav>
	);
};

export default BreadCrumbs;
