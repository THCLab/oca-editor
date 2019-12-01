<template>
    <div>
        <div class="controlSidebar list-group" v-show="!isConfig">
            <a href="#" class="list-group-item active">
                Supported Controls
            </a>
            <div id="sidebarControls">
                <a href="javascript:void(0)" class="list-group-item list-group-item-action control-wrapper"
                   :key="value"
                   v-for="(obj, value) in controls" :data-control-type="value">
                    <font-awesome-icon :icon="obj.icon"></font-awesome-icon> {{obj.label}}
                </a>
            </div>
        </div>
        <div class="settingSidebar card" v-if="isConfig">
            <div class="card-body">
                <div class="row mb-2">
                    <div class="col-md-6">
                        <h4>{{controlInfo.label}}</h4>
                    </div>
                    <div class="col-md-6 text-right">
                        <font-awesome-icon :icon="faTimes"
                          @click="closeEditSidebar" class="clickable fa-2x" />
                    </div>
                </div>

                <base-config-component :control="controlInfo"></base-config-component>

                <component v-if="configComponent != null"
                           :is="configComponent"
                           :control="controlInfo">
                </component>

                <base-style-component :control="controlInfo"></base-style-component>
            </div>
        </div>
    </div>
</template>

<script>
    import {CONTROL_TYPES} from "@/config/control_constant";
    import {eventBus, EventHandlerConstant} from '@/template/handler/event_handler';
    import {ControlHandler} from '@/template/handler/control_handler';
    import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
    import { faTimes } from '@fortawesome/free-solid-svg-icons'
    import {Hooks} from '@/template/components/hook_lists';
    import BaseConfigComponent from "./sidebar_items/BaseConfigComponent";
    import BaseStyleComponent from "./sidebar_items/BaseStyleComponent";

    export default {
        components: {BaseStyleComponent, BaseConfigComponent, FontAwesomeIcon},
        name: "sidebar-component",
        data: () => ({
            controls: CONTROL_TYPES,
            faTimes,
            isConfig: false,
            formUuid: null,
            controlInfo: null,
            configComponent: null
        }),
        watch: {
          controlInfo: {
            handler() {
              this.applyEditSidebar();
            },
            deep: true
          }
        },
        methods: {
            closeEditSidebar() {
                this.isConfig = false;
                this.formUuid = null;
                this.controlInfo = null;
                ControlHandler.clearSelect();
            },
            applyEditSidebar() {
                if (!this.controlInfo || this.controlInfo.name !== ControlHandler.getSelectedItem()) {
                    return;
                }

                // pre apply
                if (this.controlInfo.decimalPlace) {
                    this.controlInfo.decimalPlace = parseInt(this.controlInfo.decimalPlace);
                }

                // before hook here
                let b4Run = Hooks.Sidebar.beforeApplyConfig.runSequence(this.controlInfo);
                if (b4Run === false) {
                    return;
                }

                eventBus.$emit(
                    EventHandlerConstant.ON_APPLY_EDITOR_SIDEBAR,
                    { formUuid: this.formUuid,
                      control: this.controlInfo }
                );

                // after hook here
                Hooks.Sidebar.afterApplyConfig.run(this.controlInfo);
            }
        },
        created() {
            // catch event activate sidebar here
          eventBus.$on(EventHandlerConstant.ACTIVATE_EDITOR_SIDEBAR, ({ formUuid, controlInfo }) => {
                // before hook here
                let b4Run = Hooks.Sidebar.beforeOpenConfig.runSequence(controlInfo);
                if (b4Run === false) {
                    return;
                }

                // open config
                this.isConfig = true;
                this.formUuid = formUuid;
                this.controlInfo = controlInfo;
                this.configComponent = null;

                // retrieve config component
                if (_.accessStr(this.controls[controlInfo.type], 'source.config')){
                    this.configComponent = this.controls[controlInfo.type].source.config;
                }

                // after hook here
                Hooks.Sidebar.afterOpenConfig.run(this.controlInfo);
            });

            eventBus.$on(EventHandlerConstant.REMOVE_CONTROL, ({ controlInfo }) => {
                  if (this.controlInfo && this.controlInfo.name == controlInfo.name) {
                      this.isConfig = false;
                      this.controlInfo = null;
                  }
            });
        },
        mounted() {
            // insert controls
            $(".list-group-item", $("#sidebarControls")).draggable({
                appendTo: 'body',
                containment: '',
                scroll: false,
                helper: 'clone',
                revert: true,
                zIndex: 9999,
                cancel: ".list-group-item-success",
                start: function(event, ui){
                    $(ui.helper).css('width', `${ $(event.target).width() }px`);
                }
            });
        }
    }
</script>

<style lang="scss" scoped>
    .ui-draggable {
        &:hover {
            cursor: grab;
        }

        &-dragging:hover {
            cursor: move;
        }
    }
</style>
