"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiManageWorkforceTimesheet = apiManageWorkforceTimesheet;
/*
 * Copyright (c) 2024 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const TimeSheetEntryApi_1 = require("./TimeSheetEntryApi");
const odata_v2_1 = require("@sap-cloud-sdk/odata-v2");
const BatchRequest_1 = require("./BatchRequest");
function apiManageWorkforceTimesheet(deSerializers = odata_v2_1.defaultDeSerializers) {
    return new ApiManageWorkforceTimesheet((0, odata_v2_1.mergeDefaultDeSerializersWith)(deSerializers));
}
class ApiManageWorkforceTimesheet {
    constructor(deSerializers) {
        this.apis = {};
        this.deSerializers = deSerializers;
    }
    initApi(key, entityApi) {
        if (!this.apis[key]) {
            this.apis[key] = entityApi._privateFactory(this.deSerializers);
        }
        return this.apis[key];
    }
    get timeSheetEntryApi() {
        return this.initApi('timeSheetEntryApi', TimeSheetEntryApi_1.TimeSheetEntryApi);
    }
    get batch() {
        return BatchRequest_1.batch;
    }
    get changeset() {
        return BatchRequest_1.changeset;
    }
}
//# sourceMappingURL=service.js.map