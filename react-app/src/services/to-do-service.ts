import axios from 'axios';
import { MYTODO_APP_SERVER_PORT, MYTODO_APP_SERVER_PATH, MYTODO_APP_SERVER_HOST } from '../definition/constant';

let apiServerPath =  MYTODO_APP_SERVER_HOST +''+ MYTODO_APP_SERVER_PATH;
if (MYTODO_APP_SERVER_PORT){
  apiServerPath = MYTODO_APP_SERVER_HOST + ':' + MYTODO_APP_SERVER_PORT + MYTODO_APP_SERVER_PATH;
}

class ToDoServices{
  async getAllTask(){
    try {
      let requestEndpoint = apiServerPath

      let responseGetTask = await axios.get(requestEndpoint);

      console.log(`after axios call [GET(${requestEndpoint})]: `, responseGetTask);

      let responseData = responseGetTask.data

      if(responseGetTask.status === 200){
        let allTask = JSON.stringify(responseData)
        console.log(allTask)
      return allTask
      } else{
        console.log("status is NOT OK [INVALID RESPONSE DATA]: ", responseData);
        return noTaskFound("Invalid response data");
      }
    } catch (error) {
      console.log("Function getActiveTask Failed [AXIOS EXCEPTION]: ", error);
      return noTaskFound("Failed to get task from server");
    }

    function noTaskFound(message: string) {
      return {
        success: false,
        payload:message,
      };
    }
  }
  
  async addNewTask(name:string){
    try {
      let requestEndpoint = apiServerPath

      let requestData = {
        id:"todo-"+ taskNumber(),
        name:name,
        completed:false
      }

      let responseAfterAddTask = await axios.post(requestEndpoint, requestData);

      console.log(`after axios call [POST(${requestEndpoint})]: `, requestData, responseAfterAddTask);

      let responseData = responseAfterAddTask.data

      if(responseAfterAddTask.status === 201){
      console.log(responseData)
      return responseData
      } else{
        console.log("status is NOT OK [INVALID RESPONSE DATA]: ", responseData);
        return failedToAddTask("Invalid response data");
      }
    } catch (error) {
      console.log("Function addNewTask Failed [AXIOS EXCEPTION]: ", error);
      return failedToAddTask("Failed to add task");
    }

    function failedToAddTask(message: string) {
      return {
        success: false,
        payload:message,
      };
    }

    function taskNumber(){
      let startNumber = 0;
      startNumber = startNumber + 1;
      return startNumber
    }
  }
}


export const TodoServices = new ToDoServices();