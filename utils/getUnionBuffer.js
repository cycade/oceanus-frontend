import * as turf from '@turf/turf';

export default function getUnionBuffer(points) {
  let radius = 0.2;
  let buffers = points.map(e => {
    return getBuffer(e, radius);
  });

  let polygons = turf.union(...buffers).geometry.coordinates;
  let result = polygons.map(polygon => {
    return polygon[0].map(point => {
      return [point[1], point[0]];
    })
  })

  return result;
}

function getBuffer(latlng, radius) {
  let center = turf.point([latlng[1], latlng[0]]);
  let options = {steps: 10, units: 'kilometers', properties: {}};
  return turf.circle(center, radius, options);
}