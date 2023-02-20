<template>
    <content-loader style="border: 3px solid #dedede; padding: 10px;"
        viewBox="0 0 142 120"
        :speed="2"
        primaryColor="#dedede"
        secondaryColor="#ffffff">
        <title>70 Basic icons by Xicons.co</title>
        <rect x="18" y="2" width="12" height="46" rx="2" ry="2" fill="#ec5044"></rect>
        <rect x="34" y="27.99" width="12" height="20.01" rx="2" ry="2" fill="#f6c253"></rect>
        <rect x="2" y="18" width="12" height="30" rx="2" ry="2" fill="#41c3f1"></rect>
        <rect x="60" y="0" width="100" height="4" />
        <rect x="60" y="12" width="120" height="4" />
        <rect x="60" y="24" width="300" height="4" />
        <rect x="60" y="38" width="300" height="4" />
        <rect x="60" y="50" width="300" height="4" />
        <rect x="0" y="62" width="360" height="4" />
        <rect x="0" y="74" width="360" height="4" />
        <rect x="0" y="86" width="120" height="4" />
    </content-loader>
</template>

<script>
import { ContentLoader } from "vue-content-loader";

export default {
    name: 'Loader100',
    components: {
        ContentLoader
    }
}
</script>