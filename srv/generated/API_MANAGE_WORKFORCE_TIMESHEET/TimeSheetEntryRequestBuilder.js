"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimeSheetEntryRequestBuilder = void 0;
/*
 * Copyright (c) 2024 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const odata_v2_1 = require("@sap-cloud-sdk/odata-v2");
/**
 * Request builder class for operations supported on the {@link TimeSheetEntry} entity.
 */
class TimeSheetEntryRequestBuilder extends odata_v2_1.RequestBuilder {
    /**
     * Returns a request builder for querying all `TimeSheetEntry` entities.
     * @returns A request builder for creating requests to retrieve all `TimeSheetEntry` entities.
     */
    getAll() {
        return new odata_v2_1.GetAllRequestBuilder(this.entityApi);
    }
    /**
     * Returns a request builder for creating a `TimeSheetEntry` entity.
     * @param entity The entity to be created
     * @returns A request builder for creating requests that create an entity of type `TimeSheetEntry`.
     */
    create(entity) {
        return new odata_v2_1.CreateRequestBuilder(this.entityApi, entity);
    }
    /**
     * Returns a request builder for retrieving one `TimeSheetEntry` entity based on its keys.
     * @param personWorkAgreementExternalId Key property. See {@link TimeSheetEntry.personWorkAgreementExternalId}.
     * @param companyCode Key property. See {@link TimeSheetEntry.companyCode}.
     * @param timeSheetRecord Key property. See {@link TimeSheetEntry.timeSheetRecord}.
     * @returns A request builder for creating requests to retrieve one `TimeSheetEntry` entity based on its keys.
     */
    getByKey(personWorkAgreementExternalId, companyCode, timeSheetRecord) {
        return new odata_v2_1.GetByKeyRequestBuilder(this.entityApi, {
            PersonWorkAgreementExternalID: personWorkAgreementExternalId,
            CompanyCode: companyCode,
            TimeSheetRecord: timeSheetRecord
        });
    }
}
exports.TimeSheetEntryRequestBuilder = TimeSheetEntryRequestBuilder;
//# sourceMappingURL=TimeSheetEntryRequestBuilder.js.map