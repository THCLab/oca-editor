<template>
    <div>
        <div class="row">
            <div class="col-md-6">
                <label>Control type</label>
            </div>
            <div class="col-md-6">
                <input type="text" readonly class="form-control" :value="typeFirstUpper">
            </div>
        </div>

        <div class="row mt-2">
            <div class="col-md-12 boxes">
                <label>
                    <input type="checkbox" name="isRequired" v-model="control.required"> Required?
                </label>
                <label>
                    <input type="checkbox" name="isReadonly" v-model="control.readonly"> Readonly?
                </label>
            </div>
        </div>

        <div class="row">
            <div class="col-md-10">
                <label>Attribute name</label>
            </div>
            <div class="col-md-2">
                <label>PII</label>
            </div>
            <div class="col-md-10">
                <vue-bootstrap-typeahead
                  @hit="control.isPII = true"
                  v-model="control.attrName"
                  :data="default_bit"
                >
                    <template slot="suggestion" slot-scope="{ data, htmlText }">
                        PII:
                        <span v-html="htmlText"></span>
                        <small>{{ data.code }}</small>
                    </template>
                </vue-bootstrap-typeahead>
            </div>
            <div class="col-md-2">
                <input type="checkbox" name="isPII" v-model="control.isPII">
            </div>
        </div>
    </div>
</template>

<script>
    import VueBootstrapTypeahead from "vue-bootstrap-typeahead";

    export default {
        name: "BaseConfigComponent",
        components: { VueBootstrapTypeahead },
        props: {
            control: {
                type: Object
            },
        },
        data() {
          return {
            default_bit: [
              "first_name",
              "last_name",
              "mac_address",
              "name",
              "entity_name",
              "full_name",
              "address",
              "street",
              "city",
              "building_number",
              "email",
              "postal_code",
              "zip_code",
              "skype",
              "linkedin_profile_url",
              "facebook_profile_url",
              "passport_number",
              "social_security_number",
              "national_id",
              "national_insurance_number",
              "VIN",
              "IBAN",
              "credit_card",
              "debit_card",
              "PIN",
              "DID",
              "employee_identifier",
              "account_identifier",
              "membership_identifier",
              "institutional_identifier",
              "case_identifier",
              "user_identifier",
              "password",
              "signature",
              "digital_certificate",
              "photo",
              "video",
              "vocal_sound_bits",
              "birth_date",
              "transaction_date",
              "chromosomal",
              "DNA",
              "RNA",
              "voice_prints",
              "iris_scan",
              "facial_image",
              "ip",
              "SSID",
              "bluetooth_mac_address",
              "GPS_coordinates",
              "browser_fingerprint",
              "iot_identifier",
              "IMEI",
              "IMSI",
              "text"
            ]
          }
        },
        mounted() {
            $('[data-toggle="tooltip"]').tooltip(); // trigger tooltip
        },
        computed: {
            typeFirstUpper() {
                return this.control.type.charAt(0).toUpperCase() + this.control.type.slice(1);
            }
        }
    }
</script>

<style scoped>
    .boxes {
      display: flex;
      justify-content: space-between;
    }
</style>
