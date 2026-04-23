async function fetchEntity(qid) {
    const url = `https://www.wikidata.org/wiki/Special:EntityData/${qid}.json`;
    const res = await fetch(url);
    const data = await res.json();
    return data.entities[qid];
  function getClaimValue(entity, prop) {
    const claims = entity.claims[prop];
    if (!claims || !claims.length) return null;

    const mainsnak = claims[0].mainsnak;
    if (!mainsnak.datavalue) return null;

    return mainsnak.datavalue.value;
}
  export async function parseWikidataRecord(qid) {
    const entity = await fetchEntity(qid);

    const label = entity.labels?.en?.value || "";
    const description = entity.descriptions?.en?.value || "";

    const birth = getClaimValue(entity, "P569");
    const death = getClaimValue(entity, "P570");
    const birthPlace = getClaimValue(entity, "P19");
    const deathPlace = getClaimValue(entity, "P20");

    return {
        id: qid,
        name: label,
        description,
        birthDate: parseWikidataDate(birth),
        deathDate: parseWikidataDate(death),
        birthPlace: birthPlace?.id || null,
        deathPlace: deathPlace?.id || null,
        url: `https://www.wikidata.org/wiki/${qid}`
    };
}
  function parseWikidataDate(value) {
    if (!value || !value.time) return null;

    // format: +1900-01-01T00:00:00Z
    return value.time.substring(1, 11);
}
  export function buildWikidataCitation(record) {
    const today = new Date().toISOString().split("T")[0];

    return `Wikidata item ${record.id}, "${record.name}", Wikidata.org (accessed ${today}), ${record.url}`;
}
