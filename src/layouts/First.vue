<template>
    <Header />
        <slot />
    <Footer />
</template>

<script>

import Header from '@/layouts/parts/Header.vue'
import Footer from '@/layouts/parts/Footer.vue'

export default {
    name: "First",
    components: {
        Header,
        Footer
    },
}
</script>