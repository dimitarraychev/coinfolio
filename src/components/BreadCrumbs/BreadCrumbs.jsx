import React from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";

import "./BreadCrumbs.css";
import arrowCrumb from "../../assets/icons/arrow-crumb.svg";
import homeIcon from "../../assets/icons/home-icon-white.svg";
import { routeCrumbs } from "./routeCrumbs";
import { convertKebabCase } from "../../utils/helpers";

const BreadCrumbs = () => {
	const location = useLocation();
	const pathnames = location.pathname.split("/").filter((x) => x);
	const [searchParams, setSearchParams] = useSearchParams();
	const categoryQuery = searchParams.get("category");
	const searchQuery = searchParams.get("search");

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
					let routeName = routeCrumbs.find(
						(route) => route.path === to
					)?.name;

					if (
						!routeName &&
						to.startsWith("/hub/") &&
						pathnames.length > 1
					) {
						routeName = routeCrumbs.find(
							(route) => route.path === "/hub/:id"
						)?.name;
					}

					if (
						!routeName &&
						to.startsWith("/explore/") &&
						pathnames.length > 1
					) {
						routeName = pathnames[pathnames.length - 1];
						routeName = convertKebabCase(routeName);
					}

					return (
						<li className="crumb" key={to}>
							{last &&
							(categoryQuery === null ||
								categoryQuery === "all") &&
							!searchQuery ? (
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
				{categoryQuery && categoryQuery !== "all" && (
					<li className="crumb">
						<span>{convertKebabCase(categoryQuery)}</span>
					</li>
				)}
				{searchQuery && (
					<li className="crumb">
						<span>Search</span>
					</li>
				)}
			</ol>
		</nav>
	);
};

export default BreadCrumbs;
