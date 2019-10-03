<template>
    <div class="controlItemWrapper" :class="control.className" :data-control-name="control.name">
        <div class="controlItem row" :id="control.name" v-if="labelPosition === 'left'">
            <div class="col-md-4">
                <label> {{control.label}} </label>
                <span v-show="control.required"> *</span>
            </div>
            <div class="col-md-7 input-group">
                <input type="text" class="form-control"
                       :readonly="control.readonly"
                       :name="control.fieldName"
                       :value="demo_value">
            </div>
            <div class="col-md-1"><slot /></div>
        </div>
        <div class="controlItem row" :id="control.name" v-else>
            <div class="form-group col-md-12">
                <label> {{control.label}} </label>
                <span v-show="control.required"> *</span>
                <div class="input-group">
                    <input type="text" class="form-control"
                           :readonly="control.readonly"
                           :name="control.fieldName"
                           :value="demo_value">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "TextControl",
        props: ['control', 'labelPosition'],
        computed: {
            demo_value() {
                if (!_.isEmpty(this.control.defaultValue)) {
                    return this.control.defaultValue;
                }

                return "";
            }
        }
    }
</script>

<style scoped>

</style>
