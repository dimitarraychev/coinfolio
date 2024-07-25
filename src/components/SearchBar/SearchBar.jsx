import React, { useState } from "react";
import "./SearchBar.css";
import Button from "../Button/Button";

const SearchBar = ({ onSearch, autofillSuggestions }) => {
	const [input, setInput] = useState("");

	const inputHandler = (e) => {
		setInput(e.target.value);
	};

	const submitHandler = (e) => {
		e.preventDefault();
		onSearch(input);
		setInput("");
	};

	return (
		<div className="search">
			<form onSubmit={submitHandler}>
				<input
					onChange={inputHandler}
					value={input}
					list="coinlist"
					type="text"
					placeholder="Search crypto..."
					required
				/>
				<datalist id="coinlist">
					{autofillSuggestions.map((item) => (
						<option key={item.id} value={item.name} />
					))}
				</datalist>
				<Button text={"search"} type={"submit"} />
			</form>
		</div>
	);
};

export default SearchBar;
