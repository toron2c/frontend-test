import Vue from "vue"; // in Vue 2
import axios from "axios";
import VueAxios from "vue-axios";
Vue.use(VueAxios, axios);
class ApiServices {
    constructor(url = "http://localhost/api/comments/") {
        this.url = url;
    }
    async getAllComments() {
        try {
            const res = await Vue.axios.get(this.url);
            return res.data;
        } catch (error) {
            console.log(error);
        }
    }
    async getComment(id) {
        try {
            const comment = await Vue.axios.get(`${this.url}${id}`);
            return comment.data;
        } catch (error) {
            return error.data;
        }
    }
    async postComment(data) {
        try {
            const res = await Vue.axios.post(this.url, data);
            return res.data;
        } catch (error) {
            return error.data;
        }
    }
    async deleteComment(id) {
        try {
            const res = await Vue.axios.delete(`${this.url}${id}`);
        } catch (error) {
            return error.data;
        }
    }
    async updateComment(id, data) {
        try {
            const newComment = await Vue.axios.patch(`${this.url}${id}`, data);
        } catch (error) {
            return error.data;
        }
    }
}

export default new ApiServices();
