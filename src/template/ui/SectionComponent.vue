<template>
    <div>
        <div class="row">
            <div class="col-md-12 text-right">
                <button class="btn btn-default" @click="preview">
                    <font-awesome-icon icon="image"/>
                    Preview
                </button>
            </div>
        </div>

        <div id="sectionWrapper">
            <div class="col-xs-12 mt-2 sectionItem">
                <div class="card">
                    <div class="card-body sectionBody">
                        <row-component :section="form.section"></row-component>
                        <p style="text-align: left; margin-top: 15px;">
                            <span class="pr-2 clickable" @click="addRow"><font-awesome-icon icon="plus"/> Add Row</span>
                        </p>
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
            addRow() {
                var rowInfo = _.cloneDeep(FORM_CONSTANTS.Row);

                // general row_name (id)
                rowInfo.name = _.domUniqueID(this.form.section.name + '_row_');

                // before hook
                let b4Run = Hooks.Row.beforeAdd.runSequence(rowInfo, this.form.section);
                if (b4Run === false) {
                    return;
                }

                this.form.section.rows.push(rowInfo);

                // after hook
                Hooks.Row.afterAdd.run(rowInfo, this.form.section);
            },
            preview() {
                this.$parent.preview();
            }
        },
        mounted() {
            let self = this;

            $("#sectionWrapper").sortable({
                cursor: "move",
                delay: 200,
                placeholder: "ui-state-highlight",
                update: function (event, ui) {
                    self.traverseSection();
                },
                start: function(e, ui){
                    ui.placeholder.height(ui.item.height());
                    ui.placeholder.css("border", "");
                    ui.placeholder.css("background-color", "#3498db");
                }
            }).disableSelection();
        }
    }
</script>

<style scoped>
    .sectionBody {
        /*padding: 30px 0;*/
        border-bottom: 1px solid rgba(0,0,0,.125);
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
