import Vuex from "vuex";
import Vue from "vue";
import Api from "../api/index";

Vue.use(Vuex);
export default new Vuex.Store({
    state: {
        comments: [],
        sortedBy: "id",
        sortedDirection: "fromMin",
        itemsOnPage: 3,
        currentPage: 1,
        isLoad: false,
        newComment: {
            text: "",
            name: "",
            date: "",
        },
    },
    mutations: {
        setComments(state, payload) {
            state.comments = [...payload];
        },
        setPages(state, payload) {
            state.pages = payload;
        },
        setLoadStatus(state) {
            state.isLoad = !state.isLoad;
        },
        updateCommentText(state, payload) {
            state.newComment.text = payload;
        },
        updateCommentAuthor(state, payload) {
            state.newComment.name = payload;
        },
        updateCommentDate(state, payload) {
            state.newComment.date = payload;
        },
        addComment(state, payload) {
            state.comments.push(payload);
        },
        setSortBy(state, payload) {
            state.sortedBy = payload;
        },
        setSortDirection(state, payload) {
            state.sortedDirection = payload;
        },
        setCurrentPage(state, payload) {
            state.currentPage = payload;
        },
        removeComment(state, payload) {
            state.comments = state.comments.filter((el) => el.id !== payload);
        },
        changeComment(state, payload) {
            let oldComment = state.comments.find((el) => el.id === payload.id);
            if (oldComment) {
                oldComment.name = payload.name;
                oldComment.text = payload.text;
                oldComment.date = payload.date;
            }
        },
    },
    getters: {
        sortedList(state) {
            const commentsCopy = [...state.comments];
            const direction = state.sortedDirection === "fromMin" ? 1 : -1;
            commentsCopy.sort((a, b) => {
                if (state.sortedBy === "date") {
                    const dateA = new Date(a.date);
                    const dateB = new Date(b.date);
                    return (dateA - dateB) * direction;
                } else {
                    return (a.id - b.id) * direction;
                }
            });
            return commentsCopy;
        },
        getPages(state) {
            const totalPages = Math.ceil(
                state.comments.length / state.itemsOnPage
            );
            return Array.from(
                {
                    length: totalPages,
                },
                (_, i) => i + 1
            );
        },
        viewComments(state, getters) {
            let start = (state.currentPage - 1) * state.itemsOnPage;
            let end = start + 3;
            return getters.sortedList.slice(start, end);
        },
    },
    actions: {
        async fetchAllComments({ commit }) {
            try {
                commit("setLoadStatus");
                const comments = await Api.getAllComments();
                commit("setComments", comments);
                commit("setLoadStatus");
            } catch (error) {}
        },
        async postComment({ commit, state }) {
            try {
                const response = await Api.postComment(state.newComment);
                commit("addComment", response);
            } catch (error) {}
        },
        async deleteComment({ commit, state }, payload) {
            try {
                const response = await Api.deleteComment(payload);
                commit("removeComment", payload);
                const totalPages = Math.ceil(
                    state.comments.length / state.itemsOnPage
                );
                if (state.currentPage > totalPages && state.currentPage !== 1) {
                    commit("setCurrentPage", state.currentPage - 1);
                }
            } catch (error) {}
        },
        async updateComment({ commit, state }, { id, name, text, date }) {
            try {
                let data = {
                    name,
                    text,
                    date,
                };
                const updatedComment = await Api.updateComment(id, data);
                data.id = id;
                commit("changeComment", data);
            } catch (error) {}
        },
    },
});
