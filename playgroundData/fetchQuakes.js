const axios = require("axios");
const moment = require("moment");

const url =
  "https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2014-01-01&endtime=2014-01-02";

axios
  .get(url)
  .then((res) => {
    const quake = res.data.features[0];
    const timestamp = quake.properties.time;
    const datestring = moment(timestamp).format("MMMM Do, YYYY [at] HH:mm:SS");

    const customData = {
      magnitude: quake.properties.mag,
      location: quake.properties.place,
      when: datestring,
      time: timestamp,
      id: quake.id,
    };

    console.log(customData);
  })
  .catch((err) => err);
