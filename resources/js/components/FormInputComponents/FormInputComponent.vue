<template>
    <form class="form" @submit.prevent="onSubmit">
        <div class="form__group">
            <div class="form__input">
                <label for="author">Ваше имя</label>
                <input
                    :value="author"
                    id="author"
                    required
                    placeholder="Ваше имя"
                    @input="updateAuthor($event.target.value)"
                />
            </div>
            <div class="form__input">
                <label for="date">Выберете дату отправки сообщения</label>
                <date-picker
                    @input="updateDate"
                    :value="date"
                    :input-attr="{
                        required: 'true',
                        placeholder: 'Дата отправки',
                        name: 'date',
                        id: 'date',
                    }"
                ></date-picker>
            </div>
        </div>
        <div class="form__input">
            <label for="text">Введите комментарий</label>
            <textarea
                name="message"
                type="text"
                :value="message"
                required
                placeholder="Текст комментария"
                @input="updateText($event.target.value)"
                id="text"
            />
        </div>
        <div>
            <button class="form__button">Оставить комментарий</button>
        </div>
    </form>
</template>

<script>
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";
import { mapState, mapMutations } from "vuex";
import { mapActions } from "vuex/dist/vuex.common.js";

export default {
    components: { DatePicker },
    computed: {
        ...mapState({
            authorValue: (state) => state.newComment.name,
            message: (state) => state.newComment.text,
            date: (state) => state.newComment.date,
        }),
        author() {
            return this.authorValue;
        },
    },
    data() {
        return {
            time1: null,
        };
    },
    methods: {
        ...mapMutations({
            updateText: "updateCommentText",
            updateAuthor: "updateCommentAuthor",
            updateDate: "updateCommentDate",
        }),
        ...mapActions({
            sendComment: "postComment",
        }),
        onSubmit(event) {
            this.sendComment();
        },
    },
};
</script>

<style>
/* style for form */
.form {
    padding: 20px 25px;
    border: 3px solid #409aff;
    border-radius: 4px;
    margin: 0 0 50px;
}
.form__group {
    display: flex;
}
.form__group .form__input:nth-child(2) {
    margin: 0 0 0 50px;
}
.form__input label {
    display: block;
    margin: 5px 0;
}

/* for inputs */
input,
textarea {
    padding: 8.5px;
    border-radius: 4px;
    border: 0.5px solid #ccc;
    transition: 0.5s;
}
input:hover,
input:focus,
textarea:focus,
textarea:hover {
    border-color: #409aff;
    outline: none !important;
}

textarea {
    height: 80px;
    width: 99%;
    resize: none;
}
button {
    padding: 10px 15px;
    background-color: #fff;
    border: 1px outset #ccc;
    border-radius: 4px;
    transition: 0.5s;
    cursor: pointer;
}
button:hover,
button:focus,
button:active {
    color: #409aff;
    border: 1px outset #409aff;
}
@media (max-width: 462px) {
    .form__group {
        flex-direction: column;
    }
    .form__group .form__input:nth-child(2) {
        margin: 0;
    }
    button {
        margin: 5px 0;
    }
}
</style>
