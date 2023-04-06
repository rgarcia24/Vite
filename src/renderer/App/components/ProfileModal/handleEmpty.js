// this is pretty shit code, but it works

export const handleEmpty = (profile) => {
    let isEmpty = false;
    Object.keys(profile).forEach(key => {
        if (typeof profile[key] === 'object') {
            let obj = profile[key];
            Object.keys(obj).forEach(key => {
                if (obj[key] === "") {
                    if (key === "line2" || key === "line3") return
                    isEmpty = true;
                    return
                }
            })
        }

        if (profile[key] === "") {
            if (key === "size" || key === "profileGroup") return
            isEmpty = true;
            return

        }
    })
    if (isEmpty) return true

    return false
}