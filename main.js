class PolymodMeta {
  constructor(modName, modDesc, modHome, modContributors, modApi, modVer) {
    return {meta: `{
  "title": "${modName}",
  "description": "${modDesc}",
  "homepage": "${modHome}",
  "contributors": [${modContributors}],
  "api_version": "${modApi}",
  "mod_version": "${modVer}",
  "license": "Apache-2.0",
  "generatedBy": "Polymod Meta Generator (https://muffin5671.github.io/polymodMetaGenerator)"
}`};
  }
}

$('#download')[0].addEventListener('click', () => {
  saveAs(new File([new PolymodMeta(
    $('#modName')[0].value,
    $('#modDesc')[0].value,
    $('#modHome')[0].value,
    $('#modCont')[0].value,
    $('#modApi')[0].value,
    $('#modVer')[0].value
  ).meta], '_polymod_meta.json'));
})