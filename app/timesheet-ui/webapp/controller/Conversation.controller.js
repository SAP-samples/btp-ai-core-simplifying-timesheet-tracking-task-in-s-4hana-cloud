sap.ui.define([
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    'sap/ui/model/Sorter',
    'sap/m/MessageBox',
    'sap/f/library',
    "sap/ui/Device",
    "sap/ui/core/format/DateFormat"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (JSONModel, Controller, Filter, FilterOperator, Sorter, MessageBox,fioriLibrary,Device,DateFormat) {
        "use strict";

        return Controller.extend("timesheetui.controller.Conversation", {
            getBaseURL: function () {
              var appId = this.getOwnerComponent().getManifestEntry("/sap.app/id");
              var appPath = appId.replaceAll(".", "/");
              var appModulePath = jQuery.sap.getModulePath(appPath);
              //console.log(appId,appPath,appModulePath)
              return appModulePath;
            }, 
            getUserInfo: async function(){
            
              const url = this.getBaseURL() + "/user-api/attributes";
              var userEmail = "";
              var oModel = new JSONModel();
              var mock = {
                firstname: "Brett",
                lastname: "Neil",
                email: "US55@my300856.s4hana.ondemand.com",
                name: "Brett Neil",
                displayName: "Brett Neil (US55@my300856.s4hana.ondemand.com)"
              }; 
              oModel.loadData(url);
              await oModel.dataLoaded()
              .then(()=>{
                  //check if data has been loaded
                  //for local testing, set mock data
                  // console.log(oModel.getData());
                  if (!oModel.getData().email) {
                      oModel.setData(mock);
                  }
                  this.getView().setModel(oModel, "userInfo");
              })
              .catch(()=>{               
                  oModel.setData(mock);

                  this.getView().setModel(oModel, "userInfo");
              });
              userEmail = oModel.getData().email;

              var personID = await $.ajax({
                // url: this.getBaseURL()+`/timesheet-processor/getUser`,
                url: `/timesheet-processor/getUser`,
                type: "POST",
                contentType: "application/json",
                async: true,
                data:JSON.stringify({EmployeeEmail:userEmail}),
                // beforeSend: function(xhr) {
                //   xhr.setRequestHeader('X-CSRF-Token', "Fetch");
                // },
                success: function (body, status, response) {
                  if (response.status === 200 || response.status === 201) {
                    //console.log(response.responseJSON);
                    //return response.responseJSON.value[0].PersonWorkAgreement
                  } else {
                    console.log(response.responseJSON);

                  }
                },
                error: function (response, status) {
                  if (response) {
                    if (response.responseJSON) {
                      const msg =
                        response.responseJSON.message ||
                        response.responseJSON.status_msg;
                      console.log(msg);
                    } else {
                      console.log(response.responseText);
                    }
                  } else {
                    console.log(status);
                  }
                },
              });
              this._personName = personID.value[0].BusinessPartnerName;
              return personID.value[0].PersonWorkAgreement;
            },
            onInit: async function () {
              this.getOwnerComponent().getRouter().getRoute("main").attachPatternMatched(this._onRouteMatched, this);
              this.getOwnerComponent().getRouter().getRoute("conversation").attachPatternMatched(this._onRouteMatched, this);
              this.getOwnerComponent().getEventBus().subscribe(
                  "SomeChannel",
                  "refreshConversationDataEvent",
                  this.loadConversationData,
                  this
              );
              this.getOwnerComponent().getEventBus().subscribe(
                "SomeChannel",
                "refreshTimeAccDataEvent",
                this.loadTimeAccData,
                this
              );
            },
            _onRouteMatched: async function(oEvent) {
              /*
              * Navigate to the first item by default only on desktop and tablet (but not phone).
              * Note that item selection is not handled as it is
              * out of scope of this sample
              */
              // console.log("Conversation Router Matched");
              this._personID = await this.getUserInfo();

              this.loadConversationData();
              this.loadTimeAccData();

            },

            loadTimeAccData:async function(sChannelId, sEventId){
              var curr = new Date(); // get current date

              var first = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week
              var last = first + 6; // last day is the first day + 6
              var firstday = new Date((new Date()).setDate(first)).toISOString().replace(/Z$/, '');
              var lastday = new Date((new Date()).setDate(last)).toISOString().replace(/Z$/, '');

              const currentDate = new Date();
              // console.log("thisempid",this._personID);
              const payloadToday = { 
                "EmployeeID": this._personID,
                "StartDate": currentDate.toISOString().replace(/Z$/, ''),
                "EndDate": currentDate.toISOString().replace(/Z$/, '')
              };
              const payloadWeek = { 
                "EmployeeID": this._personID,
                "StartDate": firstday,
                "EndDate": lastday
              };
              var oModel = new JSONModel({"TodayTimeAcc":"","WeekTimeAcc":""});
              const oView = this.getView();
              $.ajax({
                // url: this.getBaseURL()+`/timesheet-processor/getTimeRecord`,
                url: `/timesheet-processor/getTimeRecord`,
                type: "POST",
                contentType: "application/json",
                async: true,
                data:JSON.stringify(payloadToday),
                // beforeSend: function(xhr) {
                //   xhr.setRequestHeader('X-CSRF-Token', "Fetch");
                // },
                success: function (body, status, response) {
                  if (response.status === 200 || response.status === 201) {
                    //console.log(response.responseJSON);
                    
                    const totalHours = response.responseJSON.value.reduce(function (accumulator, element) {
                      return accumulator + parseFloat(element.TimeSheetDataFields.RecordedHours);
                    }, 0);
                    oModel.setProperty("/TodayTimeAcc",totalHours);
                    oView.setModel(oModel,"TimeAcc");
                  } else {
                    console.log(response.responseJSON);

                  }
                },
                error: function (response, status) {
                  if (response) {
                    if (response.responseJSON) {
                      const msg =
                        response.responseJSON.message ||
                        response.responseJSON.status_msg;
                      console.log(msg);
                    } else {
                      console.log(response.responseText);
                    }
                  } else {
                    console.log(status);
                  }
                },
              });
              $.ajax({
                // url: this.getBaseURL()+`/timesheet-processor/getTimeRecord`,
                url: `/timesheet-processor/getTimeRecord`,
                type: "POST",
                contentType: "application/json",
                async: true,
                data:JSON.stringify(payloadWeek),
                // beforeSend: function(xhr) {
                //   xhr.setRequestHeader('X-CSRF-Token', "Fetch");
                // },
                success: function (body, status, response) {
                  if (response.status === 200 || response.status === 201) {
                    // console.log(response.responseJSON);
                    
                    const totalHours = response.responseJSON.value.reduce(function (accumulator, element) {
                      return accumulator + parseFloat(element.TimeSheetDataFields.RecordedHours);
                    }, 0);
                    oModel.setProperty("/WeekTimeAcc",totalHours);
                    oView.setModel(oModel,"TimeAcc");
                  } else {
                    console.log(response.responseJSON);

                  }
                },
                error: function (response, status) {
                  if (response) {
                    if (response.responseJSON) {
                      const msg =
                        response.responseJSON.message ||
                        response.responseJSON.status_msg;
                      console.log(msg);
                    } else {
                      console.log(response.responseText);
                    }
                  } else {
                    console.log(status);
                  }
                },
              });

            },
            loadConversationData: async function(sChannelId, sEventId){
              var oLocalModel = this.getOwnerComponent().getModel("localmodel");

              var oList = oLocalModel.bindList("/Conversation");
              // console.log(oList);
              var oContexts = await oList.requestContexts();
              // console.log(oContexts);

              var conversations = [];
              for await (const oContext of oContexts) {
                  var oObject = await oContext.requestObject();
                  conversations.push(oObject);
              };
              // console.log(conversations);

              var oModel = new JSONModel({"ConversationCollection":conversations});
              this.getView().setModel(oModel,"conversations");
            },
            onItemPress: function(oEvent) {
              var sStatus = oEvent.getSource().getBindingContext("conversations").getObject().status;
              if(sStatus == "" || sStatus == null){
                this.getOwnerComponent().getEventBus().publish(
                  "SomeChannel",
                  "setFeedInputEnabledEvent"
                );
              }else{
                this.getOwnerComponent().getEventBus().publish(
                  "SomeChannel",
                  "setFeedInputDisabledEvent"
                );
              }
              var sConversationID = oEvent.getSource().getBindingContext("conversations").getObject().cID;
              this.getOwnerComponent().getRouter()
                .navTo("conversation",
                  {conversationID:sConversationID},
                  !Device.system.phone);
            },
            onAdd: async function(oEvent){
              this.getOwnerComponent().getEventBus().publish(
                "SomeChannel",
                "setFeedInputEnabledEvent"
              );
              var currentTime = new Date();
              var sConversationID = this.generateUUID();
              var oContext = await this.getOwnerComponent().getModel("localmodel").bindList("/Conversation")
              .create({
                "cID": sConversationID,
                "userID": this._personID,
                "creation_time": currentTime.toISOString(),
                "last_update_time": currentTime.toISOString(),
                "timerecordID": "",
                "status": "",
                "WBSElement":""
              });

              await oContext.created();

              var oList = this.getOwnerComponent().getModel("localmodel").bindList("/Message"),
              oNewContext = oList.create();
              oNewContext.setProperty("cID_cID", `${sConversationID}`);
              oNewContext.setProperty("content", `Hi ${this._personName}. Welcome to smart timesheet tracking tool!`);
              oNewContext.setProperty("role", `assistant`);
              oNewContext.setProperty("creation_time", currentTime.toISOString());

              this.loadConversationData();
              this.getOwnerComponent().getRouter()
              .navTo("conversation",
                {conversationID:sConversationID},
                !Device.system.phone);
            },
            onSearch: async function(oEvent){
              const sQuery = oEvent.getParameter("query"); 

              var oContext = this.getOwnerComponent().getModel("localmodel");
   
              const oListBinding = oContext.bindList("/Message", this.getOwnerComponent(),[
                      new Sorter("cID_cID")
                  ], [
                      new Filter("content", FilterOperator.Contains, sQuery)
                  ]);
              const aContexts = await oListBinding.requestContexts();
              var matchedConversation = [];
              aContexts.forEach(element=>{
                matchedConversation.push(element.getObject().cID_cID)
              });
                // console.log(matchedConversation);

              const aFilter = [];
              if (sQuery) {
                matchedConversation.forEach(element => {
                  aFilter.push(new Filter("cID", FilterOperator.EQ, element));
                });
              }
        
              // filter binding
              const oList = this.byId("conversationTable");
              const oBinding = oList.getBinding("items");
              oBinding.filter(aFilter);
            },
            onDelete: async function(oEvent){
            
              var oContexts = await this.getOwnerComponent().getModel("localmodel").bindList("/Conversation").requestContexts();

              for await (const oContext of oContexts) {
                // var oUserID = await oContext.requestObject('userID');
                await oContext.delete();
                // if(oUserID !== 'I561660'){
                  
                // }
              };
              this.loadConversationData();
            },
            generateUUID: function() {
              return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                var r = Math.random() * 16 | 0,
                    v = c === 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
              });
            },
            timeFormatter :  function (value) {
              if (value) {
              var oDateFormat = DateFormat.getDateTimeInstance({pattern: "MM-dd-yyyy h:mm aa"});
              return oDateFormat.format(new Date(value));
              } else {
              return value;
              }
            }
          
        });
    });
