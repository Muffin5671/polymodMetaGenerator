function generatePolymodMeta() {
  let meta = {};

  meta.title = $("#title")[0].value;
  meta.description = $("#desc")[0].value;
  if (!($("#home")[0].value == "")) meta.homepage = $("#home")[0].value;
  for (let i = 0; i < $(".cont").length; i++) {
    meta.contributors.push();
  }
  meta.contributors;

  return JSON.stringify(meta, undefined, 2);
}

$("#download").addEventListener("click", () => {
  
});