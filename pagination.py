import math

# Pagination function
def get_paginated_list(data, url, start, limit):

    # get the total count of the data
    count = len(data)

    # force numericalize start and limit
    start = int(start)
    limit = int(limit)

    # build json response
    obj = {}
    obj["start"] = start
    obj["limit"] = limit
    obj["count"] = count
    obj["pages"] = math.ceil(count / limit)

    # previous page url
    if start == 1:
        obj["previous"] = ""
    else:
        start_copy = max(1, start - limit)
        obj["previous"] = url + "?start=%d&limit=%d" % (start_copy, limit)

    # next page url
    if start + limit > count:
        obj["next"] = ""
    else:
        start_copy = start + limit
        obj["next"] = url + "?start=%d&limit=%d" % (start_copy, limit)

    # slice json data according to start and limit bound
    obj["data"] = data[(start - 1) : (start - 1 + limit)]
    return obj