<template>
    <div>
        <div class="row checkBoxControl" v-if="labelPosition === 'left'">
            <slot name="label"/>

            <div class="col-md-8 text-center">
                <input type="checkbox"
                       :disabled="this.control.readonly"
                       :name="control.fieldName"
                       v-model="control.value" />
            </div>

            <slot name="information"/>
        </div>
        <div class="form-group" v-else>
            <label :for="control.name + '_gui_control'">
                {{control.label}}
            </label>
            <span v-show="control.required"> *</span>

            <div class="text-center">
                <input type="checkbox"
                       :disabled="this.control.readonly"
                       :name="control.fieldName"
                       v-model="control.value" />
            </div>
        </div>
    </div>
</template>

<script>
    import {Hooks} from '@/gui/components/hook_lists';

    export default {
        name: "CheckboxControl",
        props: ['control', 'labelPosition'],
        mounted() {
            if (this.control.isChecked) {
                this.control.value = true;
            }

            // after hook
            Hooks.Control.afterInit.run(this.control, $(this.$el).find("input"));
        }
    }
</script>

<style scoped>

</style>
