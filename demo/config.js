export default {
    site_title: "wq Demo App",
    router: {
        base_url: window.location.pathname,
    },
    pages: {
        site: {
            url: "sites",
            map: true,
            list: true,
            form: [
                {
                    name: "name",
                    label: "Name",
                    type: "string",
                },
                { name: "geometry", label: "Location", type: "geopoint" },
            ],
        },
        observation: {
            url: "observations",
            list: true,
            form: [
                {
                    name: "site",
                    label: "Site",
                    type: "string",
                    "wq:ForeignKey": "site",
                    bind: { constraint: "wq:ForeignKey(site)" },
                },
                {
                    name: "date",
                    label: "Date",
                    type: "date",
                },
                { name: "comments", label: "Comments", type: "text" },
            ],
        },
    },
};
