"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimeSheetEntryApi = void 0;
/*
 * Copyright (c) 2024 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const TimeSheetEntry_1 = require("./TimeSheetEntry");
const TimeSheetEntryRequestBuilder_1 = require("./TimeSheetEntryRequestBuilder");
const TimeSheetDataFields_1 = require("./TimeSheetDataFields");
const odata_v2_1 = require("@sap-cloud-sdk/odata-v2");
class TimeSheetEntryApi {
    constructor(deSerializers = odata_v2_1.defaultDeSerializers) {
        this.entityConstructor = TimeSheetEntry_1.TimeSheetEntry;
        this.deSerializers = deSerializers;
    }
    /**
     * Do not use this method or the constructor directly.
     * Use the service function as described in the documentation to get an API instance.
     */
    static _privateFactory(deSerializers = odata_v2_1.defaultDeSerializers) {
        return new TimeSheetEntryApi(deSerializers);
    }
    _addNavigationProperties(linkedApis) {
        this.navigationPropertyFields = {};
        return this;
    }
    requestBuilder() {
        return new TimeSheetEntryRequestBuilder_1.TimeSheetEntryRequestBuilder(this);
    }
    entityBuilder() {
        return (0, odata_v2_1.entityBuilder)(this);
    }
    customField(fieldName, isNullable = false) {
        return new odata_v2_1.CustomField(fieldName, this.entityConstructor, this.deSerializers, isNullable);
    }
    get fieldBuilder() {
        if (!this._fieldBuilder) {
            this._fieldBuilder = new odata_v2_1.FieldBuilder(TimeSheetEntry_1.TimeSheetEntry, this.deSerializers);
        }
        return this._fieldBuilder;
    }
    get schema() {
        if (!this._schema) {
            const fieldBuilder = this.fieldBuilder;
            this._schema = {
                /**
                 * Static representation of the {@link timeSheetDataFields} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                TIME_SHEET_DATA_FIELDS: fieldBuilder.buildComplexTypeField('TimeSheetDataFields', TimeSheetDataFields_1.TimeSheetDataFieldsField, false),
                /**
                 * Static representation of the {@link personWorkAgreementExternalId} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                PERSON_WORK_AGREEMENT_EXTERNAL_ID: fieldBuilder.buildEdmTypeField('PersonWorkAgreementExternalID', 'Edm.String', false),
                /**
                 * Static representation of the {@link companyCode} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                COMPANY_CODE: fieldBuilder.buildEdmTypeField('CompanyCode', 'Edm.String', false),
                /**
                 * Static representation of the {@link timeSheetRecord} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                TIME_SHEET_RECORD: fieldBuilder.buildEdmTypeField('TimeSheetRecord', 'Edm.String', false),
                /**
                 * Static representation of the {@link personWorkAgreement} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                PERSON_WORK_AGREEMENT: fieldBuilder.buildEdmTypeField('PersonWorkAgreement', 'Edm.String', true),
                /**
                 * Static representation of the {@link timeSheetDate} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                TIME_SHEET_DATE: fieldBuilder.buildEdmTypeField('TimeSheetDate', 'Edm.DateTime', true),
                /**
                 * Static representation of the {@link timeSheetIsReleasedOnSave} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                TIME_SHEET_IS_RELEASED_ON_SAVE: fieldBuilder.buildEdmTypeField('TimeSheetIsReleasedOnSave', 'Edm.Boolean', true),
                /**
                 * Static representation of the {@link timeSheetPredecessorRecord} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                TIME_SHEET_PREDECESSOR_RECORD: fieldBuilder.buildEdmTypeField('TimeSheetPredecessorRecord', 'Edm.String', true),
                /**
                 * Static representation of the {@link timeSheetStatus} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                TIME_SHEET_STATUS: fieldBuilder.buildEdmTypeField('TimeSheetStatus', 'Edm.String', true),
                /**
                 * Static representation of the {@link timeSheetIsExecutedInTestRun} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                TIME_SHEET_IS_EXECUTED_IN_TEST_RUN: fieldBuilder.buildEdmTypeField('TimeSheetIsExecutedInTestRun', 'Edm.Boolean', true),
                /**
                 * Static representation of the {@link timeSheetOperation} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                TIME_SHEET_OPERATION: fieldBuilder.buildEdmTypeField('TimeSheetOperation', 'Edm.String', true),
                ...this.navigationPropertyFields,
                /**
                 *
                 * All fields selector.
                 */
                ALL_FIELDS: new odata_v2_1.AllFields('*', TimeSheetEntry_1.TimeSheetEntry)
            };
        }
        return this._schema;
    }
}
exports.TimeSheetEntryApi = TimeSheetEntryApi;
//# sourceMappingURL=TimeSheetEntryApi.js.map