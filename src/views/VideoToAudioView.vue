<template>
    <div id="main" class="container is-max-desktop p-32 mt-5">
        <h1 class="is-size-5 mb-5 has-text-weight-bold">Video to Audio (WAV) + Subtitle</h1>
        <div class="columns">
            <div class="column">
                <!-- <div class="mb-2 tags">
                    <span class="tag is-dark">MP4</span>
                    <span class="tag is-warning">TS</span>
                    <span class="tag is-danger">MOV</span>
                </div> -->
                <div class="file has-name">
                    <label class="file-label">
                        <input class="file-input" type="file" ref="videofile" @change="uploadFile">
                        <span class="file-cta pr-1 pl-3">
                            <span class="file-icon">
                                <i class="fas fa-upload"></i>
                            </span>
                        </span>
                        <span class="file-name"><span v-if="file">{{ this.file.name }}</span><span v-else>No file</span></span>
                    </label>
                </div>
                <div class="mt-4 mb-5">
                    <button :disabled="!file" class="button is-small is-outlined mr-2 is-info pl-3 pr-3" v-on:click="uploadVideo">
                        <i class="fa-sharp fa-solid fa-file-video"></i> &nbsp;&nbsp; Load Video
                    </button>
                    <button :disabled="!videoname" class="button is-small is-outlined mb-2 mr-2 is-success pl-3 pr-3" v-on:click="video2audio">
                        <i class="fa-regular fa-file-audio"></i> &nbsp;&nbsp;To Audio
                    </button>
                    <button :disabled="!audioname" class="button is-small is-outlined mb-2 mr-2 is-danger pl-3 pr-3" v-on:click="transcribeAudio">
                        <i class="fa-solid fa-text-size"></i> &nbsp;&nbsp;Transcribe
                    </button>
                    <button :disabled="!file" class="button is-small is-outlined pl-3 pr-3" v-on:click="clearForm">
                        <i class="fa-solid fa-broom"></i> &nbsp;&nbsp;Clear Form
                    </button>
                </div>
            </div>
        </div>
        <div class="columns">
            <div class="column is-one-third">
                <div class="mb-4 has-text-weight-semibold">Video</div>
                <div v-if="!video" class="has-text-grey is-relative" ref="l1">No video..</div>
                <div v-if="video">
                    <vue-plyr ref="vplyr">
                        <video ref="video" controls crossorigin playsinline>
                            <source 
                                :src="video" 
                                :type="videomime"/>
                        </video>
                    </vue-plyr>
                </div>
                <div class="mb-4 mt-5 has-text-weight-semibold">Audio (WAV)</div>
                <div v-if="!audio" class="has-text-grey is-relative" ref="l2">No audio..</div>
                <div v-if="audio">
                    <vue-plyr>
                        <audio controls crossorigin playsinline>
                            <source
                                :src="audio"
                                :type="audiomime"
                            />
                        </audio>
                    </vue-plyr>
                </div>
                <button v-if="audio" :disabled="!audio" class="button is-small is-success is-outlined mr-2 mt-5 pl-3 pr-3" v-on:click="downloadAudio">
                    <i class="fa-solid fa-file-arrow-down"></i> &nbsp;&nbsp;Audio (WAV)
                </button>
            </div>
            <div class="column">
                <div class="mb-4 has-text-weight-semibold">Transcript</div>
                <div v-if="!transcript" class="has-text-grey is-relative" ref="l3">No transcript..</div>
                <textarea v-if="transcript" v-model="transcript" class="textarea" style="width: 100%"></textarea>

                <button v-if="transcript" :disabled="!transcript" class="button is-small is-outlined mr-2 mt-5 pl-3 pr-3" v-on:click="downloadTranscript">
                    <i class="fa-solid fa-file-arrow-down"></i> &nbsp;&nbsp;Transcript (TXT)
                </button>
                <button v-if="transcript" :disabled="!subtitle" class="button is-small is-danger is-outlined mr-2 mt-5 pl-3 pr-3" v-on:click="downloadSub">
                    <i class="fa-solid fa-file-arrow-down"></i> &nbsp;&nbsp;Subtitle (SRT)
                </button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "VideoToAudio",
        data() {
            return {
                show: false,
                file: null,
                poster: "../assets/images/no-image.png",
                videomime: null,
                video: null,
                videoname: null,
                audiomime: null,
                audio: null,
                audioname: null,
                transcript: null,
                subtitle: null
            }
        },
        mounted() {
            
        },
        methods: {
            uploadFile: function() {
                this.file = this.$refs.videofile.files[0];
            },
            uploadVideo: function() {
                if (this.file) {
                    this.$refs.l1.innerText = '';
                    let loader = this.$loading.show({
                        container: this.$refs.l1,
                        height: 25,
                        width: 25,
                        opacity: 1,
                        loader: 'spinner',
                        color: '#FFBD33',
                        backgroundColor: 'transparent',
                    });
                    const formData = new FormData();
                    formData.append('file', this.file);
                    const headers = { 'Content-Type': 'multipart/form-data' };
                    this.axios.post("http://127.0.0.1:8000/upload-video", formData, {headers}).then((res) => {
                        setTimeout(() => {
                            loader.hide();
                            this.video = "http://localhost:8000/file/video?f="+res.data.video;
                            this.videoname = res.data.video;
                            this.videomime = res.data.mime;
                            // this.$refs.video.poster = '';
                            // document.querySelector("video").load();
                        }, 1000)
                    })
                }
            },
            video2audio: function() {
                this.$refs.l2.innerText = '';
                let loader = this.$loading.show({
                    container: this.$refs.l2,
                    height: 25,
                    width: 25,
                    opacity: 1,
                    loader: 'spinner',
                    color: '#6EAD8C',
                    backgroundColor: 'transparent',
                });
                const formData = new FormData();
                formData.append('video', this.videoname);
                const headers = { 'Content-Type': 'multipart/form-data' };
                this.axios.post("http://127.0.0.1:8000/video-to-audio-wav", formData, {headers}).then((res) => {
                    setTimeout(() => {
                        loader.hide();
                        this.audio = "http://localhost:8000/file/audio?f="+res.data.audio;
                        this.audioname = res.data.audio;
                        this.audioomime = res.data.mime;
                        // document.querySelector("audio").load();
                    }, 1000)
                })
            },
            transcribeAudio: function() {
                this.$refs.l3.innerText = '';
                let loader = this.$loading.show({
                    container: this.$refs.l3,
                    height: 25,
                    width: 25,
                    opacity: 1,
                    loader: 'spinner',
                    color: '#6EAD8C',
                    backgroundColor: 'transparent',
                });
                const formData = new FormData();
                formData.append('audio', this.audioname);
                const headers = { 'Content-Type': 'multipart/form-data' };
                this.axios.post("http://127.0.0.1:8000/transcribe", formData, {headers}).then((res) => {
                    setTimeout(() => {
                        loader.hide();
                        this.transcript = res.data.transcript;
                        this.subtitle = res.data.subtitle;
                    }, 1000)
                })
            },
            downloadSub: function() {
                var a = document.createElement("a"); //Create <a>
                a.href = "http://127.0.0.1:8000/file/subtitle?f=" + this.subtitle; //Image Base64 Goes here
                a.download = this.subtitle; //File name Here
                a.click(); //Downloaded file
            },
            downloadAudio: function() {
                var a = document.createElement("a"); //Create <a>
                a.href = "http://127.0.0.1:8000/file/audio?f=" + this.audioname; //Image Base64 Goes here
                a.download = this.audioname; //File name Here
                a.click(); //Downloaded file
            },
            downloadTranscript: function() {
                var a = document.createElement("a");
                a.href = 'data:text/plain;charset=utf-8,' + encodeURIComponent(this.transcript);
                a.download = this.audioname.split(".")[0] + '.txt';
                a.click();
            },
            clearForm: function() {
                this.file = null;
                this.poster = "../assets/images/no-image.png";
                this.videomime = null;
                this.video = null;
                this.videoname = null;
                this.audiomime = null;
                this.audio = null;
                this.audioname = null;
                this.transcript = null;
                this.subtitle = null;
                // this.$refs.vplyr.player = null;
            }
        }
    }
</script>

<style>
    .vl-overlay.vl-active {
        display: contents;
    }
    .plyr--video {
        height: auto !important;
    }
    .plyr--audio {
        height: auto !important;
    }
    .plyr__controls {
        padding: 2px !important;
    }
</style>
  