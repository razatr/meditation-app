const app = () => {
    const song = document.querySelector('.song')
    const play = document.querySelector('.play')
    const outline = document.querySelector('.moving-outline circle')
    const video = document.querySelector('.vid-container video')

    const sounds = document.querySelectorAll('.sound-picker button')

    const timeDisplay = document.querySelector('.time-display')
    const timeSelect = document.querySelectorAll('.time-select button')

    const outlineLength = outline.getTotalLength()

    let fakeDuration = 600

    outline.style.strokeDasharray = outlineLength
    outline.style.strokeDashoffset = outlineLength

    play.addEventListener('click', () => {
        checkPlaying(song)
    })

    sounds.forEach((element) => {
        element.addEventListener('click', function () {
            console.log(video.childNodes)
            video.src = this.getAttribute('data-video')
            song.src = this.getAttribute('data-sound')
            stopPlaying()
        })
    })

    timeSelect.forEach((element) => {
        element.addEventListener('click', function () {
            fakeDuration = this.getAttribute('data-time')
            timeDisplay.textContent = getTimeText(fakeDuration)
            stopPlaying()
        })
    })

    function stopPlaying() {
        song.currentTime = 0
        song.pause()
        video.pause()
        play.src = './svg/play.svg'
    }

    const checkPlaying = song => {
        if (song.paused) {
            song.play()
            video.play()
            play.src = './svg/pause.svg'
        }
        else {
            song.pause()
            video.pause()
            play.src = './svg/play.svg'
        }
    }

    function getTimeText(seconds) {
        return `${ Math.floor(seconds / 60) }:${ Math.floor(seconds % 60) < 10 ? '0' + Math.floor(seconds % 60) : Math.floor(seconds % 60) }`
    }

    song.ontimeupdate = () => {
        let currentTime = song.currentTime
        let elapsed = fakeDuration - currentTime

        outline.style.strokeDashoffset = outlineLength - (currentTime / fakeDuration) * outlineLength

        timeDisplay.textContent = getTimeText(elapsed)

        if (currentTime >= fakeDuration) {
            song.pause()
            video.pause()
            song.currentTime = 0
            play.src = './svg/play.svg'
        }
    }
}

app()