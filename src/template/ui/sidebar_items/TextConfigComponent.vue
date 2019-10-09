<template>
    <div class="row mt-2">
        <div class="col-md-4">
            <label>Encoding</label>
        </div>
        <div class="col-md-8">
            <select2-control :options="encodingOptions" v-model="control.encoding"></select2-control>
        </div>
    </div>
</template>

<script>
    import Select2Control from "@/third_party_controls/Select2Control";
    import {CONTROL_CONSTANTS} from "@/config/constants";

    export default {
        name: "TextConfigComponent",
        components: {Select2Control},
        props: {
            control: {
                type: Object
            },
        },
        data: () => ({
            encodingOptions: [],
        }),
        created() {
            this.encodingOptions = _.map(CONTROL_CONSTANTS.Encoding, (value, key) => {
                return key;
            });
        }
    }
</script>

<style scoped>

</style>
