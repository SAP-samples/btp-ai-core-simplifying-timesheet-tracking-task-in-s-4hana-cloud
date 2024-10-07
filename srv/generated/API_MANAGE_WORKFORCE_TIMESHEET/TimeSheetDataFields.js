"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimeSheetDataFields = exports.TimeSheetDataFieldsField = void 0;
/*
 * Copyright (c) 2024 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const odata_v2_1 = require("@sap-cloud-sdk/odata-v2");
/**
 * TimeSheetDataFieldsField
 * @typeParam EntityT - Type of the entity the complex type field belongs to.
 */
class TimeSheetDataFieldsField extends odata_v2_1.ComplexTypeField {
    /**
     * Creates an instance of TimeSheetDataFieldsField.
     * @param fieldName - Actual name of the field as used in the OData request.
     * @param fieldOf - Either the parent entity constructor of the parent complex type this field belongs to.
     */
    constructor(fieldName, fieldOf, deSerializers, fieldOptions) {
        super(fieldName, fieldOf, deSerializers, TimeSheetDataFields, fieldOptions);
        this._fieldBuilder = new odata_v2_1.FieldBuilder(this, this.deSerializers);
        /**
         * Representation of the {@link TimeSheetDataFields.controllingArea} property for query construction.
         * Use to reference this property in query operations such as 'filter' in the fluent request API.
         */
        this.controllingArea = this._fieldBuilder.buildEdmTypeField('ControllingArea', 'Edm.String', true);
        /**
         * Representation of the {@link TimeSheetDataFields.senderCostCenter} property for query construction.
         * Use to reference this property in query operations such as 'filter' in the fluent request API.
         */
        this.senderCostCenter = this._fieldBuilder.buildEdmTypeField('SenderCostCenter', 'Edm.String', true);
        /**
         * Representation of the {@link TimeSheetDataFields.receiverCostCenter} property for query construction.
         * Use to reference this property in query operations such as 'filter' in the fluent request API.
         */
        this.receiverCostCenter = this._fieldBuilder.buildEdmTypeField('ReceiverCostCenter', 'Edm.String', true);
        /**
         * Representation of the {@link TimeSheetDataFields.internalOrder} property for query construction.
         * Use to reference this property in query operations such as 'filter' in the fluent request API.
         */
        this.internalOrder = this._fieldBuilder.buildEdmTypeField('InternalOrder', 'Edm.String', true);
        /**
         * Representation of the {@link TimeSheetDataFields.activityType} property for query construction.
         * Use to reference this property in query operations such as 'filter' in the fluent request API.
         */
        this.activityType = this._fieldBuilder.buildEdmTypeField('ActivityType', 'Edm.String', true);
        /**
         * Representation of the {@link TimeSheetDataFields.wbsElement} property for query construction.
         * Use to reference this property in query operations such as 'filter' in the fluent request API.
         */
        this.wbsElement = this._fieldBuilder.buildEdmTypeField('WBSElement', 'Edm.String', true);
        /**
         * Representation of the {@link TimeSheetDataFields.workItem} property for query construction.
         * Use to reference this property in query operations such as 'filter' in the fluent request API.
         */
        this.workItem = this._fieldBuilder.buildEdmTypeField('WorkItem', 'Edm.String', true);
        /**
         * Representation of the {@link TimeSheetDataFields.billingControlCategory} property for query construction.
         * Use to reference this property in query operations such as 'filter' in the fluent request API.
         */
        this.billingControlCategory = this._fieldBuilder.buildEdmTypeField('BillingControlCategory', 'Edm.String', true);
        /**
         * Representation of the {@link TimeSheetDataFields.purchaseOrder} property for query construction.
         * Use to reference this property in query operations such as 'filter' in the fluent request API.
         */
        this.purchaseOrder = this._fieldBuilder.buildEdmTypeField('PurchaseOrder', 'Edm.String', true);
        /**
         * Representation of the {@link TimeSheetDataFields.purchaseOrderItem} property for query construction.
         * Use to reference this property in query operations such as 'filter' in the fluent request API.
         */
        this.purchaseOrderItem = this._fieldBuilder.buildEdmTypeField('PurchaseOrderItem', 'Edm.String', true);
        /**
         * Representation of the {@link TimeSheetDataFields.timeSheetTaskType} property for query construction.
         * Use to reference this property in query operations such as 'filter' in the fluent request API.
         */
        this.timeSheetTaskType = this._fieldBuilder.buildEdmTypeField('TimeSheetTaskType', 'Edm.String', true);
        /**
         * Representation of the {@link TimeSheetDataFields.timeSheetTaskLevel} property for query construction.
         * Use to reference this property in query operations such as 'filter' in the fluent request API.
         */
        this.timeSheetTaskLevel = this._fieldBuilder.buildEdmTypeField('TimeSheetTaskLevel', 'Edm.String', true);
        /**
         * Representation of the {@link TimeSheetDataFields.timeSheetTaskComponent} property for query construction.
         * Use to reference this property in query operations such as 'filter' in the fluent request API.
         */
        this.timeSheetTaskComponent = this._fieldBuilder.buildEdmTypeField('TimeSheetTaskComponent', 'Edm.String', true);
        /**
         * Representation of the {@link TimeSheetDataFields.timeSheetNote} property for query construction.
         * Use to reference this property in query operations such as 'filter' in the fluent request API.
         */
        this.timeSheetNote = this._fieldBuilder.buildEdmTypeField('TimeSheetNote', 'Edm.String', true);
        /**
         * Representation of the {@link TimeSheetDataFields.recordedHours} property for query construction.
         * Use to reference this property in query operations such as 'filter' in the fluent request API.
         */
        this.recordedHours = this._fieldBuilder.buildEdmTypeField('RecordedHours', 'Edm.Decimal', true);
        /**
         * Representation of the {@link TimeSheetDataFields.recordedQuantity} property for query construction.
         * Use to reference this property in query operations such as 'filter' in the fluent request API.
         */
        this.recordedQuantity = this._fieldBuilder.buildEdmTypeField('RecordedQuantity', 'Edm.Decimal', true);
        /**
         * Representation of the {@link TimeSheetDataFields.hoursUnitOfMeasure} property for query construction.
         * Use to reference this property in query operations such as 'filter' in the fluent request API.
         */
        this.hoursUnitOfMeasure = this._fieldBuilder.buildEdmTypeField('HoursUnitOfMeasure', 'Edm.String', true);
        /**
         * Representation of the {@link TimeSheetDataFields.rejectionReason} property for query construction.
         * Use to reference this property in query operations such as 'filter' in the fluent request API.
         */
        this.rejectionReason = this._fieldBuilder.buildEdmTypeField('RejectionReason', 'Edm.String', true);
        /**
         * Representation of the {@link TimeSheetDataFields.timeSheetWrkLocCode} property for query construction.
         * Use to reference this property in query operations such as 'filter' in the fluent request API.
         */
        this.timeSheetWrkLocCode = this._fieldBuilder.buildEdmTypeField('TimeSheetWrkLocCode', 'Edm.String', true);
        /**
         * Representation of the {@link TimeSheetDataFields.timeSheetOvertimeCategory} property for query construction.
         * Use to reference this property in query operations such as 'filter' in the fluent request API.
         */
        this.timeSheetOvertimeCategory = this._fieldBuilder.buildEdmTypeField('TimeSheetOvertimeCategory', 'Edm.String', true);
        /**
         * Representation of the {@link TimeSheetDataFields.senderPubSecFund} property for query construction.
         * Use to reference this property in query operations such as 'filter' in the fluent request API.
         */
        this.senderPubSecFund = this._fieldBuilder.buildEdmTypeField('SenderPubSecFund', 'Edm.String', true);
        /**
         * Representation of the {@link TimeSheetDataFields.sendingPubSecFunctionalArea} property for query construction.
         * Use to reference this property in query operations such as 'filter' in the fluent request API.
         */
        this.sendingPubSecFunctionalArea = this._fieldBuilder.buildEdmTypeField('SendingPubSecFunctionalArea', 'Edm.String', true);
        /**
         * Representation of the {@link TimeSheetDataFields.senderPubSecGrant} property for query construction.
         * Use to reference this property in query operations such as 'filter' in the fluent request API.
         */
        this.senderPubSecGrant = this._fieldBuilder.buildEdmTypeField('SenderPubSecGrant', 'Edm.String', true);
        /**
         * Representation of the {@link TimeSheetDataFields.senderPubSecBudgetPeriod} property for query construction.
         * Use to reference this property in query operations such as 'filter' in the fluent request API.
         */
        this.senderPubSecBudgetPeriod = this._fieldBuilder.buildEdmTypeField('SenderPubSecBudgetPeriod', 'Edm.String', true);
        /**
         * Representation of the {@link TimeSheetDataFields.receiverPubSecFund} property for query construction.
         * Use to reference this property in query operations such as 'filter' in the fluent request API.
         */
        this.receiverPubSecFund = this._fieldBuilder.buildEdmTypeField('ReceiverPubSecFund', 'Edm.String', true);
        /**
         * Representation of the {@link TimeSheetDataFields.receiverPubSecFuncnlArea} property for query construction.
         * Use to reference this property in query operations such as 'filter' in the fluent request API.
         */
        this.receiverPubSecFuncnlArea = this._fieldBuilder.buildEdmTypeField('ReceiverPubSecFuncnlArea', 'Edm.String', true);
        /**
         * Representation of the {@link TimeSheetDataFields.receiverPubSecGrant} property for query construction.
         * Use to reference this property in query operations such as 'filter' in the fluent request API.
         */
        this.receiverPubSecGrant = this._fieldBuilder.buildEdmTypeField('ReceiverPubSecGrant', 'Edm.String', true);
        /**
         * Representation of the {@link TimeSheetDataFields.receiverPubSecBudgetPeriod} property for query construction.
         * Use to reference this property in query operations such as 'filter' in the fluent request API.
         */
        this.receiverPubSecBudgetPeriod = this._fieldBuilder.buildEdmTypeField('ReceiverPubSecBudgetPeriod', 'Edm.String', true);
    }
}
exports.TimeSheetDataFieldsField = TimeSheetDataFieldsField;
var TimeSheetDataFields;
(function (TimeSheetDataFields) {
    /**
     * Metadata information on all properties of the `TimeSheetDataFields` complex type.
     */
    TimeSheetDataFields._propertyMetadata = [
        {
            originalName: 'ControllingArea',
            name: 'controllingArea',
            type: 'Edm.String',
            isCollection: false
        },
        {
            originalName: 'SenderCostCenter',
            name: 'senderCostCenter',
            type: 'Edm.String',
            isCollection: false
        },
        {
            originalName: 'ReceiverCostCenter',
            name: 'receiverCostCenter',
            type: 'Edm.String',
            isCollection: false
        },
        {
            originalName: 'InternalOrder',
            name: 'internalOrder',
            type: 'Edm.String',
            isCollection: false
        },
        {
            originalName: 'ActivityType',
            name: 'activityType',
            type: 'Edm.String',
            isCollection: false
        },
        {
            originalName: 'WBSElement',
            name: 'wbsElement',
            type: 'Edm.String',
            isCollection: false
        },
        {
            originalName: 'WorkItem',
            name: 'workItem',
            type: 'Edm.String',
            isCollection: false
        },
        {
            originalName: 'BillingControlCategory',
            name: 'billingControlCategory',
            type: 'Edm.String',
            isCollection: false
        },
        {
            originalName: 'PurchaseOrder',
            name: 'purchaseOrder',
            type: 'Edm.String',
            isCollection: false
        },
        {
            originalName: 'PurchaseOrderItem',
            name: 'purchaseOrderItem',
            type: 'Edm.String',
            isCollection: false
        },
        {
            originalName: 'TimeSheetTaskType',
            name: 'timeSheetTaskType',
            type: 'Edm.String',
            isCollection: false
        },
        {
            originalName: 'TimeSheetTaskLevel',
            name: 'timeSheetTaskLevel',
            type: 'Edm.String',
            isCollection: false
        },
        {
            originalName: 'TimeSheetTaskComponent',
            name: 'timeSheetTaskComponent',
            type: 'Edm.String',
            isCollection: false
        },
        {
            originalName: 'TimeSheetNote',
            name: 'timeSheetNote',
            type: 'Edm.String',
            isCollection: false
        },
        {
            originalName: 'RecordedHours',
            name: 'recordedHours',
            type: 'Edm.Decimal',
            isCollection: false
        },
        {
            originalName: 'RecordedQuantity',
            name: 'recordedQuantity',
            type: 'Edm.Decimal',
            isCollection: false
        },
        {
            originalName: 'HoursUnitOfMeasure',
            name: 'hoursUnitOfMeasure',
            type: 'Edm.String',
            isCollection: false
        },
        {
            originalName: 'RejectionReason',
            name: 'rejectionReason',
            type: 'Edm.String',
            isCollection: false
        },
        {
            originalName: 'TimeSheetWrkLocCode',
            name: 'timeSheetWrkLocCode',
            type: 'Edm.String',
            isCollection: false
        },
        {
            originalName: 'TimeSheetOvertimeCategory',
            name: 'timeSheetOvertimeCategory',
            type: 'Edm.String',
            isCollection: false
        },
        {
            originalName: 'SenderPubSecFund',
            name: 'senderPubSecFund',
            type: 'Edm.String',
            isCollection: false
        },
        {
            originalName: 'SendingPubSecFunctionalArea',
            name: 'sendingPubSecFunctionalArea',
            type: 'Edm.String',
            isCollection: false
        },
        {
            originalName: 'SenderPubSecGrant',
            name: 'senderPubSecGrant',
            type: 'Edm.String',
            isCollection: false
        },
        {
            originalName: 'SenderPubSecBudgetPeriod',
            name: 'senderPubSecBudgetPeriod',
            type: 'Edm.String',
            isCollection: false
        },
        {
            originalName: 'ReceiverPubSecFund',
            name: 'receiverPubSecFund',
            type: 'Edm.String',
            isCollection: false
        },
        {
            originalName: 'ReceiverPubSecFuncnlArea',
            name: 'receiverPubSecFuncnlArea',
            type: 'Edm.String',
            isCollection: false
        },
        {
            originalName: 'ReceiverPubSecGrant',
            name: 'receiverPubSecGrant',
            type: 'Edm.String',
            isCollection: false
        },
        {
            originalName: 'ReceiverPubSecBudgetPeriod',
            name: 'receiverPubSecBudgetPeriod',
            type: 'Edm.String',
            isCollection: false
        }
    ];
})(TimeSheetDataFields || (exports.TimeSheetDataFields = TimeSheetDataFields = {}));
//# sourceMappingURL=TimeSheetDataFields.js.map