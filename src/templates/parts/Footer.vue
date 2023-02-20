<template>
    <footer class="footer mt-5">
        <div id="footer" class="container is-max-desktop p-32">
            <div class="content">
                <div class="columns is-mobile">
                    <div class="column is-half">
                        <p>by <a href="https://techack.id" class="has-text-info">TecHack</a></p>
                    </div>
                    <div class="column is-half">
                        <!-- <a class="is-pulled-right" href="https://bulma.io">
                        <img
                            src="../assets/images/made-with-bulma.png"
                            alt="Made with Bulma"
                            width="128"
                            height="24">
                        </a> -->
                    </div>
                </div>
            </div>
        </div>
    </footer>
</template>

<script>
export default {
    name: 'Footer',
    props: {
        msg: String
    }
}
</script>