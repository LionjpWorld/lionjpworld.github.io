// Global options
Howler.autoUnlock = true;

// audio resource data
const audioResourceData = {};

// play audio by audio name
function playAudio(audioName, isLoop) {

  const audio = audioResourceData[audioName];

  audio.loop(isLoop);

  const audioId = audio.play();

  return audioId;
}

// stop audio by audio name
function stopAudio(audioName, audioId) {

  const audio = audioResourceData[audioName];

  if (audioId === -1) {

    return audio.stop();
  }

  audio.stop(audioId);
}

// set audio volume by audio name
function setAudioVolume(audioName, volume) {

  const audio = audioResourceData[audioName];

  if (volume > 1) {

    console.warn(`[WARNING] Audio max volume value is 1.0, Current set value is "${volume}" exceed the limit, Has been auto reset max volume value to 1.0.`)

    volume = 1;
  }

  if (volume < 0) {

    console.warn(`[WARNING] Audio min volume value is 0.0, Current set value is "${volume}" exceed the limit, Has been auto reset Min volume value to 0.0.`)

    volume = 0;
  }

  audio.volume(volume);
}

// set global mute
function muteAllAudio(isMute) {

  Howler.mute(isMute);
}

// set global volume
function setAllAudioVolume(volume) {

  if (volume > 1) {

    console.warn(`[WARNING] Audio max volume value is 1.0, Current set value is "${volume}" exceed the limit, Has been auto reset max volume value to 1.0.`)

    volume = 1;
  }

  if (volume < 0) {

    console.warn(`[WARNING] Audio min volume value is 0.0, Current set value is "${volume}" exceed the limit, Has been auto reset Min volume value to 0.0.`)

    volume = 0;
  }

  Howler.volume(volume)

}

// load audio resource
async function loadAudioResource(onComplete) {

  // get audio resource list request
  const getAudioResourceListRequest = function() {

    return new Promise((resolve, reject) => {

      const xhr = new XMLHttpRequest()

      xhr.open('GET', 'StreamingAssets/audio-resources.json', true);

      xhr.onload = () => {

        if (xhr.status >= 200 && xhr.status < 400) {
          console.log(JSON.parse(xhr.response))
          return resolve(JSON.parse(xhr.response));
        }

        return reject(new Error(`request ERROR! => ${xhr.status}`));
      }

      xhr.send();
    })
  }

  const audioResourceList = await getAudioResourceListRequest();

  // set audio resource data
  for(const audioResourceInfo of audioResourceList) {

    const { name, src } = audioResourceInfo;

    const audioResourceSettings = {
      src: [src],
    }

    audioResourceData[name] = new Howl(audioResourceSettings);
  }

  if (onComplete) {

    onComplete();
  }
}

// init audio manager
async function init(onComplete) {

  await loadAudioResource(onComplete)
}

// init audio manager callback
function initFinished() {
  console.log('Init finished')
  console.log(audioResourceData);
}

init(initFinished);


