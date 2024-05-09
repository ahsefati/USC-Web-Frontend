const sqlCommands = [
    {
        "id": 0,
        "title": "Use Pre-Defined Query",
        "description": "This one will locate all the trajectory data within pre-defined commands.",
        "endpoint": "/points/inaboxwithfilter",
        "variables": [
            {
                "varTitle": "Select a State",
                "varCode": "state_polygon",
                "type": "select_input"
            },
            { 
                "varTitle": "Latitude",
                "varCode": "lat",
                "type": "normal_minmax_input"
            },
            { 
                "varTitle": "Longitude",
                "varCode": "lon",
                "type": "normal_minmax_input"
            },
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
                "varTitle": "Speed Limit",
                "varCode": "point_speed",
                "type": "normal_minmax_input"
            },
            {
                "varTitle": "Username",
                "varCode": "username",
                "type": "normal_input"
            },
            // {
            //     "varTitle": "Points per User",
            //     "varCode": "points_user",
            //     "type": "minmax_normal_input"
            // }
        ]
    },
    {
        "id": 1,
        "title": "Define Your Query",
        "description": "This one will locate all the trajectory data using the sql command user defines.",
        "endpoint": "/points/customsql",
        "variables": [
            {
                "varTitle": "Your custom SQL",
                "varCode": "custom_sql",
                "type": "area_input"
            },
        ]
    }
]

export default sqlCommands