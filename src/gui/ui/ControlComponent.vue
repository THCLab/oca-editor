<template>
    <div class="controlItem form-group" :class="control.className">
        <component :is="controlInstance" :control="control" :label-position="labelPosition">
            <template v-slot:label>
                <div class="col-md-4">
                    <label> {{ control.label }} </label>
                    <span v-show="control.required">*</span>
                </div>
            </template>

            <template v-slot:information>
                <div class="col-md-1" />
                <div class="col-md-11 information">
                  {{ control.information }}
                </div>
            </template>
        </component>
    </div>
</template>

<script>
    import {Hooks} from '@/gui/components/hook_lists';
    import {CONTROL_TYPES} from "@/config/control_constant";

    export default {
        name: "ControlComponent",
        props: ['control', 'labelPosition'],
        data: () => ({
            controlInstance: null,
        }),
        created() {
            if (!CONTROL_TYPES[this.control.type]) {
                console.error(`Control type ${this.control.type} doesn't exist to render.`);
                return;
            }

            Hooks.Control.beforeRegister.run(this.control);

            // set control
            this.controlInstance = CONTROL_TYPES[this.control.type].source.gui;
        },
        mounted() {
            Hooks.Control.afterRegister.run(this.control);
        }
    }
</script>

<style scoped>
    .information {
      text-align: justify;
      font-style: italic;
      color: #6a6a6a;
    }
</style>
