<template>
    <div class="col-md-12 mb-2">
        <div class="formItem">
            <div class="title">
                <div class="row">
                    <div class="col-md-12">
                        {{section.label}}
                    </div>
                </div>
            </div>

            <div :id="section.name + '_gui_body'" class="collapseBody collapse show">
                <row-component :section="section" :key="section.name"></row-component>
            </div>
        </div>
    </div>
</template>

<script>
    import RowComponent from "@/gui/ui/RowComponent";
    import {Hooks} from '@/gui/components/hook_lists';

    export default {
        name: "SectionLayout",
        components: {RowComponent},
        props: ['section'],
        created() {
            // before hook
            Hooks.Section.beforeRegister.run(this.section);
        },
        mounted() {
            // after hook
            Hooks.Section.afterRegister.run(this.section);
        },

    }
</script>

<style scoped>
    .clickable {
        cursor: pointer;
    }

    .formItem .title {
        font-weight: bold;
        border-bottom: 1px solid #000;
    }
</style>
