import { member_entry, display_content, display_loading } from "./components.js";

function toggle_sidebar() {
  let sidebar = document.getElementById("sidebar");
  let scrim = document.getElementById("scrim");
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
  members.sort(function(personne1, personne2) {
    if (personne1.name < personne2.name) { return -1 }
    else { return 1 }
  })
  let selected_list = document.createElement("md-list");
  selected_list.classList.add("selected");
  let list = document.createElement("md-list");

  members.forEach(function(person) {
    let elt = member_entry(person);
    if (person.selected) {
      selected_list.appendChild(elt);
    } else {
      list.appendChild(elt);
    }
  })
  if (selected_list.childElementCount == 0) {
    display_content([list]);
  } else {
    display_content([selected_list, list]);
  }
}

fetch('./static/output.json').then(async response => load_people(await response.json()));
const anchorEl = document.body.querySelector('#sort-anchor');
const menuEl = document.body.querySelector('#sort-menu');
menuEl.anchorElement = anchorEl;

anchorEl.addEventListener('click', () => { menuEl.open = !menuEl.open; });

function update_all() {
  var state = document.getElementById("general_checkbox").checked;
  var checkboxs = document.getElementsByClassName("elt_checkbox");
  for (const elt of checkboxs) {
    elt.checked = state;
  }
}

function update_some() {
  var checked = 0;
  var unchecked = 0;
  var checkboxs = document.getElementsByClassName("elt_checkbox");
  for (const elt of checkboxs) {
    if (elt.checked) { checked += 1 } else { unchecked += 1 }
  }
  var general_checkbox = document.getElementById("general_checkbox");
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

function test() {
  display_loading();
}

export { toggle_sidebar, update_all, update_some, test };
