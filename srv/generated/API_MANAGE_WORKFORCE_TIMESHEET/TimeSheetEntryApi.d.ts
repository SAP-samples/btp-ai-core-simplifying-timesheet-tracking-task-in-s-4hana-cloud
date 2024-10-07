/*
 * Copyright (c) 2024 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { TimeSheetEntry } from './TimeSheetEntry';
import { TimeSheetEntryRequestBuilder } from './TimeSheetEntryRequestBuilder';
import { TimeSheetDataFieldsField } from './TimeSheetDataFields';
import {
  CustomField,
  DefaultDeSerializers,
  DeSerializers,
  AllFields,
  EntityBuilderType,
  EntityApi,
  FieldBuilder,
  OrderableEdmTypeField
} from '@sap-cloud-sdk/odata-v2';
export declare class TimeSheetEntryApi<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
> implements EntityApi<TimeSheetEntry<DeSerializersT>, DeSerializersT>
{
  deSerializers: DeSerializersT;
  private constructor();
  /**
   * Do not use this method or the constructor directly.
   * Use the service function as described in the documentation to get an API instance.
   */
  static _privateFactory<
    DeSerializersT extends DeSerializers = DefaultDeSerializers
  >(deSerializers?: DeSerializersT): TimeSheetEntryApi<DeSerializersT>;
  private navigationPropertyFields;
  _addNavigationProperties(linkedApis: []): this;
  entityConstructor: typeof TimeSheetEntry;
  requestBuilder(): TimeSheetEntryRequestBuilder<DeSerializersT>;
  entityBuilder(): EntityBuilderType<
    TimeSheetEntry<DeSerializersT>,
    DeSerializersT
  >;
  customField<NullableT extends boolean = false>(
    fieldName: string,
    isNullable?: NullableT
  ): CustomField<TimeSheetEntry<DeSerializersT>, DeSerializersT, NullableT>;
  private _fieldBuilder?;
  get fieldBuilder(): FieldBuilder<typeof TimeSheetEntry, DeSerializersT>;
  private _schema?;
  get schema(): {
    TIME_SHEET_DATA_FIELDS: TimeSheetDataFieldsField<
      TimeSheetEntry<DeSerializers>,
      DeSerializersT,
      false,
      true
    >;
    PERSON_WORK_AGREEMENT_EXTERNAL_ID: OrderableEdmTypeField<
      TimeSheetEntry<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    COMPANY_CODE: OrderableEdmTypeField<
      TimeSheetEntry<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    TIME_SHEET_RECORD: OrderableEdmTypeField<
      TimeSheetEntry<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    PERSON_WORK_AGREEMENT: OrderableEdmTypeField<
      TimeSheetEntry<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    TIME_SHEET_DATE: OrderableEdmTypeField<
      TimeSheetEntry<DeSerializers>,
      DeSerializersT,
      'Edm.DateTime',
      true,
      true
    >;
    TIME_SHEET_IS_RELEASED_ON_SAVE: OrderableEdmTypeField<
      TimeSheetEntry<DeSerializers>,
      DeSerializersT,
      'Edm.Boolean',
      true,
      true
    >;
    TIME_SHEET_PREDECESSOR_RECORD: OrderableEdmTypeField<
      TimeSheetEntry<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    TIME_SHEET_STATUS: OrderableEdmTypeField<
      TimeSheetEntry<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    TIME_SHEET_IS_EXECUTED_IN_TEST_RUN: OrderableEdmTypeField<
      TimeSheetEntry<DeSerializers>,
      DeSerializersT,
      'Edm.Boolean',
      true,
      true
    >;
    TIME_SHEET_OPERATION: OrderableEdmTypeField<
      TimeSheetEntry<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    ALL_FIELDS: AllFields<TimeSheetEntry<DeSerializers>>;
  };
}
