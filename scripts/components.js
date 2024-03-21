export function member_entry(person) {
  let elt = document.createElement("md-list-item");
  let checkbox = document.createElement("md-checkbox");
  checkbox.setAttribute("touch-target", "wrapper")
  checkbox.slot = "start";
  checkbox.classList.add("elt_checkbox");
  checkbox.addEventListener("input", update_some);
  elt.appendChild(checkbox);
  let headline = document.createElement("label");
  headline.slot = "headline";
  headline.innerText = person.forename + " " + person.name;
  elt.appendChild(headline);
  let trailing_text = document.createElement("label");
  trailing_text.slot = "trailing-supporting-text";
  trailing_text.innerText = person.date;
  elt.appendChild(trailing_text);
  let selections = document.createElement("div");
  selections.slot = "end";
  selections.classList.add("selections");
  elt.appendChild(selections);
  return elt;
}

let loading_wrapper = document.getElementById("loading-wrapper");
let content_wrapper = document.getElementsByClassName("content-wrapper")[0];

export function display_content(children) {
  for (var child of content_wrapper.childNodes) {
    if (child == loading_wrapper) {
      content_wrapper.removeChild(loading_wrapper);
    }
  }
  for (var child of children) {
    content_wrapper.appendChild(child);
  }
}
export function display_loading() {
  let to_remove = [];
  for (var child of content_wrapper.childNodes) {
    console.log(child);
    if (child.classList != undefined) {
      if (!child.classList.contains("table-actions")) {
        to_remove.push(child);
      }
    }
  }
  to_remove.forEach(function(child) { content_wrapper.removeChild(child) });
  content_wrapper.appendChild(loading_wrapper);
}

