<template>
    <div v-if="!isEdited" class="comment">
        <div class="comment__group">
            <div class="coment__author">{{ name }}</div>
            <div class="comment__date">
                {{
                    `${new Date(date).getDate()}, ${new Date(
                        date
                    ).toLocaleString("default", { month: "long" })} ${new Date(
                        date
                    ).getFullYear()}`
                }}
            </div>
        </div>
        <div class="comment__text">{{ text }}</div>
        <div class="comment__buttons">
            <button @click="isEdited = !isEdited">Редактировать</button>
            <button @click="deleteComment">Удалить</button>
        </div>
    </div>
    <div v-else>
        <form class="form" @submit.prevent="">
            <div class="form__group">
                <div class="form__input">
                    <label for="comment_author">Ваше имя</label>
                    <input
                        v-model="name_local"
                        id="comment_author"
                        required
                        placeholder="Ваше имя"
                    />
                </div>
                <div class="form__input">
                    <label for="comment_date"
                        >Выберете дату отправки сообщения</label
                    >
                    <date-picker
                        :value="new Date(date_local)"
                        @input="changeDate"
                        :input-attr="{
                            required: 'true',
                            placeholder: 'Дата отправки',
                            name: 'comment_date',
                            id: 'comment_date',
                        }"
                    ></date-picker>
                </div>
            </div>
            <div class="form__input">
                <label for="comment_text">Введите комментарий</label>
                <textarea
                    name="comment_text"
                    v-model="text_local"
                    required
                    placeholder="Текст комментария"
                    id="comment_text"
                />
            </div>
            <div>
                <button
                    @click.prevent="updateComment"
                    type="submit"
                    class="form__button"
                >
                    Изменить комментарий
                </button>
                <button @click="isEdited = !isEdited">Отменить</button>
            </div>
        </form>
    </div>
</template>
<script>
import { mapActions } from "vuex";
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";
export default {
    components: {
        DatePicker,
    },
    props: {
        name: String,
        id: Number,
        date: String,
        text: String,
    },
    data() {
        return {
            isEdited: false,
            name_local: this.name,
            date_local: this.date,
            text_local: this.text,
        };
    },
    methods: {
        ...mapActions({
            removeComment: "deleteComment",
            changeComment: "updateComment",
        }),
        deleteComment() {
            this.removeComment(this.id);
        },
        changeDate(event) {
            this.date_local = event;
        },
        updateComment() {
            const updatingComment = {
                name: this.name_local,
                id: this.id,
                date: this.date_local,
                text: this.text_local,
            };
            this.changeComment(updatingComment);
            this.isEdited = false;
        },
    },
};
</script>

<style scoped>
.comment {
    max-width: 1400px;
    border: 2px solid blue;
    border-radius: 4px;
    width: 100%;
    margin: 0 0 50px;
    padding: 20px 25px;
}
.coment__author {
    font-size: 16px;
    font-weight: bold;
}
.comment__group {
    display: flex;
    margin: 20px 0;
}
.comment__date {
    margin: 0 0 0 30px;
    font-size: 16px;
    font-style: italic;
}
.comment__buttons {
    margin: 20px 0;
}
@media (max-width: 462px) {
    .comment {
        margin: 0 0 10px;
    }
}
</style>
