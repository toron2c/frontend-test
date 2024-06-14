<template>
    <ul>
        <li
            v-for="page in pages"
            class="item"
            v-bind:class="{ active: currentPage == page }"
            :key="page"
            @click="setCurrentPage(page)"
        >
            {{ page }}
        </li>
    </ul>
</template>

<script>
import { mapGetters, mapMutations, mapState } from "vuex";
export default {
    computed: {
        ...mapState({
            currentPage: (state) => state.currentPage,
        }),
        ...mapGetters({
            pages: "getPages",
        }),
    },
    methods: {
        ...mapMutations(["setCurrentPage"]),
    },
};
</script>
<style scoped>
ul {
    display: flex;
    max-width: 400px;
    margin: 0 auto;
    flex-wrap: wrap;
}
.item {
    list-style-type: none;
    margin: 0 10px 0 0;
    cursor: pointer;
}
.active {
    transform: scale(1.3);
}
</style>
