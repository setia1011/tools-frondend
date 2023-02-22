<template>
    <div id="main" class="container is-max-desktop p-32 mt-5">
        <page-header></page-header>
        <div class="columns is-multiline">
            <div class="column is-half-desktop">
                <input class="input" placeholder="" />
            </div>
            <div class="column is-full">
                <input class="input" placeholder="" />
            </div>
            <div class="column is-full">
                <textarea class="textarea" placeholder=""></textarea>
            </div>
            <div class="column">
                <button class="button is-primary">Kirim</button>
            </div>
        </div>
    </div>
</template>

<script>
import TextArea from '@/components/TextArea.vue';
import Input from '@/components/Input.vue';

export default {
    name: 'pustaka-admin',
    components: {
        TextArea,
        Input
    }
}
</script>