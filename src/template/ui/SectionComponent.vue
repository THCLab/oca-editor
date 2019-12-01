<template>
    <div>
        <div class="row">
            <div class="col-md-12 text-right">
                <button class="btn btn-default" @click="preview">
                    <font-awesome-icon icon="image"/>
                    Preview
                </button>
                <button class="btn btn-default" @click="download">
                    <font-awesome-icon icon="file-download"/>
                    Export
                </button>
            </div>
        </div>

        <div id="sectionWrapper">
            <div class="col-xs-12 mt-2 sectionItem">
                <div class="card">
                    <div class="card-body sectionBody">
                        <row-component :formUuid="form.uuid" :section="form.section"></row-component>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
    import {FORM_CONSTANTS} from "@/config/constants";
    import RowComponent from "./RowComponent";
    import SectionConfigModal from "./common/SectionConfigModal";
    import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
    import {Hooks} from '@/template/components/hook_lists';

    export default {
        components: {RowComponent, FontAwesomeIcon},
        name: "section-component",
        props: {
            form: {
                type: Object
            }
        },
        methods: {
            traverseSection() {
                let self = this;

                // prepare data
                var items = $(this.$el).find("#sectionWrapper .sectionItem");
                var finalItems = [];

                // sort
                _.each(items, (item, index) => {
                    var id = $(item).attr('id');
                    var sectionItem = _.find(self.form.sections, {name: id});
                    sectionItem.order = index;
                    finalItems.push(sectionItem);
                });

                // reset the current sections
                this.form.sections = finalItems;
            },
            preview() {
                this.$parent.preview();
            },
            download() {
                this.$parent.download();
            }
        }
    }
</script>

<style scoped>
    .sectionBody {
        padding: 0;
    }

    .clickable {
        cursor: pointer;
    }

    .accordion .collapsed .fa-chevron-up,
    .accordion .fa-chevron-down {
        display: none;
    }

    .accordion .collapsed .fa-chevron-down,
    .accordion .fa-chevron-up {
        display: inline-block;
    }
    .ui-state-highlight {
        height: 2.5em;
        line-height: 1.2em;
        margin-top: .5em;
    }
</style>
