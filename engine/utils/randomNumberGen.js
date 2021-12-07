// Random number generator function

export default function randomNumGen(min, max) {
    return Math.random() * (max - min) + min
}
