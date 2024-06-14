<template>
    <div>
        <SortComponent />
        <CommentsList />
        <FormCommentInputs />
    </div>
</template>
<script>
import CommentsListIComponent from "../components/CommentsComponents/CommentsListComponent.vue";
import FormInputComponentVue from "../components/FormInputComponents/FormInputComponent.vue";
import SortComponent from "../components/SortComponent";
//vuex
import { mapActions } from "vuex";
export default {
    components: {
        SortComponent: SortComponent,
        CommentsList: CommentsListIComponent,
        FormCommentInputs: FormInputComponentVue,
    },
    methods: {
        ...mapActions({
            getAllComments: "fetchAllComments",
        }),
    },
    created() {
        this.getAllComments();
    },
};
</script>
<style scoped>
div {
    max-width: 1400px;
    margin: 0 auto;
    display: grid;
    grid-template-rows: min-content 1fr min-content;
    width: 100%;
    gap: 20px;
    max-height: 100%;
}
@media (max-width: 462px) {
    div {
        max-width: 325px;
    }
}
</style>
