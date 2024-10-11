const cds = require("@sap/cds");
const { INSERT, SELECT, UPDATE } = cds.ql;
const { v4: uuidv4 } = require("uuid");
const { insertMessage } = require("./memory-helper");
const {
  apiManageWorkforceTimesheet,
  batch,
  changeset,
} = require("./generated/API_MANAGE_WORKFORCE_TIMESHEET");
const {
  defaultDeSerializers,
  entityDeserializer,
} = require("@sap-cloud-sdk/odata-v2");
const { timeSheetEntryApi } = apiManageWorkforceTimesheet();

module.exports = async function () {
  const TimesheetApi = await cds.connect.to("S4Timesheet_Destination");

  this.on("getTimeRecord", async (req) => {
    try {
      const { EmployeeID, StartDate, EndDate } = req.data;

      // Fetch time record
      const getTimeRecordResponse = await TimesheetApi.get(
        `/API_MANAGE_WORKFORCE_TIMESHEET/TimeSheetEntryCollection?$filter=TimeSheetDate ge datetime'${StartDate}' and TimeSheetDate le datetime'${EndDate}' and PersonWorkAgreement eq '${EmployeeID}'`
      );

      return getTimeRecordResponse;
    } catch (error) {
      console.error("Error while fetching time record: ", error);
      throw error;
    }
  });

  const handleSuccessResponse = async (
    response,
    conversationId,
    currentTime
  ) => {
    console.log("Debugging response: ", JSON.stringify(response));
    const { Conversation, Message } = this.entities;
    const timerecordID = response.timeSheetRecord;
    const WBSElement = response.timeSheetDataFields.wbsElement;
    const successMessageRecord = {
      cID_cID: conversationId,
      mID: uuidv4(),
      role: "assistant",
      content: "Time Record Created Successfully!",
      creation_time: currentTime,
    };
    await insertMessage(
      Message,
      successMessageRecord,
      conversationId,
      Conversation,
      currentTime
    );

    const updateWBSElement = await UPDATE(Conversation)
      .set`WBSElement = ${WBSElement}`.where`cID = ${conversationId}`;
    if (updateWBSElement !== 1) {
      throw new Error("Updating the conversation WBSElement failed!");
    }

    const successString = "Draft Saved";
    const updateTimeRecordID = await UPDATE(Conversation)
      .set`timerecordID = ${timerecordID}`.where`cID = ${conversationId}`;
    if (updateTimeRecordID !== 1) {
      throw new Error("Updating the conversation timerecordID failed!");
    }

    const updateStatus = await UPDATE(Conversation)
      .set`status = ${successString}`.where`cID = ${conversationId}`;
    if (updateStatus !== 1) {
      throw new Error("Updating the conversation status failed!");
    }

    return response;
  };

  const handleErrorResponse = async (error, conversationId, currentTime) => {
    const { Conversation, Message } = this.entities;
    const failMessageRecord = {
      cID_cID: conversationId,
      mID: uuidv4(),
      role: "assistant",
      content: "Time Record Creation Failed!",
      creation_time: currentTime,
    };
    const failString = "Failed";
    await insertMessage(
      Message,
      failMessageRecord,
      conversationId,
      Conversation,
      currentTime
    );
    await UPDATE(Conversation).set`status = ${failString}`
      .where`cID = ${conversationId}`;
  };

  /**
   * Converts a date string to OData V2 format.
   * @param {string} dateString - The date string to convert.
   * @returns {string} - The date in OData V2 format.
   */
  function convertToODataDate(dateString) {
    const date = new Date(dateString);
    const epochTime = date.getTime();
    return `/Date(${epochTime})/`;
  }

  this.on("createTimeRecord", async (req, next) => {
    try {
      const { Payload, conversationId } = req.data;
      const currentTime = new Date().toISOString();
      const timeRecordPayload = JSON.parse(JSON.parse(Payload));
      let createTimesheetResponse;
      console.log("Time Record Payload: ", JSON.stringify(timeRecordPayload));

      if (timeRecordPayload["d"] && Array.isArray(timeRecordPayload["d"])) {
        console.log("Batch request");
        const timeRecordRequests = timeRecordPayload["d"].map((timeRecord) => {
          console.log(timeRecord);
          timeRecord.TimeSheetDate = convertToODataDate(
            timeRecord["TimeSheetDate"]
          );
          const timeRecordEntry = entityDeserializer(
            defaultDeSerializers
          ).deserializeEntity(timeRecord, timeSheetEntryApi);
          return timeSheetEntryApi.requestBuilder().create(timeRecordEntry);
        });
        try {
          createTimesheetBatch = await batch(
            changeset(...timeRecordRequests)
          ).execute({
            destinationName: "S4Timesheet-Destination",
          });
          const changesetResponse = createTimesheetBatch[0];
          let responseBodies = [];
          if (changesetResponse.isWriteResponses()) {
            console.log("Write Responses");
            responseBodies = changesetResponse.responses.map((response) =>
              response.as(timeSheetEntryApi)
            );
          }
          createTimesheetResponse = responseBodies[0];
          console.log("Create Timesheet Response: ", createTimesheetResponse);
          await handleSuccessResponse(
            createTimesheetResponse,
            conversationId,
            currentTime
          );
        } catch (error) {
          await handleErrorResponse(error, conversationId, currentTime);
        }
      } else {
        try {
          timeRecordPayload.TimeSheetDate = convertToODataDate(
            timeRecordPayload["TimeSheetDate"]
          );
          const timeRecordEntry = entityDeserializer(
            defaultDeSerializers
          ).deserializeEntity(timeRecordPayload, timeSheetEntryApi);
          createTimesheetResponse = await timeSheetEntryApi
            .requestBuilder()
            .create(timeRecordEntry)
            .execute({
              destinationName: "S4Timesheet-Destination",
            });
          console.log("Create Timesheet Response: ", createTimesheetResponse);
          await handleSuccessResponse(
            createTimesheetResponse,
            conversationId,
            currentTime
          );
        } catch (error) {
          await handleErrorResponse(error, conversationId, currentTime);
        }
      }

      return createTimesheetResponse;
    } catch (error) {
      console.log("Error while creating time record: ", error);
      throw error;
    }
  });

  this.on("getProjectElement", async (req) => {
    try {
      const { EmployeeID } = req.data;
      const currentDateString = new Date().toISOString().replace(/Z$/, "");

      // Fetch project assignments
      const projectAssignmentResponse = await TimesheetApi.get(
        `/API_PROJECTDEMAND/A_ProjDmndResourceAssignment?$filter=ProjDmndRsceAssgmt eq '${EmployeeID}' and ProjDmndRsceAssgmtEndDate gt datetime'${currentDateString}' &$expand=to_Root,to_Work`
      );

      const referencedObjectUUIDArray = projectAssignmentResponse.map(
        (element) => element.to_Root.ReferencedObjectUUID
      );
      const activityTypeArray = projectAssignmentResponse.map(
        (element) => element.to_Work.ActivityType
      );

      // Fetch project elements
      const projectElementPromises = referencedObjectUUIDArray.map(
        (referencedObjectUUID) =>
          TimesheetApi.get(
            `/API_ENTERPRISE_PROJECT_SRV/A_EnterpriseProjectElement(guid'${referencedObjectUUID}')`
          )
      );

      const projectElementResponses = await Promise.all(projectElementPromises);

      // Add ActivityType to each project element
      projectElementResponses.forEach((element, index) => {
        element.ActivityType = activityTypeArray[index];
      });

      return projectElementResponses;
    } catch (error) {
      console.error("Error while getting ProjectResourceAssignment: ", error);
      throw error;
    }
  });

  this.on("getUser", async (req) => {
    try {
      const { EmployeeEmail } = req.data;
      const UserApi = await cds.connect.to("S4Timesheet-User-Destination");

      // Fetch user details
      const getUserResponse = await UserApi.get(
        `/YY1_I_PersonWorkAgreement?$filter=DefaultEmailAddress eq '${EmployeeEmail}'`
      );

      return getUserResponse;
    } catch (error) {
      console.error("Error while fetching user detail: ", error);
      throw error;
    }
  });
};
