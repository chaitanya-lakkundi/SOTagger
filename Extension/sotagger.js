const query_url="https://sleepy-taiga-14192.herokuapp.com/db/?Body=";
const tags = ["Discrepancy", "Error", "Implementation", "Learning", "Conceptual", "MWE"];

function get_progress_element(prob) {
	const prog = document.createElement("div");
	prog.setAttribute("class", "progress");

	const prog_inside = document.createElement("div");
	prog_inside.setAttribute("class", "determinate");
	prog_inside.setAttribute("style", "width: " + (prob*100).toString() + "%");

	prog.append(prog_inside);

	return prog;
}

function argsort(test) {
	let result = [];
	for(let i = 0; i != test.length; ++i) result[i] = i;
	result = result.sort(function(u,v) { return test[u] - test[v]; })
	return result;
}

function display(proba, order) {

	console.log(proba);
	console.log(order);

	const grid = document.getElementsByClassName("grid ps-relative d-block")[0];

	const newtab = document.createElement("table");

	let tag_row = document.createElement("tr");
	let progress_row = document.createElement("tr");
	let percent_row = document.createElement("tr");

	grid.append(document.createElement("br"));
	grid.append(document.createElement("br"));

	for (let i = proba.length - 1; i >= 0; i--) {

		let tag_data = document.createElement("td");
		let prog_data = document.createElement("td");
		let perc_data = document.createElement("td");
		
		let boldface = document.createElement("strong");
		let tag1 = document.createElement("a");		
		let perc_val = document.createElement("p");
		perc_val.setAttribute("style", "font-size: 14px;");

		tag1.setAttribute("class", "post-tag inactiveLink custom-tag" + i);
		tag1.setAttribute("href", "#!");

		let idx = order[i];

		tag1.innerText = tags[idx];

		boldface.append(tag1);
		tag_data.append(boldface);
		tag_row.append(tag_data);

		perc_val.innerText = Math.round(proba[idx]*100);
		perc_data.append(perc_val);

		let ele = get_progress_element(proba[idx]);
		prog_data.append(ele);
		progress_row.append(prog_data);
		percent_row.append(perc_data);

		if (i == 3) {
			break;			
			// remove break if all 6 topics are to be displayed

			newtab.append(tag_row);
			newtab.append(progress_row);
			newtab.append(percent_row);

			// defining new rows
			tag_row = document.createElement("tr");
			progress_row = document.createElement("tr");
			percent_row = document.createElement("tr");		
		}
	}

	newtab.append(tag_row);
	newtab.append(progress_row);
	newtab.append(percent_row);

	grid.append(newtab);
}

function process(proba) {
	const proba_vals = proba;
	const order = argsort(proba);
	display(proba_vals, order);
}

function main() {
	const post_title = document.getElementById("question-header").innerText;
	const post_text = document.getElementById("question").getElementsByClassName("post-text")[0].innerText;

	const grid = document.getElementsByClassName("grid ps-relative d-block")[0];
	const preloader = document.createElement("div");
	preloader.setAttribute("id", "mypreloader");

	preloader.innerHTML = "<br/><h1><strong>Fetching Tags ...</strong></h1><br/>";

	grid.append(preloader);

	$.get(query_url+encodeURIComponent(post_title+post_text).substr(0,4000) , function(data){
		let proba = eval(data);
		process(proba);
	})
	.then(() => {
		document.getElementById("mypreloader").innerHTML = "";
	});
}

$(document).ready(function() {
	main();
});
