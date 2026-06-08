$("#add")[0].addEventListener("click", () => {
  let cont = document.createElement("div");
  cont.className = "cont";
  let cNameLabel = document.createElement("p");
  cNameLabel.innerText = "Name:";
  let cName = document.createElement("input");
  cName.setAttribute("placeholder", "Username");
  let cRoleLabel = document.createElement("p");
  cRoleLabel.innerText = "Role:";
  let cRole = document.createElement("input");
  cRole..setAttribute("placeholder", "Creator / Musician");
  let cURLLabel = document.createElement("p");
  cURLLabel.innerText = "URL (leave blank to not include):";
  let cURL = document.createElement("input");
  cURL.setAttribute("placeholder", "https://example.com/");
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

$("#loadFile")[0].addEventListener("click", () => {
  let fileInput = document.createElement("input");
  fileInput.setAttribute("type", "file");
  fileInput.setAttribute("accept", "application/json");
  fileInput.click();

  onfocus = () => {
    if (fileInput.files[0] == undefined) onfocus = null
    else {
      fileInput.files[0].text()
      .then(content => {
        let meta = JSON.parse(content);

        $("#title")[0].value = meta.title;
        $("#desc")[0].value = meta.description;
        if (!(meta.homepage == undefined)) $("#home")[0].value = meta.homepage
        else $("#home")[0].value = "";
        if (!($(".cont").length == 0)) {
          do {
            $(".cont")[0].remove();
           } while (!($(".cont").length == 0))
        }
        let i = 0;
        meta.contributors.forEach(cont => {
          $("#add")[0].click();
          $(".cont")[i].children[1].value = cont.name;
          $(".cont")[i].children[3].value = cont.role;
          if (!(cont.url == undefined)) $(".cont")[i].children[5].value = cont.url
          else $(".cont")[i].children[5].value = "";
          i++;
        })
        $("#apiVer")[0].value = meta.api_version;
        $("#modVer")[0].value = meta.mod_version;
        if (!(meta.license == undefined)) $("#license")[0].value = meta.license
        else $("#license")[0].value = "";
        $("#whitespace")[0].checked = /\n/.test(content);
      });
      onfocus = null;
    }
  }
});