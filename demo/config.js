export default {
    pages: {
        site: {
            url: 'sites',
            map: true,
            list: true,
            can_add: true,
            can_change: true,
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
            can_add: true,
            can_change: true,
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
