import dayjs from 'dayjs';
import React, { useEffect, useRef, useState } from 'react';
import Globe from 'react-globe.gl';

import lunarBumpmap from '../assets/lunar_bumpmap.jpg';
import lunarSurface from '../assets/lunar_surface.jpg';
import orbitronFacetype from '../assets/orbitron_facetype.json';
import sites from '../assets/sites.json';
import { useEventsContext } from '../contexts/EventsContext';

console.log('orbitronFacetype', orbitronFacetype);

const Moon = () => {
  const { state } = useEventsContext();
  const { selectedEvent } = state;

  const ref = useRef(null);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  const [labels, setLabels] = useState([]);

  useEffect(() => {
    setWidth(ref.current.offsetWidth);
    setHeight(ref.current.offsetHeight);

    function handleResize() {
      setWidth(ref.current.offsetWidth);
      setHeight(ref.current.offsetHeight);
    }
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [
    ref.current?.parentElement.offsetWidth,
    ref.current?.parentElement.offsetHeight,
  ]);

  useEffect(() => {
    setLabels(sites);
  }, []);

  const pointsData = [];
  if (selectedEvent) {
    const { start_date, data_1, data_2, data_3, data_4 } = selectedEvent;

    const siteIndexes = [];
    // Apollo 11 instruments worked for three weeks only.
    if (data_1)
      siteIndexes.push(dayjs(start_date).isBefore('1969-09-01') ? 0 : 1);
    if (data_2) siteIndexes.push(2);
    if (data_3) siteIndexes.push(3);
    if (data_4) siteIndexes.push(4);

    siteIndexes.forEach((siteIndex) => {
      pointsData.push({
        lat: sites[siteIndex].lat,
        lng: sites[siteIndex].lng,
        size: 0.8,
        color: 'white',
      });
    });
  }

  return (
    <div ref={ref} id="moon">
      <Globe
        width={width}
        height={height}
        globeImageUrl={lunarSurface}
        bumpImageUrl={lunarBumpmap}
        backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
        showGraticules={true}
        labelsData={labels}
        labelText="label"
        labelSize={1.5}
        labelDotRadius={0.2}
        labelDotOrientation="top"
        labelColor={() => 'white'}
        labelTypeFace={orbitronFacetype}
        pointsData={pointsData}
        pointAltitude="size"
        pointColor="color"
      />
    </div>
  );
};

export default Moon;
