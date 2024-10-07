sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/CustomData",
    "sap/ui/core/format/DateFormat"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,History,JSONModel,CustomData,DateFormat) {
        "use strict";

        return Controller.extend("timesheetui.controller.Chat", {
            getBaseURL: function () {
              var appId = this.getOwnerComponent().getManifestEntry("/sap.app/id");
              var appPath = appId.replaceAll(".", "/");
              var appModulePath = jQuery.sap.getModulePath(appPath);
              //console.log(appId,appPath,appModulePath)
              return appModulePath;
            }, 
            getUserInfo: async function(){
            
              const url = this.getBaseURL() + "/user-api/attributes";
              // console.log(url);
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
                // live url for use with AppRouter
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

              return personID.value[0].PersonWorkAgreement
            },
            onInit: async function () {

              //console.log(this.getBaseURL());
              this.setFeedInputDisabled()
          
            
              this._employeeID = await this.getUserInfo();
              this.getOwnerComponent().getRouter().getRoute("conversation").attachPatternMatched(this._onRouteMatched, this);

              this.byId('BusyIndicatorBox').setVisible(false);
              this.byId('CustomListItem').addStyleClass('projectList');

              var payload = {
                "EmployeeID":this._employeeID
              };

              const currentView = this.getView();
              $.ajax({
                // url: this.getBaseURL()+`/timesheet-processor/getProjectElement`,
                url: `/timesheet-processor/getProjectElement`,
                type: "POST",
                contentType: "application/json",
                async: true,
                data:JSON.stringify(payload),
                // beforeSend: function(xhr) {
                //   xhr.setRequestHeader('X-CSRF-Token', "Fetch");
                // },
                success: function (body, status, response) {
                  if (response.status === 200 || response.status === 201) {
                    //console.log(response.responseJSON);
                    var oModel = new JSONModel({"ProjectElementCollection":response.responseJSON.value});
                    currentView.setModel(oModel,"projectElement");
       

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
   
              this.getOwnerComponent().getEventBus().subscribe(
                "SomeChannel",
                "setFeedInputEnabledEvent",
                this.setFeedInputEnabled,
                this
              );
              this.getOwnerComponent().getEventBus().subscribe(
                "SomeChannel",
                "setFeedInputDisabledEvent",
                this.setFeedInputDisabled,
                this
              );
            },
            onNavBack : function() {
              var sPreviousHash = History.getInstance().getPreviousHash();
        
              //The history contains a previous entry
              if (sPreviousHash !== undefined) {
                history.go(-1);
              } else {
                // There is no history!
                // Naviate to master page
                this.getOwnerComponent().getRouter().navTo("main", {}, true);
              }
            },
            _onRouteMatched: async function(oEvent) {
              this._conversationId = oEvent.getParameter("arguments").conversationID;
              this.loadChatData();
        
            },
            generateUUID: function() {
              return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                var r = Math.random() * 16 | 0,
                    v = c === 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
              });
            },
            onProjectElementButtonPress: function(oEvent){
              this._projectElement = oEvent.getSource().getBindingContext("projectElement").getObject().ProjectElement;
              this._activityType = oEvent.getSource().getBindingContext("projectElement").getObject().ActivityType;
              this._companyCode = oEvent.getSource().getBindingContext("projectElement").getObject().CompanyCode;
              var inputValue = this.byId('FeedInput').getValue();
              this.byId('FeedInput').setValue(inputValue + this._projectElement);
            },
            onPost: async function (oEvent) {
                const busyIndicator = this.byId('BusyIndicatorBox');
                busyIndicator.setVisible(true);

                    var oDate = new Date();
                    var sDate = oDate.toISOString();
                    // create new entry
                    var sValue = oEvent.getParameter("value");
                    var oEntry = {
                      cID_cID:this._conversationId,
                      mID:this.generateUUID(),
                      role: "User",            
                      creation_time: sDate,
                      content: sValue
                    };
              
                    var oEntryBot;
                    var oModel = this.getView().getModel("chatHistory");
                    var aEntries = oModel.getData().ChatCollection;
                    aEntries.push(oEntry);
                    oModel.setData({
                      ChatCollection: aEntries
                    });

                    var payload = {
                        "conversationId": this._conversationId,
                        "messageId": this.generateUUID(),
                        "message_time": sDate,
                        "user_id": this._employeeID,
                        "user_query": sValue,
                        "company_code":this._companyCode,
                        "activity_type":this._activityType
                    };
                  const chatResponse = await $.ajax({
                    // url: this.getBaseURL()+`/chat-processor/getChatResponse`,
                    url: `/chat-processor/getChatResponse`,
                    type: "POST",
                    contentType: "application/json",
                    async: true,
                    data:JSON.stringify(payload),
                    // beforeSend: function(xhr) {
                    //   xhr.setRequestHeader('X-CSRF-Token', "Fetch");
                    // },
                    success: function (body, status, response) {
                      if (response.status === 200 || response.status === 201) {
                 
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

                  console.log("Get Chat Response Success!",chatResponse.content);

                  try {
                    JSON.parse(chatResponse.content);
                    console.log("in Try");
                  } catch (error) {
                    console.log("in Catch: ", error.message);
                    oEntryBot = {
                      cID_cID:chatResponse.cID_cID,
                      mID:chatResponse.mID,
                      role: chatResponse.role,            
                      creation_time: chatResponse.creation_time,
                      content: chatResponse.content
                    }
                    // update model
                    aEntries.push(oEntryBot);

                    oModel.setData({
                      ChatCollection: aEntries
                    });

                    //resolve(response);
                    busyIndicator.setVisible(false);
                    return;
                  }

                  var createTimeRecord = await $.ajax({
                    // url: this.getBaseURL()+`/timesheet-processor/createTimeRecord`,
                    url: `/timesheet-processor/createTimeRecord`,
                    type: "POST",
                    contentType: "application/json",
                    async: true,
                    data:JSON.stringify({
                      "Payload":JSON.stringify(chatResponse.content),
                      "conversationId":this._conversationId
                    }),
                    // beforeSend: function(xhr) {
                    //   xhr.setRequestHeader('X-CSRF-Token', "Fetch");
                    // },
                    success: function (body, status, response) {
                      if (response.status === 200 || response.status === 201) {
                        console.log("create time record successfully");
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

                  this.setFeedInputDisabled();

                  //reload ui
                  busyIndicator.setVisible(false);

                  // console.log("refresh ui");
                  this.loadChatData();
                  this.getOwnerComponent().getEventBus().publish(
                    "SomeChannel",
                    "refreshConversationDataEvent"
                  );
                  this.getOwnerComponent().getEventBus().publish(
                    "SomeChannel",
                    "refreshTimeAccDataEvent"
                  );
                //});
              
            },
            loadChatData: async function(){

              var oContext = this.getOwnerComponent().getModel("localmodel");
    
              var oContextBinding = oContext.bindContext(`/Conversation(${this._conversationId})`,oContext, {
                $expand : {
                            "to_messages" : {
                                "$orderby" : "creation_time"
                            }
                          }
              });
 
              const chatHistory = await oContextBinding.getBoundContext().requestObject("to_messages");
              let formattedChatHistory = chatHistory.map(obj => ({
                  ...obj,
                  role: obj.role.replace(/^\w/, c => c.toUpperCase())
              }));
              var oModel = new JSONModel({"ChatCollection":formattedChatHistory});
              this.getView().setModel(oModel,"chatHistory");


            },
            setFeedInputEnabled: function(sChannelId, sEventId){
              this.byId('FeedInput').setEnabled(true);

            },
            setFeedInputDisabled: function(sChannelId, sEventId){
              this.byId('FeedInput').setEnabled(false);

            },
            timeFormatter: function (value) {
              if (value) {
              var oDateFormat = DateFormat.getDateTimeInstance({pattern: "h:mm aa"});
              return oDateFormat.format(new Date(value));
              } else {
              return value;
              }
            },
            openS4:function(){
              window.open("https://my300856.s4hana.ondemand.com");
            }
        });
    });
