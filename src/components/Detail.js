// Filename - components/Detail.js

import React from "react";

function Detail({ selected, close}) {
	return (
		<div className="d-flex align-items-center justify-content-center">
			<div className="container mt-5">
				<div className="row">
					<div className="col-12 col-md-6 text-center">
						<img src={selected.Poster} alt=""/>
					</div>
					<div className=" items text col-12 col-md-6 text-white">
						<h2>{selected.Title}</h2>
						<p>{selected.Year}</p>
						<p>Rating : {selected.imdbRating}</p>
						<p>{selected.Plot}</p>
						<button onClick={close} className="btn btn-danger">Go Back</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Detail;
