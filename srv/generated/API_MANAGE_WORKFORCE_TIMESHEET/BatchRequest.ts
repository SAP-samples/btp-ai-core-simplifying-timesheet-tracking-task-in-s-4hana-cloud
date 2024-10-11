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
import { transformVariadicArgumentToArray } from '@sap-cloud-sdk/util';
import { TimeSheetEntry } from './index';

/**
 * Batch builder for operations supported on the Api Manage Workforce Timesheet.
 * @param requests The requests of the batch.
 * @returns A request builder for batch.
 */
export function batch<DeSerializersT extends DeSerializers>(
  ...requests: Array<
    | ReadApiManageWorkforceTimesheetRequestBuilder<DeSerializersT>
    | BatchChangeSet<DeSerializersT>
  >
): ODataBatchRequestBuilder<DeSerializersT>;
export function batch<DeSerializersT extends DeSerializers>(
  requests: Array<
    | ReadApiManageWorkforceTimesheetRequestBuilder<DeSerializersT>
    | BatchChangeSet<DeSerializersT>
  >
): ODataBatchRequestBuilder<DeSerializersT>;
export function batch<DeSerializersT extends DeSerializers>(
  first:
    | undefined
    | ReadApiManageWorkforceTimesheetRequestBuilder<DeSerializersT>
    | BatchChangeSet<DeSerializersT>
    | Array<
        | ReadApiManageWorkforceTimesheetRequestBuilder<DeSerializersT>
        | BatchChangeSet<DeSerializersT>
      >,
  ...rest: Array<
    | ReadApiManageWorkforceTimesheetRequestBuilder<DeSerializersT>
    | BatchChangeSet<DeSerializersT>
  >
): ODataBatchRequestBuilder<DeSerializersT> {
  return new ODataBatchRequestBuilder(
    defaultApiManageWorkforceTimesheetPath,
    transformVariadicArgumentToArray(first, rest)
  );
}

/**
 * Change set constructor consists of write operations supported on the Api Manage Workforce Timesheet.
 * @param requests The requests of the change set.
 * @returns A change set for batch.
 */
export function changeset<DeSerializersT extends DeSerializers>(
  ...requests: Array<
    WriteApiManageWorkforceTimesheetRequestBuilder<DeSerializersT>
  >
): BatchChangeSet<DeSerializersT>;
export function changeset<DeSerializersT extends DeSerializers>(
  requests: Array<
    WriteApiManageWorkforceTimesheetRequestBuilder<DeSerializersT>
  >
): BatchChangeSet<DeSerializersT>;
export function changeset<DeSerializersT extends DeSerializers>(
  first:
    | undefined
    | WriteApiManageWorkforceTimesheetRequestBuilder<DeSerializersT>
    | Array<WriteApiManageWorkforceTimesheetRequestBuilder<DeSerializersT>>,
  ...rest: Array<WriteApiManageWorkforceTimesheetRequestBuilder<DeSerializersT>>
): BatchChangeSet<DeSerializersT> {
  return new BatchChangeSet(transformVariadicArgumentToArray(first, rest));
}

export const defaultApiManageWorkforceTimesheetPath =
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
