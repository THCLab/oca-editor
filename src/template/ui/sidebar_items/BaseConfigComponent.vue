<template>
    <div>
        <div class="row">
            <div class="col-md-6">
                <label>Control type</label>
            </div>
            <div class="col-md-6">
                <input type="text" readonly class="form-control" :value="typeFirstUpper">
            </div>
        </div>

        <div class="row mt-2">
            <div class="col-md-12 boxes">
                <label>
                    <input type="checkbox" name="isRequired" v-model="control.required"> Required?
                </label>
                <label>
                    <input type="checkbox" name="isReadonly" v-model="control.readonly"> Readonly?
                </label>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "BaseConfigComponent",
        props: {
            control: {
                type: Object
            },
        },
        mounted() {
            $('[data-toggle="tooltip"]').tooltip(); // trigger tooltip
        },
        computed: {
            typeFirstUpper() {
                return this.control.type.charAt(0).toUpperCase() + this.control.type.slice(1);
            }
        }
    }
</script>

<style scoped>
    .boxes {
      display: flex;
      justify-content: space-between;
    }
</style>
