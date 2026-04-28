class PolymodMeta {
  constructor(modName, modDesc, modHome, modContributors, modApi, modVer) {
    return {meta: `{
      title: ${modName},
      description: ${modDesc},
      homepage: ${modHome},
      contributors: ${modContributors},
      api_version: ${modApi},
      mod_version: ${modVer},
      license: 'Apache-2.0'
    }`};
  }
}

$('#download')[0].addEventListener('click', () => {
  saveAs(new File([new PolymodMeta(
    $('#modName')[0].value,
    $('#modDesc')[0].value,
    $('#modHome')[0].value,
    [{name: 'someone', role: 'something'}],
    $('#modApi')[0].value,
    $('#modVer')[0].value
  ).meta], '_polymod_meta.json'));
})