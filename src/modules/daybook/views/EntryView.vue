<template>
    <div class="entry-title d-flex justify-content-between p-2">
        <div>
            <span class="text-success fs-3 fw-bold">{{ day }}</span>
            <span class="mx-1 fs-3">{{ month }}</span>
            <span class="mx-2 fs-4 fw-light">{{ yearDay }}</span>
        </div>

        <div>
            <button class="btn btn-danger mx-2">
                Borrar
                <i class="fa fa-trash-alt"></i>
            </button>

            <button class="btn btn-primary">
                Subir foto
                <i class="fa fa-upload"></i>
            </button>
        </div>
    </div>

    <hr>

    <div class="d-flex flex-column px-3 h-75">
        <textarea placeholder="¿Qué sucedió hoy?" v-model="entry.text"></textarea>
    </div>

    <fab-button icon="fa-save" @on:click="saveEntry"/>

    <img src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg" alt="entry picture" class="img-thumbnail">
</template>

<script>
import { defineAsyncComponent } from 'vue'
import { mapGetters, mapActions } from 'vuex'

import getDayMonthYear from '../helpers/getDayMonthYear.js'

export default {
    data() {
        return {
            entry: null
        }
    },
    props: {
        id: {
            type: String,
            required: true
        }
    },
    computed: {
        ...mapGetters('journal', ['getEntryById']),
        day() {
            const {day} = getDayMonthYear(this.entry.date)
            return day
        },
        month() {
            const {month} = getDayMonthYear(this.entry.date)
            return month
        },
        yearDay() {
            const {yearDay} = getDayMonthYear(this.entry.date)
            return yearDay
        }
    },
    methods: {
        ...mapActions('journal', ['updateEntry']),
        loadEntry() {
            let entry;

            if (this.id === 'new') {
                entry = {
                    date: new Date().getTime(),
                    text: '',
                    picture: ''
                }
            } else {
                entry = this.getEntryById(this.id)
                if(!entry) return this.$router.push({name: 'no-entry'})
            }

            this.entry = entry
        },
        async saveEntry() {
            if (this.entry.id) {
                await this.updateEntry(this.entry)
            } else {
                //crear entry
            }
        }
    },
    created() {
        this.loadEntry()
    },
    components: {
        FabButton: defineAsyncComponent(() => import('../components/FabButton.vue'))
    },
    watch: {
        id() {
            this.loadEntry()
        }
    }
}
</script>

<style lang="scss" scoped>
textarea {
    font-size: 20px;
    border: none;
    height: 100%;
    resize: none;

    &:focus {
        outline: none;
    }
}

img {
    width: 200px;
    position: fixed;
    bottom: 150px;
    right: 20px;
    box-shadow: 0px 5px 10px rgba($color: #000000, $alpha: 0.2);
}
</style>