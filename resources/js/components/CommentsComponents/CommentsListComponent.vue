<template>
    <div v-if="isLoad">Load...</div>
    <div class="comments" v-else>
        <ul>
            <li v-for="item in list" :key="item.id">
                <CommentItemComponent
                    v-bind:name="item.name"
                    v-bind:text="item.text"
                    v-bind:id="item.id"
                    v-bind:date="item.date"
                />
            </li>
        </ul>
        <Pages />
    </div>
</template>
<script>
import { mapGetters, mapState } from "vuex";
import CommentItemComponentVue from "./CommentItemComponent.vue";
import Pages from "./CommentsPagesComponent.vue";

export default {
    components: {
        Pages,
        CommentItemComponent: CommentItemComponentVue,
    },
    computed: {
        ...mapState({
            isLoad: (state) => state.isLoad,
        }),
        ...mapGetters({
            list: "viewComments",
        }),
    },
};
</script>

<style scoped>
.comments {
    display: grid;
    grid-template-rows: 1fr 0.2fr;
}
li {
    list-style-type: none;
}
@media (max-width: 462px) {
    .comments {
        grid-template-rows: auto;
        gap: 10px;
    }
}
</style>
