/*
 * Copyright (c) 2024 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import {
  CreateRequestBuilder,
  DeleteRequestBuilder,
  DeSerializers,
  GetAllRequestBuilder,
  GetByKeyRequestBuilder,
  ODataBatchRequestBuilder,
  UpdateRequestBuilder,
  BatchChangeSet
} from '@sap-cloud-sdk/odata-v2';
import { TimeSheetEntry } from './index';
/**
 * Batch builder for operations supported on the Api Manage Workforce Timesheet.
 * @param requests The requests of the batch.
 * @returns A request builder for batch.
 */
export declare function batch<DeSerializersT extends DeSerializers>(
  ...requests: Array<
    | ReadApiManageWorkforceTimesheetRequestBuilder<DeSerializersT>
    | BatchChangeSet<DeSerializersT>
  >
): ODataBatchRequestBuilder<DeSerializersT>;
export declare function batch<DeSerializersT extends DeSerializers>(
  requests: Array<
    | ReadApiManageWorkforceTimesheetRequestBuilder<DeSerializersT>
    | BatchChangeSet<DeSerializersT>
  >
): ODataBatchRequestBuilder<DeSerializersT>;
/**
 * Change set constructor consists of write operations supported on the Api Manage Workforce Timesheet.
 * @param requests The requests of the change set.
 * @returns A change set for batch.
 */
export declare function changeset<DeSerializersT extends DeSerializers>(
  ...requests: Array<
    WriteApiManageWorkforceTimesheetRequestBuilder<DeSerializersT>
  >
): BatchChangeSet<DeSerializersT>;
export declare function changeset<DeSerializersT extends DeSerializers>(
  requests: Array<
    WriteApiManageWorkforceTimesheetRequestBuilder<DeSerializersT>
  >
): BatchChangeSet<DeSerializersT>;
export declare const defaultApiManageWorkforceTimesheetPath =
  '/sap/opu/odata/sap/API_MANAGE_WORKFORCE_TIMESHEET';
export type ReadApiManageWorkforceTimesheetRequestBuilder<
  DeSerializersT extends DeSerializers
> =
  | GetAllRequestBuilder<TimeSheetEntry<DeSerializersT>, DeSerializersT>
  | GetByKeyRequestBuilder<TimeSheetEntry<DeSerializersT>, DeSerializersT>;
export type WriteApiManageWorkforceTimesheetRequestBuilder<
  DeSerializersT extends DeSerializers
> =
  | CreateRequestBuilder<TimeSheetEntry<DeSerializersT>, DeSerializersT>
  | UpdateRequestBuilder<TimeSheetEntry<DeSerializersT>, DeSerializersT>
  | DeleteRequestBuilder<TimeSheetEntry<DeSerializersT>, DeSerializersT>;
