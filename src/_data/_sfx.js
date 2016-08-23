//SONG
const battleBody = new Howl({
    src: ['https://s3-us-west-2.amazonaws.com/s.cdpn.io/163669/energetic-battle-body.mp3'],
    volume: 0.4,
    sprite: {
        trimmed: [0, 56195.102040816324006, true]
    }  
});

export const songEnergeticBattle = new Howl({
    src: ['https://s3-us-west-2.amazonaws.com/s.cdpn.io/163669/energetic-battle-intro.mp3'],
    volume: 0.4,
    sprite: {
        trimmed: [0, 5853, false]
    },
    onend: function() {
        battleBody.play('trimmed');
    }  
});

//SFXs
export const sfxBabum = new Howl({
    src: ['https://s3-us-west-2.amazonaws.com/s.cdpn.io/21542/baBuhm.mp3']
});

export const sfxTypeBlip = new Howl({
    src: ['https://s3-us-west-2.amazonaws.com/s.cdpn.io/21542/Blip-0.0_bip_3.1.wav'],
    volume: 1
});

export const sfxCursorMove = new Howl({
    src: ['https://s3-us-west-2.amazonaws.com/s.cdpn.io/21542/menu-move.mp3'],
    volume: 1
});

export const sfxSubmitAction = new Howl({
    src: ['https://s3-us-west-2.amazonaws.com/s.cdpn.io/21542/submit.mp3'],
    volume: 1
});

export const sfxIterate = new Howl({
    src: ['https://s3-us-west-2.amazonaws.com/s.cdpn.io/21542/iterator.mp3'],
    volume: 1
});


