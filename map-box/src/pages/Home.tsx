import { Autocomplete, Box, Grid, TextField } from "@mui/material";
import DeckGL, { SolidPolygonLayer } from "deck.gl/typed";
import { memo, useLayoutEffect, useRef, useState } from "react";
import { useQuery } from "react-query";
import { RawPolygon } from "../models";
import { polygonService } from "../services";

const INITIAL_VIEW_STATE = {
  latitude: 51.47,
  longitude: 0.45,
  zoom: 1,
  bearing: 0,
  pitch: 30,
};

const _AreaDropdown = ({
  onChange,
}: {
  onChange: (polygon: RawPolygon) => void;
}) => {
  const didInitializeValue = useRef(false);
  const polygonsQuery = useQuery("list_polygons", polygonService.list, {
    refetchOnWindowFocus: false,
  });

  useLayoutEffect(() => {
    if (
      polygonsQuery.data !== undefined &&
      didInitializeValue.current === false
    ) {
      onChange(polygonsQuery.data[0]);
      didInitializeValue.current = true;
    }
  }, [polygonsQuery.data, onChange]);

  if (polygonsQuery.data === undefined) {
    return <div>Loading...</div>;
  }

  return (
    <Grid container direction="column" marginTop="16px">
      <Grid item alignSelf="center">
        <Autocomplete
          autoHighlight
          autoComplete
          disablePortal
          defaultValue={polygonsQuery.data[0]}
          onChange={(_, newValue) => newValue && onChange(newValue)}
          getOptionLabel={(option) => option.title}
          renderOption={(props, option) => (
            <li {...props} key={option._id}>
              {option.title}
            </li>
          )}
          options={polygonsQuery.data || []}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Area" />}
        />
      </Grid>
    </Grid>
  );
};
const AreaDropdown = memo(_AreaDropdown);

const _Map = ({ selectedPolygon }: { selectedPolygon?: RawPolygon }) => {
  const polygonsQuery = useQuery("list_polygons", polygonService.list, {
    refetchOnWindowFocus: false,
  });

  if (polygonsQuery.data === undefined) {
    return <div data-cy="home_page">Loading map polygons...</div>;
  }

  const staticLayers = new SolidPolygonLayer({
    data: polygonsQuery.data.map((polygon) => ({ polygon: polygon.area })),
    getPolygon: (d) => d.polygon,
    getFillColor: [0, 0, 0],
    getLineColor: [60, 60, 60],
    opacity: 0.4,
    lineWidthMinPixels: 2,
    extruded: true,
    highlightColor: [255, 255, 0],
    highlightedObjectIndex: polygonsQuery.data.findIndex(
      (polygon) => polygon._id === selectedPolygon?._id
    ),
    elevationScale: 40,
  });

  return (
    <Box
      position="relative"
      height="80vh"
      border="2px solid gray"
      marginY="32px"
    >
      <DeckGL
        controller={true}
        layers={[staticLayers]}
        initialViewState={INITIAL_VIEW_STATE}
      />
    </Box>
  );
};
const Map = memo(_Map);

export default function HomePage() {
  const [selectedPolygon, setSelectedPolygon] = useState<
    RawPolygon | undefined
  >();

  return (
    <>
      <AreaDropdown onChange={setSelectedPolygon} />
      <Map selectedPolygon={selectedPolygon} />
    </>
  );
}
