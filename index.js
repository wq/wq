import app from "@wq/app";
import material from "@wq/material";
import mapgl from "@wq/map-gl";
import modules from "./modules.js";
import maplibre from "maplibre-gl";

const version = "WQ_VERSION";

mapgl.setEngine(maplibre);
app.use([material, mapgl]);

export default app;

export { modules, version };
