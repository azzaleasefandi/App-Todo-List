import axios from 'axios';
import { MYTODO_APP_SERVER_PORT, MYTODO_APP_SERVER_PATH, MYTODO_APP_SERVER_HOST } from '../definition/constant';

let apiServerPath =  MYTODO_APP_SERVER_HOST +''+ MYTODO_APP_SERVER_PATH;
if (MYTODO_APP_SERVER_PORT){
  apiServerPath = MYTODO_APP_SERVER_HOST + ':' + MYTODO_APP_SERVER_PORT + MYTODO_APP_SERVER_PATH;
}

class ToDoServices{
  async taskNeedDisplay(id:string,taskname:string,status:boolean){
    try {
      let requestEndpoint = apiServerPath

      let requestData = {
        id:id,
        taskName:taskname,
        status:false
      }

      let responseAfterGetTask = await axios.post(requestEndpoint, requestData);

      console.log(`after axios call [POST(${requestEndpoint})]: `, requestData, responseAfterGetTask);

      let responseData = responseAfterGetTask.data

      if(responseAfterGetTask.status === 201){
      console.log(responseData)
        if(!responseData.taskname){
          return failedToAddTask("No task at the moment");
        } else{
          return responseData.taskname
        }
      } else{
        console.log("status is NOT OK [INVALID RESPONSE DATA]: ", responseData);
        return failedToAddTask("Invalid response data");
      }
    } catch (error) {
      console.log("Function taskNeedToAdd Failed [AXIOS EXCEPTION]: ", error);
      return failedToAddTask("Failed to add task");
    }

    function failedToAddTask(message: string) {
      return {
        success: false,
        payload:message,
      };
    }
  }
}


export const TodoServices = new ToDoServices();