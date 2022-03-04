// This file contains the logic to shake a specified stage

export default function cameraShake(world, stage, data) {
    // This method causes the canvas view to shake vigorously left to right AND up and down
    const stageName = stage
    if (world.shaking) {
        const negativeLimitX = 0-data.originalShakingLimitX
        const negativeLimitY = 0-data.originalShakingLimitY
        const strength = data.shakingStrength * world.ratio
        if (data.shakingDirectionX) {
            gameEngine[stageName].position.x += strength
        } else {
            gameEngine[stageName].position.x -= strength
        }
        if (data.shakingDirectionY) {
            gameEngine[stageName].position.y += strength
        } else {
            gameEngine[stageName].position.y -= strength
        }
        if ((gameEngine[stageName].position.x >= data.shakingLimitX) || (gameEngine[stageName].position.x <= negativeLimitX)) {
            data.shakingDirectionX = !data.shakingDirectionX
            data.shakingLimitX --
        }
        if ((gameEngine[stageName].position.y >= data.shakingLimitY) || (gameEngine[stageName].position.y <= negativeLimitY)) {
            data.shakingDirectionY = !data.shakingDirectionY
            data.shakingLimitY --
        }
    
        if (data.shakingLimitX <= 0) {
            world.shaking = false
            gameEngine[stageName].position.x = 0
            data.shakingLimitX = data.originalShakingLimitX
        }
        if (data.shakingLimitY <= 0) {
            world.shaking = false
            gameEngine[stageName].position.y = 0
            data.shakingLimitY = data.originalShakingLimitY
        }
    } else {
        gameEngine[stageName].position.x = 0
        gameEngine[stageName].position.y = 0
    }
}