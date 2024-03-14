const sqlCommands = [
    {
        "id": 0,
        "title": "Locate Within a Box",
        "description": "This one will locate all the trajectory data within a pre-defined rectangle-shaped box.",
        "endpoint": "/points/inaboxwithfilter",
        "variables": [
            {
                "varTitle": "Min. Latitude",
                "varCode": "min_lat",
                "type": "normal_input"
            },
            {
                "varTitle": "Min. Longitude",
                "varCode": "min_lon",
                "type": "normal_input"
            },
            {
                "varTitle": "Max. Latitude",
                "varCode": "max_lat",
                "type": "normal_input"
            },
            {
                "varTitle": "Max. Longitude",
                "varCode": "max_lon",
                "type": "normal_input"
            },
            {
                "varTitle": "Username",
                "varCode": "username",
                "type": "normal_input"
            }
        ]
    },
    {
        "id": 1,
        "title": "Locate Within a Time Range",
        "description": "This one will locate all the trajectory data within a pre-defined range of time.",
        "endpoint": "/points/inatimerangewithfilter",
        "variables": [
            {
                "varTitle": "Start of Time",
                "varCode": "start_time",
                "type": "datetime_input"
            },
            {
                "varTitle": "End of Time",
                "varCode": "end_time",
                "type": "datetime_input"
            },
            {
                "varTitle": "Username",
                "varCode": "username",
                "type": "normal_input"
            }
        ]
    }
]

export default sqlCommands