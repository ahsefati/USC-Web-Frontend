const sqlCommands = [
    {
        "id": 0,
        "title": "Locate Within a Box",
        "description": "This one will locate all the trajectory data within a pre-defined rectangle-shaped box.",
        "endpoint": "/points/inaboxwithfilter",
        "variables": [
            {
                "varTitle": "Min. Latitude",
                "varCode": "min_lat"
            },
            {
                "varTitle": "Min. Longitude",
                "varCode": "min_lon"
            },
            {
                "varTitle": "Max. Latitude",
                "varCode": "max_lat"
            },
            {
                "varTitle": "Max. Longitude",
                "varCode": "max_lon"
            },
            {
                "varTitle": "Username",
                "varCode": "username"
            }
        ]
    }
]

export default sqlCommands