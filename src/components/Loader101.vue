<template>
    <content-loader style="border: 3px solid #dedede; padding: 10px;"
        viewBox="0 0 142 120"
        :speed="2"
        primaryColor="#dedede"
        secondaryColor="#ffffff" >
        <rect x="0" y="0" rx="2" ry="2" width="50" height="50" />
        <rect x="55" y="0" width="50" height="6"  />
        <rect x="55" y="15" width="70" height="6"  />
        <rect x="55" y="30" width="400" height="6"  />
        <rect x="55" y="45" width="400" height="6"  />
        <rect x="0" y="60" width="450" height="6" />
        <rect x="0" y="75" width="450" height="6" />
        <rect x="0" y="90" width="280" height="6" />
        <rect x="0" y="105" width="100" height="6" />
    </content-loader>
</template>

<script>
import { ContentLoader } from "vue-content-loader";

export default {
    name: 'Loader101',
    components: {
        ContentLoader
    }
}
</script>