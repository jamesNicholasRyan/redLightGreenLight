import { Howl, Howler } from 'howler'

import menuMusic from '../assets/audio/menu_music.mp3'

export default class MusicController {
    constructor() {
        this.music = {}
        this.currentMusic = null
    }

    init() {
        this.loadMusic()
    }

    loadMusic() {
        this.music = {
            menu: new Howl({
                src: [menuMusic],
                volume: window.world.masterVolume,
                loop: true,
            })
        }
    }

    playMusic(trackName) {
        if (this.currentMusic !== null) {
            this.currentMusic.stop()
            window.world.menuMusicActive = false
        }
        const trueMasterVolume = window.world.masterVolume/100
        this.currentMusic = this.music[trackName]
        this.currentMusic.volume(trueMasterVolume)
        this.currentMusic.play()
    }

    stopMusic() {
        this.currentMusic.stop()
    }

    adjustVolume(newVolume) {
        if (this.currentMusic !== null) {
            this.currentMusic.volume(newVolume/100)
        }
    }
}