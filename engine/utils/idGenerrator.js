// This file contains all logic for the custom id generator

export default class IdGenerator {
    constructor() {
        this.initialState = 1
    }

    generateId() {
        const newId = this.initialState
        this.initialState ++
        return newId
    }
}