<template>
    <div class="menu">
        <div class="menu__sort-input">
            <label for="sortBy">Сортировать:</label>

            <select
                :value="sortedBy"
                @change="changeSortedBy($event.target.value)"
                name="sortBy"
                id="sortBy"
            >
                <option value="date">По дате</option>
                <option value="id">По id</option>
            </select>
        </div>
        <div class="menu__sort-input">
            <label for="directionBy">Сортировать:</label>

            <select
                :value="sortedDirection"
                @change="changeDirection($event.target.value)"
                name="directionBy"
                id="directionBy"
            >
                <option value="fromMin">По возрастанию</option>
                <option value="fromMax">По убыванию</option>
            </select>
        </div>
    </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";

export default {
    computed: {
        ...mapState({
            sortedBy: (state) => state.sortedBy,
            sortedDirection: (state) => state.sortedDirection,
        }),
    },
    methods: {
        ...mapMutations({
            changeSortedBy: "setSortBy",
            changeDirection: "setSortDirection",
        }),
    },
};
</script>

<style scoped>
.menu {
    margin: 1rem 0;
    display: flex;
    justify-content: center;
    font-size: 18px;
}
.menu__sort-input:nth-of-type(1) {
    margin: 0 2rem 0;
}
.menu__sort-input label {
    margin: 0 10px 0;
}

.menu__sort-input select {
    font-size: 20px;
    color: rgb(49, 11, 83);
}
@media (max-width: 462px) {
    .menu {
        margin: 0 auto;
        font-size: 14px;
    }
    .menu__sort-input select {
        font-size: 16px;
        color: rgb(49, 11, 83);
    }
}
</style>
