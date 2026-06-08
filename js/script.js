$("#add")[0].addEventListener("click", () => {
  let cont = document.createElement("div");
  cont.className = "cont";
  let cNameLabel = document.createElement("p");
  cNameLabel.innerText = "Name:";
  let cName = document.createElement("input");
  cName.placeholder = "Username";
  let cRoleLabel = document.createElement("p");
  cRoleLabel.innerText = "Role:";
  let cRole = document.createElement("input");
  cRole.placeholder = "Creator / Musician";
  let cURLLabel = document.createElement("p");
  cURLLabel.innerText = "URL (leave blank to not include):";
  let cURL = document.createElement("input");
  cURL.placeholder = "https://example.com/";
  cont.appendChild(cNameLabel);
  cont.appendChild(cName);
  cont.appendChild(cRoleLabel);
  cont.appendChild(cRole);
  cont.appendChild(cURLLabel);
  cont.appendChild(cURL);
  $("#contributors")[0].appendChild(cont);
});

$("#remove")[0].addEventListener("click", () => {
  if (!($(".cont").length == 0)) {
    let last = $(".cont").length - 1;
    $(".cont")[last].remove();
  }
});

function generatePolymodMeta() {
  let meta = {};

  meta.title = $("#title")[0].value;
  meta.description = $("#desc")[0].value;
  if (!($("#home")[0].value == "")) meta.homepage = $("#home")[0].value;
  meta.contributors = [];
  for (let i = 0; i < $(".cont").length; i++) {
    let contributor = {};

    contributor.name = $(".cont")[i].children[1].value;
    contributor.role = $(".cont")[i].children[3].value;
    if (!($(".cont")[i].children[5].value == "")) contributor.url = $(".cont")[i].children[5].value;

    meta.contributors.push(contributor);
  }
  meta.api_version = $("#apiVer")[0].value;
  meta.mod_version = $("#modVer")[0].value;
  if (!($("#license")[0].value == "")) meta.license = $("#license")[0].value;

  if ($("#whitespace")[0].checked) result = JSON.stringify(meta, undefined, 2)
  else result = JSON.stringify(meta);

  return result;
}

$("#download")[0].addEventListener("click", () => {
  let file = new File(
    [generatePolymodMeta()],
    "_polymod_meta.json",
  );

  saveAs(file);
});