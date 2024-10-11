"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimeSheetEntry = void 0;
/*
 * Copyright (c) 2024 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const odata_v2_1 = require("@sap-cloud-sdk/odata-v2");
/**
 * This class represents the entity "TimeSheetEntryCollection" of service "API_MANAGE_WORKFORCE_TIMESHEET".
 */
class TimeSheetEntry extends odata_v2_1.Entity {
    constructor(_entityApi) {
        super(_entityApi);
    }
}
exports.TimeSheetEntry = TimeSheetEntry;
/**
 * Technical entity name for TimeSheetEntry.
 */
TimeSheetEntry._entityName = 'TimeSheetEntryCollection';
/**
 * Default url path for the according service.
 */
TimeSheetEntry._defaultBasePath = '/sap/opu/odata/sap/API_MANAGE_WORKFORCE_TIMESHEET';
/**
 * All key fields of the TimeSheetEntry entity.
 */
TimeSheetEntry._keys = [
    'PersonWorkAgreementExternalID',
    'CompanyCode',
    'TimeSheetRecord'
];
//# sourceMappingURL=TimeSheetEntry.js.map