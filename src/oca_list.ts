import type { OCA } from 'oca.js'
import { createOCA } from 'oca.js-form-core'

export const ocaList: {
  [name: string]: OCA
} = {
  test: createOCA(),
  plain: {
    capture_base: {
      type: 'capture_base',
      classification: '',
      attributes: {
        name: 'Text',
        last_name: 'Text'
      },
      pii: ['last_name']
    },
    overlays: [
      {
        type: '/character_encoding/',
        capture_base: 'sai',
        default_character_encoding: 'utf-8',
        attr_character_encoding: {}
      }
    ]
  },
  onboarding: JSON.parse(
    '{"capture_base":{"attributes":{"countryOfRegistration":"Text","emailAddress":"Text","familyName":"Text","givenName":"Text","legalEntity":"Text","legalEntityNumber":"Text","legalEntityType":"Text","programmeType":"Text","projectJurisdiction":"Text","projectName":"Text"},"classification":"","pii":["givenName","familyName","emailAddress"],"type":"spec/capture_base/1.0"},"overlays":[{"attr_character_encoding":{"countryOfRegistration":"utf-8","emailAddress":"utf-8","familyName":"utf-8","givenName":"utf-8","legalEntity":"utf-8","legalEntityNumber":"utf-8","legalEntityType":"utf-8","programmeType":"utf-8","projectJurisdiction":"utf-8","projectName":"utf-8"},"capture_base":"EU7sxZPIXXSN4E3COb9-LzP-KQhBpODFGZiQWFRt8124","default_character_encoding":"utf-8","type":"spec/overalys/character_encoding/1.0"},{"attr_categories":["_cat-1_"],"attr_labels":{"countryOfRegistration":"选择注册国家 : *","emailAddress":"电邮位置 : *","familyName":"姓 : *","givenName":"名字 : *","legalEntity":"法人实体 : *","legalEntityNumber":"法人机构编号/编号 : *","legalEntityType":"选择法人机构识别编码类型 : *","programmeType":"选择程序类型 : *","projectJurisdiction":"选择司法管辖区 : *","projectName":"项目名 : *"},"capture_base":"EU7sxZPIXXSN4E3COb9-LzP-KQhBpODFGZiQWFRt8124","cat_attributes":{"_cat-1_":["projectName","projectJurisdiction","legalEntity","legalEntityType","legalEntityNumber","countryOfRegistration","givenName","familyName","emailAddress","programmeType"]},"cat_labels":{"_cat-1_":"Category 1"},"language":"zh","type":"spec/overalys/label/1.0"},{"attr_categories":["_cat-1_"],"attr_labels":{"countryOfRegistration":"Select Country of Registration : *","emailAddress":"Email Address : *","familyName":"Last Name : *","givenName":"First Name : *","legalEntity":"Legal Entity : *","legalEntityNumber":"Legal Entity Identifier/Number : *","legalEntityType":"Select Legal Entity Identifier Type : *","programmeType":"Select Programme Type : *","projectJurisdiction":"Select Jurisdiction : *","projectName":"Project Name : *"},"capture_base":"EU7sxZPIXXSN4E3COb9-LzP-KQhBpODFGZiQWFRt8124","cat_attributes":{"_cat-1_":["projectName","projectJurisdiction","legalEntity","legalEntityType","legalEntityNumber","countryOfRegistration","givenName","familyName","emailAddress","programmeType"]},"cat_labels":{"_cat-1_":"Category 1"},"language":"en","type":"spec/overalys/label/1.0"},{"attr_formats":{"countryOfRegistration":"ISO 3166-2","projectJurisdiction":"ISO 3166-2"},"capture_base":"EU7sxZPIXXSN4E3COb9-LzP-KQhBpODFGZiQWFRt8124","type":"spec/overalys/format/1.0"},{"attr_entry_codes":{"legalEntityType":["CRN","DUNS","GLN","LEI"],"programmeType":["HP","SCP","SHAP"]},"capture_base":"EU7sxZPIXXSN4E3COb9-LzP-KQhBpODFGZiQWFRt8124","type":"spec/overalys/entry_code/1.0"},{"attr_entries":{"legalEntityType":{"CRN":"Company Registration Number","DUNS":"Data Universal Numbering System (D-U-N-S®)","GLN":"Global Location Number (GLN)","LEI":"Legal Entity Identifier(LEI)"},"programmeType":{"HP":"3 - Harmonisation","SCP":"2 - Supply Chain","SHAP":"1 - Social & Humanitarian Application"}},"capture_base":"EU7sxZPIXXSN4E3COb9-LzP-KQhBpODFGZiQWFRt8124","language":"en","type":"spec/overalys/entry/1.0"},{"attr_entries":{"legalEntityType":{"CRN":"公司注册号码","DUNS":"数据通用编号系统 (D-U-N-S®)","GLN":"全球位置编号 (GLN)","LEI":"法律实体标识符 (LEI)"},"programmeType":{"HP":"3 - 协调","SCP":"2 - 供应链","SHAP":"1 - 社会和人道主义应用"}},"capture_base":"EU7sxZPIXXSN4E3COb9-LzP-KQhBpODFGZiQWFRt8124","language":"zh","type":"spec/overalys/entry/1.0"},{"capture_base":"EU7sxZPIXXSN4E3COb9-LzP-KQhBpODFGZiQWFRt8124","description":"A form to be used for HCF project onboarding","language":"en","name":"HCF Project Onboarding Form","type":"spec/overalys/meta/1.0"},{"capture_base":"EU7sxZPIXXSN4E3COb9-LzP-KQhBpODFGZiQWFRt8124","description":"用于 HCF 项目入职的表格","language":"zh","name":"HCF 项目入职表格","type":"spec/overalys/meta/1.0"}]}'
  ) as OCA
}
