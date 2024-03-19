function toggle_sidebar() {
  let sidebar = document.getElementById("sidebar");
  let scrim = document.getElementById("scrim");
  console.log(sidebar);
  let menu_button = document.getElementById("sidebar_button");
  if (menu_button.selected) {
    sidebar.classList.remove("opened");
    scrim.classList.remove("opened");
    menu_button.selected = false;
  } else {
    sidebar.classList.add("opened");
    scrim.classList.add("opened");
    sidebar.width = "var(--sidebar - width)";
    menu_button.selected = true;
  }
}

function load_people(members) {
  console.log(members);
  members.sort(function(personne1, personne2) {
    if (personne1.name < personne2.name) { return -1 }
    else { return 1 }
  })
  let selected_list = document.createElement("md-list");
  selected_list.classList.add("selected");
  let list = document.createElement("md-list");

  members.forEach(function(person) {
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
    if (person.selected) {
      selected_list.appendChild(elt);
    } else {
      list.appendChild(elt);
    }
  })
  let loading_wrapper = document.getElementById("loading-wrapper");
  let content_wrapper = document.getElementsByClassName("content-wrapper")[0];
  content_wrapper.removeChild(loading_wrapper);
  if (selected_list.childElementCount == 0) {
    list.lastChild.classList.add("last-item");
    content_wrapper.appendChild(list);
  } else {
    list.firstChild.classList.add("first-item");
    list.lastChild.classList.add("last-item");
    selected_list.firstChild.classList.add("first-item");
    selected_list.lastChild.classList.add("last-item");
    content_wrapper.appendChild(selected_list);
    content_wrapper.appendChild(list);
  }
}

let loaded = false;

document.addEventListener('DOMContentLoaded', function() {
  fetch('./output.json').then(async response => load_people(await response.json()));
  const anchorEl = document.body.querySelector('#sort-anchor');
  const menuEl = document.body.querySelector('#sort-menu');
  menuEl.anchorElement = anchorEl;

  anchorEl.addEventListener('click', () => { menuEl.open = !menuEl.open; });
}, false);

function update_all() {
  state = document.getElementById("general_checkbox").checked;
  checkboxs = document.getElementsByClassName("elt_checkbox");
  for (const elt of checkboxs) {
    elt.checked = state;
  }
}

function update_some() {
  checked = 0;
  unchecked = 0;
  checkboxs = document.getElementsByClassName("elt_checkbox");
  for (const elt of checkboxs) {
    if (elt.checked) { checked += 1 } else { unchecked += 1 }
  }
  general_checkbox = document.getElementById("general_checkbox");
  if (checked == 0) {
    general_checkbox.checked = false;
    general_checkbox.indeterminate = false;
  } else if (unchecked == 0) {
    general_checkbox.checked = true;
    general_checkbox.indeterminate = false;
  } else {
    general_checkbox.indeterminate = true;
  }
}

