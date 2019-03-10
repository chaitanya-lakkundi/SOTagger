const query_url="https://sleepy-taiga-14192.herokuapp.com/db/?Body=";
const tags = ["Error", "Discrepancy", "Implementation", "Learning", "Conceptual", "MWE"];

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
	var result = [];
	for(var i = 0; i != test.length; ++i) result[i] = i;
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

	grid.append(document.createElement("br"));
	grid.append(document.createElement("br"));

	for (let i = proba.length - 1; i >= 0; i--) {

		let tag_data = document.createElement("td");
		let prog_data = document.createElement("td");
		
		let boldface = document.createElement("strong");
		let tag1 = document.createElement("a");		
		
		tag1.setAttribute("class", "post-tag inactiveLink custom-tag" + i);
		tag1.setAttribute("href", "#!");

		let idx = order[i];

		tag1.innerText = tags[idx];

		boldface.append(tag1);
		tag_data.append(boldface);
		tag_row.append(tag_data);

		let ele = get_progress_element(proba[idx]);
		prog_data.append(ele);
		progress_row.append(prog_data);

		if (i == 3) {
			break;
			// remove break if all 6 topics are to be displayed
			newtab.append(tag_row);
			newtab.append(progress_row);
			// defining new rows
			tag_row = document.createElement("tr");
			progress_row = document.createElement("tr");
		}
	}

	newtab.append(tag_row);
	newtab.append(progress_row);

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

	$.get(query_url+encodeURIComponent(post_title+post_text).substr(0,4000) , function(data){
		let proba = eval(data);
		process(proba);
	});
}

// why shouldn't we consider only top two lines and bottom two lines in posts?

$(document).ready(function() {
	main();
});
