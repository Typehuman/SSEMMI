<script src="../../../services/orbitdb/index.js"></script>
<template>
    <div>
        <div id='mapContainer'></div>
        <div id='widget' v-if="isAuth">
            <h2>Sightings</h2>
            <div class='widget-row colors'></div>
            <div class='widget-row labels'>
                <div class='label'>0</div>
                <div class='label'>1</div>
                <div class='label'>2</div>
                <div class='label'>3</div>
                <div class='label'>4</div>
                <div class='label'>5+</div>
            </div>
            <br>
            <div class='slider-class' id='sliderbar'>
                <p>Sightings: <label id='active-date'>January 2020</label></p>
                <input id='month-slider' class='widget-row' type="range" min="1" max="12" step="1" value="0" />
                <!-- Year filter -->
                <label for="year-list">Choose a year: </label>
                <select id="year-list">
                    <option value="2020" selected>2020</option>
                    <option value="2021">2021</option>
                </select>
                <br />
                <!-- Last 14 days filter -->
                <input type="checkbox" id="last-fourteen-days-check" name="last-fourteen-days-check" value="Last 14 Days">
                <label for="last-fourteen-days-check">Show last 14 days</label><br>
            </div>
        </div>
    </div>
</template>

<script>
import mapboxgl from 'mapbox-gl';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat)


export default {
    name: 'Map',
    data() {
        return {
            mapboxKey: process.env.VUE_APP_MAPBOX_KEY,
            mapView: null,
            geoJSONSightings: []
        }
    },
    created() {
        // Fetch data from server upon instance creation
        this.loadSightings()
    },
    mounted() {
        // Mounted to continuously monitor for changes
        this.mapSightings()
    },
    updated() {
        // Mounted to continuously monitor for changes
        this.mapSightings()
    },
    methods: {
      mapSightings() {
            // Grab access token for Mapbox
            mapboxgl.accessToken = this.mapboxKey

            // Initialise mapbox container
            const map = new mapboxgl.Map({
                container: 'mapContainer',
                style: 'mapbox://styles/mapbox/light-v10',
                center: [-122.312490, 47.951812],
                zoom: 7.0
            });

            // Add navigation buttons on top right of the map
            const nav = new mapboxgl.NavigationControl()
            map.addControl(nav, "top-right")

            // Cache map
            this.mapView = map
            // Resize map to fit into screen width
            this.mapView.resize()

            // Initialise sightings data into geoJSON format
            let geoData = {
                "type": "FeatureCollection",
                "features": this.geoJSONSightings
            }

            // Initialise months value to match integer date value in sightings from source/db
            const months = [
                '',
                'January',
                'February',
                'March',
                'April',
                'May',
                'June',
                'July',
                'August',
                'September',
                'October',
                'November',
                'December'
            ]

            const isHome = (this.$route.path === '/home')
            // On load event
            map.on('load', function() {
              const today = new Date();

                // Initialise default value for year and month
                let selectedDay = today.getDate()
                let selectedYear = today.getFullYear()
                let selectedMonth = today.getMonth() + 1

              // Set the defaults
              // update text in the UI
              if (!isHome) {
                document.getElementById('active-date').innerText = selectedDay + " "+ months[selectedMonth] + " " + selectedYear
                document.getElementById('year-list').value = selectedYear
                document.getElementById('month-slider').value = selectedMonth
              }
              // Set layer to display sightings
                map.addLayer({
                    id: 'ssemmi-map-layer',
                    type: 'circle',
                    source: {
                        type: 'geojson',
                        data: geoData
                    },
                    paint: {
                        // Set size of circle pinpoint based on how large the sighting is
                        'circle-radius': [
                            'interpolate',
                            ['linear'],
                            ['to-number', ['get', 'no_sighted']],
                            0, 4,
                            5, 24
                        ],
                        // Set colour of circle pinpoint based of number of sightings
                        'circle-color': [
                            'interpolate',
                            ['linear'],
                            ['to-number', ['get', 'no_sighted']],
                            0, '#2DC4B2',
                            1, '#3BB3C3',
                            2, '#669EC4',
                            3, '#8B88B6',
                            4, '#A2719B',
                            5, '#AA5E79'
                        ],
                        'circle-opacity': 0.9
                        },
                    filter: [
                        'all',
                        ['==', ['to-number', ['get', 'day']], selectedDay],
                        ['==', ['to-number', ['get', 'month']], selectedMonth],
                        ['==', ['to-number', ['get', 'year']], selectedYear]
                    ]
                })

                // Action to change the sightings filter based on preference
                let changeSightingPreference = () => {
                    let preferenceFilter = [
                        'all',
                        ['==', ['to-number', ['get', 'month']], selectedMonth],
                        ['==', ['to-number', ['get', 'year']], selectedYear]
                    ]
                    // update the map
                    map.setFilter('ssemmi-map-layer', preferenceFilter)

                    // update text in the UI
                    document.getElementById('active-date').innerText = months[selectedMonth]+ " " +selectedYear
                }

                let showLastFourteen = () => {
                    // Get current day and last two weeks date as epoch
                    let currentDay = today.getTime()
                    let lastfourteen = new Date(dayjs().subtract(14, "day")).getTime()

                    // Filter for date range of current day and last fourteen days
                    let preferenceFilter = [
                        "all",     
                        ["<=", ['get', 'epoch_date'], currentDay],
                        [">=", ['get', 'epoch_date'], lastfourteen]
                    ]

                    // update the map
                    map.setFilter('ssemmi-map-layer', preferenceFilter)

                    // update text in the UI
                    document.getElementById('active-date').innerText = "Last 14 days"
                }

              if (!isHome) {
                // Filter to show data within the last 14 days from current date
                let lastFourteenCheckbox = document.getElementById('last-fourteen-days-check')
                lastFourteenCheckbox.addEventListener('change', (e) => {
                  try {
                    if (lastFourteenCheckbox.checked) {
                        // Show data from last fourteen days
                        showLastFourteen()
                    } else {
                        // Reset to current day filter
                        selectedDay = today.getDate()
                        selectedYear = today.getFullYear()
                        selectedMonth = today.getMonth() + 1
                        changeSightingPreference()
                    }
                  } catch (error) {
                    console.log(error)
                  }
                })

                // Listener function to monitor selected option for YEAR
                document.getElementById('year-list').addEventListener('change', (e) => {
                  try {
                    // Grab desired year
                    selectedYear = parseInt(e.target.value)
                    // update the map
                    changeSightingPreference()
                  } catch (error) {
                    console.log(error)
                  }
                })

                // Listener function to monitor selected option for MONTH
                document.getElementById('month-slider').addEventListener('input', (e) => {
                  try {
                    // Grab desired month
                    selectedMonth = parseInt(e.target.value)
                    // update the map
                    changeSightingPreference()
                  } catch (error) {
                    console.log(error)
                  }
                })
              }

            })

            // Click listener to display extra information upon clicking on a sightings point
            map.on('click', 'ssemmi-map-layer', function (e) {
                let coordinates = e.features[0].geometry.coordinates.slice();

                // Ensure that if the map is zoomed out such that multiple
                // copies of the feature are visible, the popup appears
                // over the copy being pointed to.
                while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                    coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
                }

                new mapboxgl.Popup()
                .setLngLat(coordinates)
                .setHTML(
                            '<div class="container">'
                                +'<h4><b>'+e.features[0].properties.entity+'</b></h4>'
                                +'<p><b>SSEMMI ID: </b>'+e.features[0].properties.ssemmi_id+'</p>'
                                +'<p><b>Created: </b>'+e.features[0].properties.created+'</p>'
                                +'<p><b>Date: </b>'+e.features[0].properties.month+'/'+ e.features[0].properties.year+'</p>'
                                +'<p><b>No Sighted: </b>'+e.features[0].properties.no_sighted+'</p>'
                                +'<p><b>Witness: </b>'+e.features[0].properties.witness+'</p>'
                                +'<p><b>Comments: </b> '+e.features[0].properties.comments+'</p>'
                                +'<p><b>Date Added: </b> '+e.features[0].properties.ssemmi_date_added+'</p>'
                            +'</div>'
                            +'</div>'
                        )
                .addTo(map);
            })
      },
      loadSightings() {
            // Call the method to retreive data
            this.$store.dispatch("get_sightings")
            .then( (currSights) => {
                Object.values(currSights).forEach( (value) => {
                    // Create new array instance of two numbers for mapbox marker coordinate
                    if(value) {
                        // Check if the fields for the sighting is valid or compatible
                        let filtered_long = (isNaN(value.longitude)) ? 1 : value.longitude
                        let filtered_lat = (isNaN(value.latitude)) ? 1 : value.latitude
                        let filtered_sightings = (isNaN(value.no_sighted)) ? 1 : value.no_sighted
                        let filtered_date = dayjs('2011-01-01 20:00:00')
                        let f_day = 1
                        let f_month = 1
                        let f_year = 2011
                        let f_epoch_date = new Date().getTime()

                        if(filtered_date.isValid()) {
                            filtered_date = dayjs(value.created.substr(0, 10).split(' ')[0], ['YYYY-MM-DD', 'MM/DD/YY'])
                            f_day = filtered_date.date()
                            f_month = filtered_date.month() + 1
                            f_year = filtered_date.year()
                            f_epoch_date = new Date(filtered_date).getTime()
                        }
                        
                        const sightingEntry = {
                            "type": "Feature",
                            "geometry": {
                                "type": "Point",
                                "coordinates": [filtered_long, filtered_lat]
                            },
                            "properties": {
                                "entity": value.data_source_entity,
                                "ssemmi_id": value.ssemmi_id,
                                "created": value.created,
                                "day": f_day,
                                "month": f_month,
                                "year": f_year,
                                "epoch_date": f_epoch_date,
                                "no_sighted": filtered_sightings,
                                "witness": value.data_source_witness,
                                "comments": value.data_source_comments,
                                "ssemmi_date_added": value.ssemmi_date_added,
                            }
                        }

                        this.geoJSONSightings.push(sightingEntry)
                    }
                })
            })
        }
    },
    computed: {
        isAuth() {
            return this.$store.state.isAuthenticated
        },
    }
}
</script>

<style>
#mapContainer {
    width: 100%;
    height: 100%;
    margin: 0 auto;
    position: relative;
}

#active-date {
    font-weight: bold;
}

#widget {
    position: fixed;
    width: 20%;
    top: 6vh;
    left: 1vh;
    margin: 10px;
    padding: 10px 20px;
    background-color: white;
    position: absolute;
}

.slider-class {
  margin-left: 5%;
  font-size: 1rem;
}

.widget-row {
  height: 12px;
  width: 100%;
}

.colors {
  background: linear-gradient(to right, #2dc4b2, #3bb3c3, #669ec4, #8b88b6, #a2719b, #aa5e79);
}

.label {
  width: 15%;
  display: inline-block;
  text-align: center;
}
</style>
