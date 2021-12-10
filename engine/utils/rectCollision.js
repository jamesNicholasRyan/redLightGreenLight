

export default function rectanglesCollide(rect1x, rect1y, rect1w, rect1h,
    rect2x, rect2y, rect2w, rect2h) {

    // if (rect1x < rect2x + rect2w &&
    //     rect1x + rect1w > rect2x &&
    //     rect1y < rect2y + rect2h &&
    //     rect1h + rect1y > rect2y)
    
    return rect1x < rect2x + rect2w &&
           rect1x + rect1w > rect2x &&
           rect1y < rect2y + rect2h &&
           rect1h + rect1y > rect2y
}