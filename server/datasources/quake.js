const { RESTDataSource } = require("apollo-datasource-rest");

class QuakeApi extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "https://earthquake.usgs.gov/fdsnws/event/1/";
  }

  async getAllQuakes() {
    const query =
      "query?format=geojson&starttime=2014-01-01&endtime=2014-01-02";

    const response = await this.get(query);

    return Array.isArray(response.features)
      ? response.features.map((quake) => this.quakeReducer(quake))
      : [];
  }

  quakeReducer(quake) {
    const timestamp = quake.properties.time;
    const datestring = moment(timestamp).format("MMMM Do, YYYY [at] HH:mm:SS");

    const customData = {
      magnitude: quake.properties.mag,
      location: quake.properties.place,
      when: datestring,
      time: timestamp,
      id: quake.id,
    };

    return customData;
  }
}

module.exports = QuakeApi;
