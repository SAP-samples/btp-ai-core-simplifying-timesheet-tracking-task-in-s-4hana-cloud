const cds = require("@sap/cds");
const { DELETE } = cds.ql;
const {
  handleMemoryBeforeRagCall,
  handleMemoryAfterRagCall,
} = require("./memory-helper");
//const currentTimestampISO= new Date().toISOString().replace(/Z$/, '');

const { v4: uuidv4 } = require("uuid");

module.exports = function () {
  this.on("getChatResponse", async (req) => {
    const {
      conversationId,
      messageId,
      message_time,
      user_id,
      user_query,
      company_code,
      activity_type,
    } = req.data;
    const { Conversation, Message } = this.entities;

    const systemPrompt = `You are an assistant that creates the JSON body for OData V2 POST messages from plain English. Follow these rules:
    
    1. **Response Format**:
       - If all information is provided, respond with raw JSON only, no explanations, comments, or markdown.
       - For multiple days, return an array of objects with the array having a key of "d".
       - For a single date, return a single object without the "d" key.
    
    2. **Mandatory Fields**:
       - 'ActivityType': Use '${activity_type}'.
       - 'WBSElement': Project name from user input. If missing, ask the user to provide it.
       - 'TimeSheetNote': Use 'API Posting'.
       - 'RecordedHours': Time duration from user input. Convert to hours. If unclear, ask the user for clarification.
       - 'RecordedQuantity': Use '1'.
       - 'HoursUnitOfMeasure': Use 'H'.
       - 'CompanyCode': Use '${company_code}'.
       - 'PersonWorkAgreement': Use '${user_id}'.
       - 'TimeSheetDate': Date or DateTime from user input. Format as 'YYYY-MM-DD'. If user does not provide the year, use ${new Date().getFullYear()}. If the date range is unclear, ask for clarification.
       - 'TimeSheetOperation': Use 'C' for create, 'D' for delete.
       - 'TimeSheetIsReleasedOnSave': Use 'false'.
    
    3. **Error Handling**:
       - If any mandatory field is missing or unclear, ask the user for supplemental information.
    
    Example JSON:
    {
      "TimeSheetDataFields": {
        "ActivityType": "",
        "WBSElement": "",
        "TimeSheetNote": "API Posting",
        "RecordedHours": "",
        "RecordedQuantity": "1",
        "HoursUnitOfMeasure": "H"
      },
      "CompanyCode": "1710",
      "PersonWorkAgreement": "50008075",
      "TimeSheetDate": "2024-09-24",
      "TimeSheetOperation": "C",
      "TimeSheetIsReleasedOnSave": false
    }
    `;
    try {
      //handle memory before the LLM call
      const memoryContext = await handleMemoryBeforeRagCall(
        conversationId,
        messageId,
        message_time,
        user_id,
        user_query,
        Conversation,
        Message
      );

      var currentContext = [...memoryContext];
      currentContext.unshift({
        role: "system",
        content: systemPrompt,
      });
      currentContext.push({
        role: "user",
        content: user_query,
      });

      const LLMPrompt = {
        messages: currentContext,
      };

      console.log("LLM Prompt: ", LLMPrompt);

      const vectorplugin = await cds.connect.to("cap-llm-plugin");
      const completionModelConfig = cds.env.requires["gen-ai-hub"]["gpt-4o"];
      let LLMResponse = await vectorplugin.getChatCompletionWithConfig(
        completionModelConfig,
        LLMPrompt
      );
      const LLMResponseContent = LLMResponse.choices[0].message.content;
      const LLMResponseRole = LLMResponse.choices[0].message.role;
      console.log("LLMResponse: ", LLMResponseContent);

      //handle memory after the LLM call
      const responseMsgID = uuidv4();
      try {
        JSON.parse(LLMResponseContent);
      } catch (error) {
        await handleMemoryAfterRagCall(
          conversationId,
          responseMsgID,
          message_time,
          LLMResponse,
          Message,
          Conversation
        );
      }

      const response = {
        cID_cID: conversationId,
        mID: responseMsgID,
        role: LLMResponseRole,
        content: LLMResponseContent,
        creation_time: message_time,
      };
      return response;
    } catch (error) {
      // Handle any errors that occur during the execution
      console.log("Error while generating response for user query:", error);
      throw error;
    }
  });

  this.on("deleteChatData", async () => {
    try {
      const { Conversation, Message } = this.entities;
      await DELETE.from(Conversation).where({ userID: "I849435" });
      await DELETE.from(Message);
      return "Success!";
    } catch (error) {
      // Handle any errors that occur during the execution
      console.log("Error while deleting the chat content in db:", error);
      throw error;
    }
  });
};
