import React, { useState, useRef, useEffect } from "react";
import Globe from "react-globe.gl";
import { scaleOrdinal } from "d3-scale";

import { useMoonContext } from "../contexts/MoonContext";

import lunarSurface from "../assets/lunar_surface.jpg";
import lunarBumpmap from "../assets/lunar_bumpmap.jpg";
import { moonLandings } from "../assets/moonLandings";



const Moon = () => {
  const ref = useRef(null);
  const [landingSites, setLandingSites] = useState([]);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  const { state } = useMoonContext();
  console.log("STATE", state)

  const colorScale = scaleOrdinal([
    "orangered",
    "mediumblue",
    "darkgreen",
    "yellow",
  ]);

  useEffect(() => {
    setWidth(ref.current.offsetWidth);
    setHeight(ref.current.offsetHeight);

    function handleResize() {
      setWidth(ref.current.offsetWidth);
      setHeight(ref.current.offsetHeight);
    }
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [
    ref.current?.parentElement.offsetWidth,
    ref.current?.parentElement.offsetHeight,
  ]);

  useEffect(() => {
    setLandingSites(moonLandings);
  }, []);

  return (
    <div ref={ref} id="moon">
      <Globe
        width={width}
        height={height}
        globeImageUrl={lunarSurface}
        bumpImageUrl={lunarBumpmap}
        backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
        showGraticules={true}
        labelsData={landingSites}
        labelText="label"
        labelSize={1.7}
        labelDotRadius={0.4}
        labelDotOrientation="top"
        labelColor={(d) => colorScale(d.agency)}
        labelLabel={(d) => `
          <div><b>${d.label}</b></div>
          <div>${d.agency} - ${d.program} Program</div>
          <div>Landing on <i>${new Date(d.date).toLocaleDateString()}</i></div>
        `}
        onLabelClick={(d) => window.open(d.url, "_blank")}
      />
    </div>
  );
};

export default Moon;
