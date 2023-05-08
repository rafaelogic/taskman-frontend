import * as Api from "@/services/Api";

export default {
    async getTask(task) {
        return await Api.handle.get(`/v1/tasks/${task.id}`);
    },
    async getTasks() {
        return await Api.handle.get('/v1/tasks');
    },
    async updateTaskStatus(task) {
        return await Api.handle.patch(`v1/tasks/${task.id}`, {status: task.status});
    },
    async deleteTask(task) {
        return await Api.handle.delete(`v1/tasks/${task.id}`);
    },
    async updateTask(task) {
        return await Api.handle.patch(`v1/tasks/${task.id}`, task.data);
    },
    async createTask(payload) {
        return await Api.handle.post('v1/tasks', payload);
    }
}