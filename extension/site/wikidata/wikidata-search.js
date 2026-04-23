export function buildWikidataSearchUrl(profile) {
    const parts = [];

    if (profile.FirstName) parts.push(profile.FirstName);
    if (profile.LastNameAtBirth) parts.push(profile.LastNameAtBirth);
    if (profile.BirthDate) parts.push(profile.BirthDate.split("-")[0]);

    const query = encodeURIComponent(parts.join(" "));
    return `https://www.wikidata.org/w/index.php?search=${query}`;
