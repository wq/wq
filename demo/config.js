export default {
    site_title: 'wq Demo App',
    router: {
        base_url: window.location.pathname
    },
    pages: {
        site: {
            url: 'sites',
            map: true,
            list: true,
            form: [
                {
                    name: 'name',
                    type: 'string',
                },
                { name: 'geometry', type: 'geopoint' },
            ],
        },
        observation: {
            url: 'observations',
            list: true,
            form: [
                {
                    name: 'site',
                    type: 'string',
                    'wq:ForeignKey': 'site',
                    bind: { constraint: 'wq:ForeignKey(site)' },
                },
                {
                    name: 'date',
                    type: 'date',
                },
                { name: 'comments', type: 'text' },
            ],
        },
    }
};
