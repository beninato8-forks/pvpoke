const percentToWeight = (percent) => {
    percent = percent / 10
    return Math.ceil(2 * percent) + 1
}

const silphToPvPoke = (name) => {
    name = name.replace("-", "_")
    name = name.replace(/alola$/, "alolan")
    return name
}

const main = async (cup) => {
    const r = await fetch(`https://silph.gg/api/cup/${cup}/stats`)
    .then(response => response.json())
    .then(data => {
        const result = {}
        for (const [key, value] of Object.entries(data.all)) {
            let name = silphToPvPoke(key)
            result[name] = percentToWeight(value.percent)
        }
        return result
    })
    .catch((err) => {
        console.log(`Error fetching: ${err}`)
        return {}
    })
    console.log(r)
}

main('ionic')