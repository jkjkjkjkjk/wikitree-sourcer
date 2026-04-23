export const WikidataSite = {
    id: "wikidata",
    label: "Wikidata",
    hostnames: ["www.wikidata.org", "wikidata.org"],

    isRecordPage: () => {
        return /\/wiki\/Q\d+/.test(window.location.pathname);
    },

    getRecordId: () => {
        const match = window.location.pathname.match(/Q\d+/);
        return match ? match[0] : null;
    }
};
