<template>
    <div>
        <div class="row">
            <div class="col-md-12 text-right">
                <button class="btn btn-default" @click="addSection">
                    <font-awesome-icon icon="plus"/>
                    Add category
                </button>
                <button class="btn btn-default" @click="preview">
                    <font-awesome-icon icon="image"/>
                    Preview
                </button>
                <button class="btn btn-default" id='exportFormBtn' @click="download">
                    <font-awesome-icon icon="file-download"/>
                    Export
                </button>
            </div>
        </div>


        <div id="sectionWrapper">
          <div class="col-xs-12 mt-2 sectionItem" v-for="(section, i) in form.sections" :key="section.name" :id="section.name">
                <div class="card">
                  <div class="card-header">
                    <div class="row">
                      <div class="col-md-8">
                        <input type="text" class="form-control" placeholder="Category name" v-model="section.label">
                      </div>
                      <div class="col-md-4 text-right">
                        <span class="fa-2x clickable" @click="removeSection(i)"><font-awesome-icon icon="times"/></span>
                      </div>
                    </div>
                  </div>
                    <div class="card-body sectionBody">
                        <row-component :formUuid="form.uuid" :section="section" ></row-component>
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
            addSection() {
                const sectionInfo = _.cloneDeep(FORM_CONSTANTS.Section)
                sectionInfo.name = _.domUniqueID("section_")
                sectionInfo.clientKey = sectionInfo.name

                // b4hook
                let b4Run = Hooks.Section.beforeAdd.runSequence(sectionInfo);
                if (b4Run === false) {
                    return;
                }

                this.form.sections.push(sectionInfo)

                // after hook
                Hooks.Section.afterAdd.run(sectionInfo)
            },
            removeSection(index) {
                if (this.form.sections[index].row.controls.length > 0) {
                    SethPhatToaster.error("Can't remove this category because it's still have attributes inside.");
                    return;
                }

                var sectionInfo = this.form.sections[index];
                let beforeRun = Hooks.Section.beforeRemove.runSequence(sectionInfo);
                if (beforeRun === false) {
                    return;
                }

                this.form.sections.splice(index, 1);

                Hooks.Section.afterRemove.run(sectionInfo);
            },
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
