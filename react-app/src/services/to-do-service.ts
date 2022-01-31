import axios from 'axios';
import { MYTODO_APP_SERVER_PORT, MYTODO_APP_SERVER_PATH, MYTODO_APP_SERVER_HOST, ID_INITIAL_COUNT } from '../definition/constant';

let apiServerPath =  MYTODO_APP_SERVER_HOST +''+ MYTODO_APP_SERVER_PATH;
let count = ID_INITIAL_COUNT
if (MYTODO_APP_SERVER_PORT){
  apiServerPath = MYTODO_APP_SERVER_HOST + ':' + MYTODO_APP_SERVER_PORT + MYTODO_APP_SERVER_PATH;
}

class ToDoServices{
  async getAllTask(){
    try {
      let requestEndpoint = apiServerPath + "/all-task"

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
      
      let requestEndpoint = apiServerPath + "/add-new-task" 

      let requestData = {
        id: "todo-" + count,
        name:name,
        completed:false
      }

      ++count

      let responseAfterAddTask = await axios.post(requestEndpoint, requestData);

      console.log(`after axios call [POST(${requestEndpoint})]: `, requestData, responseAfterAddTask);

      let responseData = responseAfterAddTask.data.task

      if(responseAfterAddTask.status === 200){
      console.log(responseData)
      return responseData
      } else{
        console.log("status is NOT OK [INVALID RESPONSE DATA]: ", responseData);
        return responseAfterAddTask.data.message;
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
  }

  async editTask(_id:string,newName:string, completed:boolean){
    try {
      let requestEndpoint = apiServerPath + "/" + _id + "/edit-task-name"

      let requestData = {
        _id: _id,
        newName: newName,
        completed:completed
      }

      let responseEditTask = await axios.put(requestEndpoint, requestData);

      console.log(`after axios call [PUT(${requestEndpoint})]: `, requestData, responseEditTask);

      let responseData = responseEditTask.data.task

      if(responseEditTask.status === 200){
      console.log(responseData)
      return responseData.name
      } else{
        console.log("status is NOT OK [INVALID RESPONSE DATA]: ", responseData);
        return responseEditTask.data.message;
      }
    } catch (error) {
      console.log("Function EditTask Failed [AXIOS EXCEPTION]: ", error);
      return failedEditTask("Failed to edit task");
    }

    function failedEditTask(message: string) {
      return {
        success: false,
        payload:message,
      };
    }
  }

  async taskCheckBox(_id:string, name:string, completed:boolean){
    try {
      let requestEndpoint = apiServerPath + "/" + _id + "/check-box"

      let requestData = {
        _id: _id,
        name: name,
        completed:!completed
      }

      let responseToggleCheckBox = await axios.put(requestEndpoint, requestData);

      console.log(`after axios call [PUT(${requestEndpoint})]: `, requestData, responseToggleCheckBox);

      let responseData = responseToggleCheckBox.data.task

      if(responseToggleCheckBox.status === 200){
      console.log(responseData)
      return responseData.completed
      } else{
        console.log("status is NOT OK [INVALID RESPONSE DATA]: ", responseData);
        return responseToggleCheckBox.data.message;
      }
    } catch (error) {
      console.log("Function ToggleCheckBox Failed [AXIOS EXCEPTION]: ", error);
      return failedToggleTask("Failed to toggle task");
    }

    function failedToggleTask(message: string) {
      return {
        success: false,
        payload:message,
      };
    }
  }

  async deleteTask(_id:string){
    try {
      let requestEndpoint = apiServerPath + "/" + _id + "/delete-task"

      let responseDeleteTask = await axios.delete(requestEndpoint);

      console.log(`after axios call [PUT(${requestEndpoint})]: `, responseDeleteTask);

      let responseData = responseDeleteTask.data.task

      if(responseDeleteTask.status === 200){
      return ("Successfully Deleted")
      } else{
        console.log("status is NOT OK [INVALID RESPONSE DATA]: ", responseData);
        return responseDeleteTask.data.message
      }
    } catch (error) {
      console.log("Function DeleteTask Failed [AXIOS EXCEPTION]: ", error);
      return failedDeleteTask("Failed to toggle task");
    }

    function failedDeleteTask(message: string) {
      return {
        success: false,
        payload:message,
      };
    }
  }

}


export const TodoServices = new ToDoServices();