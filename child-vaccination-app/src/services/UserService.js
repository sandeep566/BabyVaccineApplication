import axios from 'axios'

const USER_API_BASE_URL = "http://localhost:8585/parent";
const USER_API_BASE_URL1 = "http://localhost:8585/User";

class UserService {
	userlogin(user) {
		return axios.post(USER_API_BASE_URL1+"/userlogin",user);
	}


	logout() {
	 	return axios.get(USER_API_BASE_URL + "/logout");
	 }

     signup(user){
        return axios.post(USER_API_BASE_URL+"/addParent",user);
     }

	
}
export default new UserService();