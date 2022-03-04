import {Howl, Howler} from 'howler'

import button from '../assets/audio/button.mp3'
import bullet_1 from '../assets/audio/bullet_1.mp3'
import bullet_2 from '../assets/audio/bullet_2.mp3'
import bullet_3 from '../assets/audio/bullet_3.mp3'
import bullet_4 from '../assets/audio/bullet_4.mp3'
import bullet_5 from '../assets/audio/bullet_5.mp3'
import intro from '../assets/audio/intro.mp3'
import green_1 from '../assets/audio/green_light_1.mp3'
import green_2 from '../assets/audio/green_light_2.mp3'
import red_1 from '../assets/audio/red_light_1.mp3'
import red_2 from '../assets/audio/red_light_2.mp3'

export default class AudioController {
    constructor() {
        this.sounds = {}
    }

    init() {
        this.loadSounds()
    }

    loadSounds() {
        this.sounds = {
            button: new Howl({
                src: [button],
                volume: window.world.masterVolume
            }),
            bullet_1: new Howl({
                src: [bullet_1],
                volume: this.masterVolume,
            }),
            bullet_2: new Howl({
                src: [bullet_2],
                volume: this.masterVolume,
            }),
            bullet_3: new Howl({
                src: [bullet_3],
                volume: this.masterVolume,
            }),
            bullet_4: new Howl({
                src: [bullet_4],
                volume: this.masterVolume,
            }),
            bullet_5: new Howl({
                src: [bullet_5],
                volume: this.masterVolume,
            }),
            intro: new Howl({
                src: [intro],
                volume: this.masterVolume,
            }),
            green_1: new Howl({
                src: [green_1],
                volume: this.masterVolume,
            }),
            green_2: new Howl({
                src: [green_2],
                volume: this.masterVolume,
            }),
            red_1: new Howl({
                src: [red_1],
                volume: this.masterVolume,
            }),
            red_2: new Howl({
                src: [red_2],
                volume: this.masterVolume,
            }),
        }

    }

    playSound(soundName, delay=null) {
        const trueMasterVolume = window.world.masterVolume/100
        if (delay) {
            setTimeout(() => {
                const sound = this.sounds[soundName]
                const trueMasterVolume = window.world.masterVolume/100
                sound.volume(trueMasterVolume)
                sound.play()
            }, delay)
            return
        }
        const sound = this.sounds[soundName]
        sound.volume(trueMasterVolume)
        sound.play()
    }
}