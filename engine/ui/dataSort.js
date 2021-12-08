// This file contains algorithms that sort the game data in various ways

import * as PIXI from 'pixi.js'


export default function sort(data, sortBy, secondParam, value) {
    // This algorithm sorts based on the input parameter sortBy,
    // then additionally places objects at start of array based on second parameter
    console.log('SORTING')
    data.sort((a, b) => {
        const globalPosA = a.toGlobal(new PIXI.Point(0,0))
        const globalPosB = a.toGlobal(new PIXI.Point(0,0))

        return globalPosA.y - globalPosB.y
    })
    let finalData = []
    if (secondParam) {
        // console.log('SORTING DEAD')
        data.forEach((object) => {
            if (object[secondParam] === value) {
                finalData.unshift(object)
            } else {
                finalData.push(object)
            }
        })
    } else {
        finalData = data
    }
    // return finalData
}