import dayjs from 'dayjs';
import React, { useEffect, useRef, useState } from 'react';
import Globe from 'react-globe.gl';

import lunarBumpmap from '../assets/lunar_bumpmap.jpg';
import lunarSurface from '../assets/lunar_surface.jpg';
import orbitronFacetype from '../assets/orbitron_facetype.json';
import sites from '../assets/sites.json';
import { useEventsContext } from '../contexts/EventsContext';
import { EventTypeColor } from '../core/enums';
import { geoCentroid } from 'd3-geo'
// import { Contour } from '../core/utils'

const getPolygon = (events) => {
  let coords = events.map(e => [e.lng, e.lat])
  // create a polygon even if only 1 or 2 points
  if (coords.length == 1) {
    coords = [...coords, ...coords, ...coords]
  } else if (coords.length == 2) {
    const [c1, c2] = coords
    coords = [c1, c2, [(c1[0]+c2[0])/2, (c1[1]+c2[1])/2]]
  } else if (coords.length > 3) {
    coords = coords.slice(1, 4)

  }
  return {type: "Feature", geometry: { type: 'Polygon', coordinates: [coords] }}
}

const Moon = () => {
  const { state } = useEventsContext();
  const { selectedEvent } = state;

  const containerRef = useRef(null);
  const globeRef = useRef(null);

  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  const [labelsData, setLabelsData] = useState([]);

  useEffect(() => {
    setWidth(containerRef.current.offsetWidth);
    setHeight(containerRef.current.offsetHeight);

    function handleResize() {
      setWidth(containerRef.current.offsetWidth);
      setHeight(containerRef.current.offsetHeight);
    }
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [
    containerRef.current?.parentElement.offsetWidth,
    containerRef.current?.parentElement.offsetHeight,
  ]);

  useEffect(() => {
    // Remove Apollo 14 from labels to avoid overlap with 12.
    setLabelsData(
      sites
        .filter((site) => site.label !== 'Apollo 14')
        .map((site, index) => ({
          lat: site.lat,
          lng: site.lng,
          label: site.label === 'Apollo 12' ? 'Apollo 12 & 14' : site.label,
        }))
    );

    // https://github.com/vasturiano/globe.gl/blob/master/example/custom-globe-styling/index.html#L30-L33
    setTimeout(() => {
      const directionalLight = globeRef.current
        .scene()
        .children.find((obj3d) => obj3d.type === 'DirectionalLight');
      directionalLight && directionalLight.position.set(0, 0, 1);
    });
  }, []);

  const points = [];
  if (selectedEvent) {
    const { start_date, type, data_1, data_2, data_3, data_4 } = selectedEvent;
    const pointData = { color: EventTypeColor[type] };

    if (data_1) {
      // Apollo 11 instruments worked for three weeks only.
      if (dayjs(start_date).isBefore('1969-09-01'))
        points.push({
          ...pointData,
          lat: sites[0].lat,
          lng: sites[0].lng,
          data: data_1,
        });
      else
        points.push({
          ...pointData,
          lat: sites[1].lat,
          lng: sites[1].lng,
          data: data_1,
        });
    }
    if (data_2)
      points.push({
        ...pointData,
        lat: sites[2].lat,
        lng: sites[2].lng,
        data: data_2,
      });
    if (data_3)
      points.push({
        ...pointData,
        lat: sites[3].lat,
        lng: sites[3].lng,
        data: data_3,
      });
    if (data_4)
      points.push({
        ...pointData,
        lat: sites[4].lat,
        lng: sites[4].lng,
        data: data_4,
      });
  }

  useEffect(() => {
    if (points.length) {

    const geoJsonPoint = getPolygon(points)
    const [lng,lat] = geoCentroid(geoJsonPoint)
      globeRef.current?.pointOfView(
        { lat: lat, lng: lng, altitude: 1.5 },
        500
      );
    }

  }, [points]);

  const maxPointsValue = Math.max(...points.map((point) => point.data));

  const ringsData = points.map((point) => ({
    ...point,
    maxR: (point.data / maxPointsValue) * 7,
  }));

  const pointsData = points.map((point) => ({
    ...point,
    altitude: (point.data / maxPointsValue) * 0.5,
  }));

  return (
    <div ref={containerRef} id="moon">
      <Globe
        ref={globeRef}
        width={width}
        height={height}
        globeImageUrl={lunarSurface}
        bumpImageUrl={lunarBumpmap}
        backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
        showGraticules={true}
        labelsData={labelsData}
        labelText="label"
        labelSize={1.5}
        labelAltitude={0.1}
        labelIncludeDot={false}
        labelColor={() => 'white'}
        labelTypeFace={orbitronFacetype}
        pointsData={pointsData}
        pointAltitude="altitude"
        pointColor="color"
        pointRadius={0.1}
        pointsTransitionDuration={200}
        ringsData={ringsData}
        ringColor="color"
        ringMaxRadius="maxR"
        ringPropagationSpeed={2}
        ringRepeatPeriod={300}
      />
    </div>
  );
};

export default Moon;
