import { useEffect, useState } from "react";
import { useMap, useMapsLibrary } from "@vis.gl/react-google-maps";
import type { RouteWaypoint } from "../types/domain";

/**
 * Fetches a real, road-following route through the given waypoints using
 * the Directions Service (part of the "routes" Maps JS library). Returns
 * the flattened path (array of LatLng) to draw as a Polyline, since we
 * want our own accent-red styling rather than the default DirectionsRenderer
 * look.
 */
export function useDirectionsPath(waypoints: RouteWaypoint[]) {
  const map = useMap();
  const routesLibrary = useMapsLibrary("routes");
  const [path, setPath] = useState<google.maps.LatLngLiteral[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!routesLibrary || !map || waypoints.length < 2) return;

    const directionsService = new routesLibrary.DirectionsService();
    const [origin, ...rest] = waypoints;
    const destination = rest[rest.length - 1];
    const intermediates = rest.slice(0, -1);

    directionsService
      .route({
        origin: origin.location,
        destination: destination.location,
        waypoints: intermediates.map((w) => ({ location: w.location, stopover: true })),
        travelMode: google.maps.TravelMode.DRIVING,
      })
      .then((result) => {
        const points: google.maps.LatLngLiteral[] = [];
        result.routes[0]?.legs.forEach((leg) => {
          leg.steps.forEach((step) => {
            step.path?.forEach((p) => points.push({ lat: p.lat(), lng: p.lng() }));
          });
        });
        setPath(points);
      })
      .catch(() => {
        // Fall back to straight lines between waypoints if directions fail
        // (e.g. API not enabled for this key) so the map still shows a route.
        setError("directions_unavailable");
        setPath(waypoints.map((w) => w.location));
      });
  }, [routesLibrary, map, waypoints]);

  return { path, error };
}