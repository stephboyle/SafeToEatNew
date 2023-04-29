import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class WebService {

    constructor(public http: HttpClient) {}

    getUsers(page: number) {
        return this.http.get('http://localhost:5000/api/v1.0/users?pn=' + page);
    }

    getUser(users: any) {
        return this.http.get('http://localhost:5000/api/v1.0/users/' + users);
    }

    addUser(user: any) {
        let postData = new FormData();
        postData.append("first_name", user.first_name);
        postData.append("last_name", user.last_name);
        postData.append("email_address", user.email_address);
        postData.append("username", user.username);
        postData.append("password", user.password);
        postData.append("allergy", user.allergy);

        return this.http.post('http://localhost:5000/api/v1.0/users/createUser', postData);

    }

    editUser(user: any) {
        let updateData = new FormData();
        updateData.append("first_name", user.first_name);
        updateData.append("last_name", user.last_name);
        updateData.append("email_address", user.email_address);
        updateData.append("username", user.username);
        updateData.append("password", user.password);
        updateData.append("allergy", user.allergy);

        return this.http.put('http://localhost:5000/api/v1.0/users/' + user._id, updateData);
    }

    deleteUser(user: any) {
        return this.http.delete('http://localhost:5000/api/v1.0/users/' + user._id)
    }

    login(user:any) {
        return this.http.post('http://localhost:5000/api/v1.0/login', user);
    }

    logout() {
        return this.http.get('http://localhost:5000/api/v1.0/logout');
    }

    getProduct(product: any) {
        return this.http.get('http://localhost:5000/api/v1.0/barcodes/' + product._id)
    }

}