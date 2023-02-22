import axios from "axios";
const Customer_API_BASE_URL = "http://localhost:8585/parent/";
class CustomerService{
    updateCustomer(id,customer){
        return axios.put(Customer_API_BASE_URL + `updateParent/${id}`,customer);
    }
}

export default CustomerService;