
export const getRandomInt = (min, max) => {
    min = Math.ceil(min)
    max = Math.floor(max)

    return Math.floor(Math.random() * (max - min)) + min
}

export const arrPicker = (arr, count = 1) => {
    const arrPicked = []
    let i = 0
    while(i < count) {
        const picked = arr[getRandomInt(0, arr.length)]
        let duplicate = false
        for (let j = 0; j < arrPicked.length; j++) {
            if(picked == arrPicked[j]) {
                duplicate = true
                break
            }
        }
        if(duplicate) {
            continue
        }
        arrPicked.push(picked)
        i++
    }
    return arrPicked
}