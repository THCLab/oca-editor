<template>
    <div class="rowWrapper">
        <row-item :row="section.row"
                  :label-position="section.labelPosition">
        </row-item>
    </div>
</template>

<script>
    import RowItem from "./common/RowItem";
    import {Hooks} from '@/template/components/hook_lists';

    export default {
        components: {RowItem},
        name: "row-component",
        props: {
            section: {
                type: Object
            }
        },
        methods: {
            traverseRow() {
                let self = this;

                // prepare data
                var items = $(this.$el).find('.rowItem');
                var finalItems = [];

                // sort
                _.each(items, (item, index) => {
                    var id = $(item).attr('id');
                    var rowItem = _.find(self.section.row, {name: id});
                    finalItems.push(rowItem);
                });

                // reset the current sections
                this.section.row = finalItems;
            }
        },
        mounted() {
            let self = this;
            $(this.$el).sortable({
                cursor: "move",
                delay: 200,
                placeholder: "ui-state-highlight",
                update: function (event, ui) {
                    self.traverseRow();
                },
                start: function(e, ui){
                    ui.placeholder.height(ui.item.height());
                    ui.placeholder.css("border", "");
                    ui.placeholder.css("background-color", "#27ae60");
                }
            }).disableSelection();
        }
    }
</script>

<style scoped>
    .ui-state-highlight { height: 1.5em; line-height: 1.2em; }
</style>
