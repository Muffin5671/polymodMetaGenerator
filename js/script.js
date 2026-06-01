$("#add").addEventListener("click", () => {
  let cont = document.createElement("div");
  cont.className = "cont";
  let cName = document.createElement("input");
  let cRole = document.createElement("input");
  let cURL = document.createElement("input");
  cont.appendChild(cName);
  cont.appendChild(cRole);
  cont.appendChild(cURL);
  $(".box")[0].appendChild(cont);
})

function generatePolymodMeta() {
  let meta = {};

  meta.title = $("#title")[0].value;
  meta.description = $("#desc")[0].value;
  if (!($("#home")[0].value == "")) meta.homepage = $("#home")[0].value;
  for (let i = 0; i < $(".cont").length; i++) {
    let contributor = {};

    contributor.name = $(".cont")[i].children[0].value;
    contributor.role = $(".cont")[i].children[1].value;
    if (!($(".cont")[i].children[2].value == "")) contributor.url = $(".cont")[i].children[2].value;

    meta.contributors.push(contributor);
  }
  meta.api_version = $("#apiVer")[0].value;
  meta.mod_version = $("#apiVer")[0].value;
  if (!($("#license")[0].value == "")) meta.license = $("#license")[0].value;

  return JSON.stringify(meta, undefined, 2);
}

$("#download")[0].addEventListener("click", () => {
  let file = new File(
    [generatePolymodMeta()],
    "_polymod_meta.json",
  );

  saveAs(file);
});