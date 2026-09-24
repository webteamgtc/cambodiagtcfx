"use client";

import { useEffect, useMemo, useState } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import L from "leaflet";
import { MapContainer, Marker, GeoJSON, useMap } from "react-leaflet";
import { AU, GB, KM, MU, VU, ZA } from "country-flag-icons/react/3x2";
import { feature } from "topojson-client";
import worldTopo from "world-atlas/countries-110m.json";
import "leaflet/dist/leaflet.css";

/** World country polygons (land) derived from world-atlas topojson. */
const WORLD_FEATURES = feature(worldTopo, worldTopo.objects.countries);

/**
 * Features excluded because they render as stray full-width horizontal lines:
 * - Antarctica ("010") is clipped with a straight bottom edge.
 * - Fiji ("242") is a tiny antimeridian-crossing sliver.
 */
const EXCLUDED_IDS = new Set(["010", "242"]);
const EXCLUDED_NAMES = new Set(["Antarctica", "Fiji"]);

/**
 * Rings that cross the ±180° antimeridian (e.g. Russia's far east) wrap all the
 * way across the map and draw stray horizontal seam lines. Detect them by their
 * excessive longitude span and shift negative longitudes by +360° so the ring
 * stays contiguous (the wrapped part renders just past +180°, off-frame).
 */
function unwrapRing(ring) {
  let min = Infinity;
  let max = -Infinity;
  for (const [lng] of ring) {
    if (lng < min) min = lng;
    if (lng > max) max = lng;
  }
  if (max - min <= 180) return ring;
  return ring.map(([lng, lat]) => [lng < 0 ? lng + 360 : lng, lat]);
}

function unwrapGeometry(geometry) {
  if (!geometry) return geometry;
  if (geometry.type === "Polygon") {
    return { ...geometry, coordinates: geometry.coordinates.map(unwrapRing) };
  }
  if (geometry.type === "MultiPolygon") {
    return {
      ...geometry,
      coordinates: geometry.coordinates.map((poly) => poly.map(unwrapRing)),
    };
  }
  return geometry;
}

const WORLD_GEOJSON = {
  ...WORLD_FEATURES,
  features: WORLD_FEATURES.features
    .filter(
      (f) => !EXCLUDED_IDS.has(f?.id) && !EXCLUDED_NAMES.has(f?.properties?.name)
    )
    .map((f) => ({ ...f, geometry: unwrapGeometry(f.geometry) })),
};

/** Light-gray land on a white (water) background. */
const LAND_STYLE = {
  fillColor: "#E4E7EF",
  fillOpacity: 1,
  color: "#FFFFFF",
  weight: 0.6,
  opacity: 1,
};

/** Real geographic coordinates [lat, lng] for each regulated office. */
const locations = [
  {
    key: "london",
    code: "FCA",
    flag: "gb",
    position: [51.5074, -0.1278],
    line: "M 0 0 L -16 -10 L -68 -38",
    cardClass: "right-full bottom-full mb-1.5 mr-1.5",
  },
  {
    key: "anjouan",
    code: "AOFA",
    flag: "km",
    position: [-12.1667, 44.3833],
    line: "M 0 0 L 48 -8 L 68 -20",
    cardClass: "left-full top-1/2 ml-2.5 -translate-y-1/2",
  },
  {
    key: "mauritius",
    code: "FSC",
    flag: "mu",
    position: [-20.1609, 57.5012],
    line: "M 0 0 L 24 -12 L 52 -24",
    cardClass: "left-full bottom-full mb-2 ml-2",
  },
  {
    key: "capetown",
    code: "FSCA",
    flag: "za",
    position: [-33.9249, 18.4241],
    line: "M 0 0 L 52 0",
    cardClass: "left-full top-1/2 ml-2.5 -translate-y-1/2",
  },
  {
    key: "portvila",
    code: "VFSC",
    flag: "vu",
    position: [-17.7334, 168.3273],
    line: "M 0 0 L -48 -6",
    cardClass: "right-full top-1/2 mr-2.5 -translate-y-1/2",
  },
  {
    key: "sydney",
    code: "ASIC",
    flag: "au",
    position: [-33.8688, 151.2093],
    line: "M 0 0 L -52 4",
    cardClass: "right-full top-1/2 mr-2.5 -translate-y-1/2",
  },
];

/** Bounds that tightly enclose every regulated office. */
const LOCATION_BOUNDS = L.latLngBounds(locations.map((loc) => loc.position));

/** Keeps panning constrained to the visible world when zoomed in. */
const WORLD_MAX_BOUNDS = L.latLngBounds(
  L.latLng(-60, -180),
  L.latLng(84, 180)
);

const FLAG_ICONS = {
  km: KM,
  za: ZA,
  vu: VU,
  gb: GB,
  au: AU,
  mu: MU,
};

function Flag({ code }) {
  const FlagIcon = FLAG_ICONS[code];
  if (!FlagIcon) return null;

  return (
    <span className="inline-flex h-4 w-6 shrink-0 overflow-hidden">
      <FlagIcon title={code.toUpperCase()} className="h-full w-full" />
    </span>
  );
}

function MarkerPinContent({ loc, label, active }) {
  return (
    <div
      className={`regulations-marker-pin group relative h-0 w-0 ${active ? "is-active" : ""}`}
    >
      <svg
        className="pointer-events-none absolute left-0 top-0 hidden overflow-visible sm:block"
        width="1"
        height="1"
        aria-hidden
      >
        <path
          d={loc.line}
          fill="none"
          stroke="#c8d0e3"
          strokeWidth="1"
          strokeDasharray="3 3"
          strokeLinecap="round"
        />
      </svg>

      {/* Card is hidden on mobile until its marker is tapped; always shown on sm+. */}
      <div
        className={`absolute z-20 hidden group-[.is-active]:block sm:block ${loc.cardClass}`}
      >
        <div className="flex items-center gap-1.5 rounded-lg border border-[#eef1f8] bg-white px-2 py-1.5 shadow-[0_4px_14px_rgba(2,0,47,0.08)]">
          <Flag code={loc.flag} />
          <span className="whitespace-nowrap text-[11px] font-semibold text-[#02002f] sm:text-xs">
            {label}
          </span>
          <span className="whitespace-nowrap rounded-full bg-[#f0f2f8] px-1.5 py-0.5 text-[10px] font-medium text-[#3347a8]">
            {loc.code}
          </span>
        </div>
      </div>

      <div className="absolute left-0 top-0 z-10 -translate-x-1/2 -translate-y-1/2">
        <span className="absolute -inset-2.5 rounded-full bg-[#3347a8]/15" />
        <span className="absolute -inset-1 rounded-full bg-[#3347a8]/25 animate-ping" />
        <span className="relative block h-2.5 w-2.5 rounded-full bg-[#3347a8] ring-[3px] ring-[#3347a8]/20" />
      </div>
    </div>
  );
}

function createMarkerIcon(loc, label, active) {
  return L.divIcon({
    className: "regulations-marker-icon",
    html: renderToStaticMarkup(
      <MarkerPinContent loc={loc} label={label} active={active} />
    ),
    iconSize: [0, 0],
    iconAnchor: [0, 0],
  });
}

function RegulationMarker({ loc, label, active, onToggle }) {
  const icon = useMemo(
    () => createMarkerIcon(loc, label, active),
    [loc, label, active]
  );

  return (
    <Marker
      position={loc.position}
      icon={icon}
      eventHandlers={{ click: onToggle }}
    />
  );
}


function MapViewController() {
  const map = useMap();

  useEffect(() => {
    // Zoom to the regulated offices. Asymmetric padding leaves room for the
    // label cards that extend outward from the top/side markers.
    map.fitBounds(LOCATION_BOUNDS, {
      animate: false,
      paddingTopLeft: [70, 90],
      paddingBottomRight: [70, 70],
    });
  }, [map]);

  return null;
}

function ZoomControls({ map }) {
  const iconClass = "h-4 w-4";
  const buttonClass =
    "flex h-9 w-9 items-center justify-center text-[#3347a8] transition hover:bg-[#f0f2f8] disabled:cursor-not-allowed disabled:text-[#c8d0e3]";

  return (
    <div className="absolute bottom-3 right-3 z-[500] flex flex-col overflow-hidden rounded-xl border border-[#E1E7F6] bg-white shadow-[0_4px_14px_rgba(2,0,47,0.08)]">
      <button
        type="button"
        aria-label="Zoom in"
        onClick={() => map.zoomIn()}
        className={buttonClass}
      >
        <svg
          viewBox="0 0 24 24"
          className={iconClass}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          aria-hidden
        >
          <path d="M12 5v14M5 12h14" />
        </svg>
      </button>

      <span className="h-px w-full bg-[#E1E7F6]" />

      <button
        type="button"
        aria-label="Zoom out"
        onClick={() => map.zoomOut()}
        className={buttonClass}
      >
        <svg
          viewBox="0 0 24 24"
          className={iconClass}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          aria-hidden
        >
          <path d="M5 12h14" />
        </svg>
      </button>
    </div>
  );
}

export default function RegulationsPresenceMap({ t }) {
  const [map, setMap] = useState(null);
  const [activeKey, setActiveKey] = useState(null);

  const toggleActive = (key) =>
    setActiveKey((current) => (current === key ? null : key));

  return (
    <div className="regulations-presence-map relative aspect-[1055/571] w-full overflow-hidden rounded-xl border border-[#E1E7F6] bg-white">
      <MapContainer
        ref={setMap}
        center={[10, 20]}
        zoom={2}
        zoomSnap={0}
        minZoom={1}
        maxZoom={6}
        className="h-full w-full"
        style={{ background: "#ffffff" }}
        zoomControl={false}
        attributionControl={false}
        scrollWheelZoom={false}
        doubleClickZoom
        dragging
        touchZoom
        boxZoom
        keyboard={false}
        worldCopyJump={false}
        maxBounds={WORLD_MAX_BOUNDS}
        maxBoundsViscosity={1}
      >
        <GeoJSON data={WORLD_GEOJSON} style={LAND_STYLE} interactive={false} />
        <MapViewController />
        {locations.map((loc) => (
          <RegulationMarker
            key={loc.key}
            loc={loc}
            label={t(`locations.${loc.key}`)}
            active={activeKey === loc.key}
            onToggle={() => toggleActive(loc.key)}
          />
        ))}
      </MapContainer>

      {/* {map && <ZoomControls map={map} />} */}
    </div>
  );
}
