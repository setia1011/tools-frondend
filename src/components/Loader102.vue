<template>
    <content-loader style="border: 3px solid #dedede; padding: 10px;"
        viewBox="0 0 142 120"
        :speed="2"
        primaryColor="#dedede"
        secondaryColor="#ffffff" >
        <rect x="48" y="8" rx="3" ry="3" width="88" height="6" /> 
        <rect x="48" y="26" rx="3" ry="3" width="52" height="6" /> 
        <rect x="0" y="56" rx="3" ry="3" width="410" height="6" /> 
        <rect x="0" y="72" rx="3" ry="3" width="380" height="6" /> 
        <rect x="0" y="88" rx="3" ry="3" width="178" height="6" />
        <rect x="0" y="104" rx="3" ry="3" width="148" height="6" /> 
        <circle cx="20" cy="20" r="20" />
    </content-loader>
</template>

<script>
import { ContentLoader } from "vue-content-loader";

export default {
    name: 'Loader102',
    components: {
        ContentLoader
    }
}
</script>