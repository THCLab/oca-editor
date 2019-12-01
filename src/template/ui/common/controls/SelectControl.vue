<template>
    <div class="controlItemWrapper" :class="control.className" :data-control-name="control.name">
        <div class="controlItem row" :id="control.name" v-if="labelPosition === 'left'">
            <slot name="label"/>

            <div :class="inputClass" class="input-group">
                <select class="form-control" v-if="control.type == 'select'" :name="control.fieldName">
                  <option disabled selected>Options ({{control.dataOptions.length}})</option>
                    <option v-for="option in control.dataOptions">{{option.text}}</option>
                </select>
            </div>

            <slot name="options"/>
            <slot name="information"/>
        </div>
        <div class="controlItem row" :id="control.name" v-else>
            <div class="form-group col-md-12">
                <label> {{control.label}} </label>
                <span v-show="control.required"> *</span>
                <div class="input-group">
                    <select class="form-control" v-if="control.type == 'select'" :name="control.fieldName">
                        <option disabled selected>Options</option>
                        <option v-for="option in control.dataOptions">{{option.text}}</option>
                    </select>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    export default {
        name: "SelectControl",
        props: ['control', 'labelPosition', 'inputClass'],
    }
</script>

<style scoped>

</style>
