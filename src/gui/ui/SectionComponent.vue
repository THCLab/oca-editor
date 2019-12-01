<template>
    <div class="row" v-if="form !== null">
        <div class="col-md-12 sectionItem">
            <section-layout :section="section" v-for="section in form.sections" :key="section" />
        </div>
    </div>
</template>

<script>
    import SectionLayout from "./SectionLayout";
    export default {
        name: "SectionComponent",
        components: {SectionLayout},
        props: {
            form: {
                type: Object
            }
        }
    }
</script>

<style scoped>

</style>
