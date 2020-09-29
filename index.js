import app from '@wq/app';
import material from '@wq/material';
import mapbox from '@wq/mapbox';

import React from 'react';
import mapboxgl from 'mapbox-gl';

app.use([material, mapbox]);

export default app;

export { React, mapboxgl };
