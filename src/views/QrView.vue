<template>
    <div id="main" class="container is-max-desktop p-32 mt-5">
        <page-header></page-header>
        <h1 class="is-size-5 mb-5 has-text-weight-bold">QR Code Generator</h1>
        <div class="field has-addons">
            <p class="control">
                <input class="input" v-model="text" style="width: 400px;" type="text" placeholder="Text to generate">
            </p>
            <p class="control">
                <button class="button is-success" v-on:click="generateQrCode"><i class="fa-regular fa-file-import"></i></button>
            </p>
        </div>
        <div v-if="show" class="mt-5" ref="container">
            <img class="image box is-inline-block mb-4" style="box-shadow: none; border: 1px solid hsl(0deg 0% 88%);" v-bind:src="qrcode" alt="">
            <div class="is-block">
                <button class="button is-inline-block is-info mr-1" v-on:click="downloadQrCode"><i class="fa-solid fa-file-arrow-down"></i></button>
                <button class="button is-inline-block is-danger" v-on:click="clearQrCode"><i class="fa-regular fa-trash-can-arrow-up"></i></button>
            </div>
            
        </div>
    </div>
</template>

<script>
    export default {
        name: "qrcode",
        data() {
            return {
                show: false,
                text: "",
                qrcode: null
            }
        },
        mounted() {
        },
        methods: {
            generateQrCode: function() {
                if (this.text) {
                    let loader = this.$loading.show({});
                    this.axios.post("http://127.0.0.1:8000/qr", {
                        text: this.text
                    }).then((res) => {
                        if (res.data.qrcode !== '') {
                            setTimeout(() => {
                                loader.hide();
                                this.qrcode = res.data.qrcode;
                                this.show = true;
                            }, 1000)
                        } else {
                            this.show = false;
                            setTimeout(() => {
                                loader.hide()
                            }, 1000)
                        }
                    })
                } else {
                    this.clearQrCode();
                }
            },
            clearQrCode: function() {
                this.text = "";
                this.qrcode = null;
                this.show = false;
            },
            downloadQrCode: function() {
                var a = document.createElement("a"); //Create <a>
                a.href = this.qrcode; //Image Base64 Goes here
                a.download = "qrcode.png"; //File name Here
                a.click(); //Downloaded file
            }
        }
    }
</script>
  