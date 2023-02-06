<template>
    <div id="main" class="container is-max-desktop p-32 mt-5">
        <h1 class="is-size-5 mb-5 has-text-weight-bold">Polaroid Generator</h1>
        <div class="columns">
            <div class="column is-two-fifths">
                <figure class="image mb-5">
                    <img class="thumbnail box p-1" style="box-shadow: none; border: 1px solid hsl(0deg 0% 88%);" v-bind:src="thumbnail" alt="">
                </figure>
                <div class="is-block">
                    <button v-if="original !== null" class="button is-inline-block is-info mr-1" v-on:click="downloadPolaroid"><i class="fa-solid fa-file-arrow-down"></i></button>
                    <button class="button is-inline-block is-danger" v-on:click="clearPolaroid"><i class="fa-regular fa-trash-can-arrow-up"></i></button>
                </div>
            </div>
            <div class="column">
                <div class="mb-2 tags">
                    <span class="tag is-dark">JPG</span>
                    <span class="tag is-warning">JPEG</span>
                    <span class="tag is-danger">PNG</span>
                </div>
                <div class="file has-name">
                    <label class="file-label">
                        <input class="file-input" type="file" ref="foto" @change="uploadFoto">
                        <span class="file-cta pr-1 pl-3">
                            <span class="file-icon">
                                <i class="fas fa-upload"></i>
                            </span>
                        </span>
                        <span class="file-name" style="min-width: 200px;"><span v-if="foto">{{ this.foto.name }}</span><span v-else>No file</span></span>
                    </label>
                </div>
                <input class="input mb-5 mt-4" type="text" v-model="caption" placeholder="Caption">
                <button class="button is-outlined is-success" v-on:click="generatePolaroid"><i class="fa-regular fa-file-import"></i> &nbsp;&nbsp;Generate</button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Polaroid",
        data() {
            return {
                show: false,
                caption: "",
                fotoUrl: null,
                foto: null,
                thumbnail: "https://bulma.io/images/placeholders/128x128.png",
                original: null,
                filename: null
            }
        },
        mounted() {
        },
        methods: {
            uploadFoto: function() {
                this.foto = this.$refs.foto.files[0];
                this.fotoUrl = URL.createObjectURL(this.foto);
            },
            generatePolaroid: function() {
                if (this.caption !== '' && this.foto) {
                    let loader = this.$loading.show({});
                    const formData = new FormData();
                    formData.append('file', this.foto);
                    formData.append('caption', this.caption);
                    const headers = { 'Content-Type': 'multipart/form-data' };
                    this.axios.post("http://127.0.0.1:8000/polaroid", formData, {headers}).then((res) => {
                        setTimeout(() => {
                            loader.hide();
                            this.thumbnail = res.data.thumbnail;
                            this.original = res.data.original;
                            this.filename = res.data.filename;
                        }, 1000)
                    })
                }
            },
            downloadPolaroid: function() {
                var a = document.createElement("a"); //Create <a>
                a.href = this.original; //Image Base64 Goes here
                a.download = this.filename; //File name Here
                a.click(); //Downloaded file
            },
            clearPolaroid: function() {
                this.caption = "";
                this.fotoUrl = null;
                this.foto = null;
                this.thumbnail = "https://bulma.io/images/placeholders/128x128.png";
                this.original = null;
                this.filename = null;
            }
        }
    }
</script>
  