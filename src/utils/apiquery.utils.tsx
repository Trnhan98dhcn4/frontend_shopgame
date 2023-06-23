export function jsonToQueryParams(json: any) {
    const params = new URLSearchParams()

    for (let key in json) {
        if (json.hasOwnProperty(key)) {
            params.append(key, json[key])
        }
    }

    return params.toString()
}
