let aneliqnerigorcernermucel = document.getElementById("aneliqneri-input");
let aneliqnerilist = document.getElementById("aneliqneri-list");
let aneliqnerilistitvyalner = [];
let aneliqnerikatarvaclist = [];

let motivaciontextelement = document.getElementById("motivacion-text");
let textericank = [
  "Ժամանակն է սկսել",
  "Առաջին քայլերն արդեն արված են",
  "Մի հանձնվիր",
  "Մի պուտյուր մնաց",
  "Ապրես, ես քեզանով հպարտանում եմ"
];

kardaltvyalnery();
for (let i = 0; i < aneliqnerilistitvyalner.length; i++) {
  stexcelaneliqili(aneliqnerilistitvyalner[i], aneliqnerikatarvaclist[i]);
}
tarmacneltexty();

function tarmacneltexty() {
  let boloraneliqner = aneliqnerikatarvaclist.length;
  let katarvacaneliqner = 0;
  for (let i = 0; i < boloraneliqner; i++) {
    if (aneliqnerikatarvaclist[i] === true) {
      katarvacaneliqner++;
    }
  }
  let katarvactokos = 0;
  if (boloraneliqner !== 0) {
    katarvactokos = katarvacaneliqner / boloraneliqner;
  }
  let textindex = Math.floor(katarvactokos * (textericank.length - 1));
  motivaciontextelement.innerHTML = textericank[textindex];
}

function pahpaneltvyalnery() {
  localStorage.setItem(
    "aneliqnerilistibanali",
    JSON.stringify(aneliqnerilistitvyalner)
  );
  localStorage.setItem(
    "aneliqnerikatarvaclistbanali",
    JSON.stringify(aneliqnerikatarvaclist)
  );
  tarmacneltexty();
}

function kardaltvyalnery() {
  aneliqnerilistitvyalner =
    JSON.parse(localStorage.getItem("aneliqnerilistibanali")) || [];
  aneliqnerikatarvaclist =
    JSON.parse(localStorage.getItem("aneliqnerikatarvaclistbanali")) || [];
}
function avelacnel() {
  let aneliqtext = aneliqnerigorcernermucel.value;
  if (aneliqtext.trim().length === 0) {
    return;
  }
  aneliqnerigorcernermucel.value = "";
  stexcelaneliqili(aneliqtext, false);
  aneliqnerilistitvyalner.push(aneliqtext);
  aneliqnerikatarvaclist.push(false);
  pahpaneltvyalnery();
}

function stexcelaneliqili(text, katarvac) {
  let aneliqtextnode = document.createTextNode(text);
  let aneliqgalochka = document.createElement("input");
  aneliqgalochka.setAttribute("type", "checkbox");
  aneliqgalochka.setAttribute("onclick", "aneliqcheck(this)");
  aneliqgalochka.checked = katarvac;

  let galochkaspan = document.createElement("span");
  galochkaspan.classList.add("checkmark");

  let aneliqlabel = document.createElement("label");
  aneliqlabel.classList.add("gorcer");
  aneliqlabel.classList.add("container");
  aneliqlabel.appendChild(aneliqgalochka);
  aneliqlabel.appendChild(galochkaspan);
  aneliqlabel.appendChild(aneliqtextnode);

  if (katarvac === true) {
    aneliqlabel.classList.add("checkaneliq");
  } else {
    aneliqlabel.classList.remove("checkaneliq");
  }

  let iksik = document.createElement("button");
  iksik.setAttribute("onclick", "aneliqjnjel(this)");
  iksik.classList.add("jnjeluknopka");
  iksik.textContent = "x";

  let aneliqli = document.createElement("li");
  aneliqli.appendChild(aneliqlabel);
  aneliqli.appendChild(iksik);

  aneliqnerilist.insertBefore(aneliqli, aneliqnerilist.childNodes[0]);
}

aneliqnerigorcernermucel.addEventListener("keyup", function (event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    document.getElementById("knopka").click();
  }
});

function aneliqcheck(sexmvaccheckbox) {
  let sexmvaclable = sexmvaccheckbox.parentElement;
  let sexmvacli = sexmvaclable.parentElement;
  let sexmvacindex = liIndexInUl(sexmvacli);

  if (sexmvaccheckbox.checked === true) {
    sexmvaclable.classList.add("checkaneliq");
    sexmvaclable.classList.remove("chnshvac");
    aneliqnerikatarvaclist[sexmvacindex] = true;
    let gnaluindex = 0;
    moveArrayElement(aneliqnerilistitvyalner, sexmvacindex, gnaluindex);
    moveArrayElement(aneliqnerikatarvaclist, sexmvacindex, gnaluindex);
    sexmvacli.remove();
    aneliqnerilist.appendChild(sexmvacli);
  } else {
    sexmvaclable.classList.remove("checkaneliq");
    sexmvaclable.classList.add("chnshvac");
    aneliqnerikatarvaclist[sexmvacindex] = false;
    let gnaluindex = aneliqnerilistitvyalner.length - 1;
    moveArrayElement(aneliqnerilistitvyalner, sexmvacindex, gnaluindex);
    moveArrayElement(aneliqnerikatarvaclist, sexmvacindex, gnaluindex);
    aneliqnerilist.insertBefore(sexmvacli, aneliqnerilist.firstChild);
  }
  pahpaneltvyalnery();
}

function aneliqjnjel(jnjeluknopka) {
  let sexmvacli = jnjeluknopka.parentElement;
  let jnjeluindex = liIndexInUl(sexmvacli);
  aneliqnerilistitvyalner.splice(jnjeluindex, 1);
  aneliqnerikatarvaclist.splice(jnjeluindex, 1);
  pahpaneltvyalnery();
  sexmvacli.remove();
}

function liIndexInUl(li) {
  let allLiElements = li.parentElement.children;
  let index = Array.prototype.slice.call(allLiElements).indexOf(li);
  let reverseIndex = allLiElements.length - 1 - index;
  return reverseIndex;
}

function moveArrayElement(array, from, to) {
  array.splice(to, 0, array.splice(from, 1)[0]);
}
