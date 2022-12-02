<template>
    <div class="entry-list-container">
        <div class="px-2 pt-2 m-2">
            <input type="text" name="" class="form-control" id="" placeholder="Buscar entrada" v-model="term">
        </div>

        <div class="mt-2 d-flex flex-column">
            <button class="btn btn-primary mx-3" @click="$router.push({name: 'entry', params: {id: 'new'}})">
                <i class="fa fa-plus-circle"></i>
                Nueva entrada
            </button>
        </div>

        <div class="entry-scrollarea">
            <entry-item v-for="entry in entriesByTerm" :key="entry.id" :entry="entry" />
        </div>
    </div>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import { mapGetters } from 'vuex'

export default {
    data() {
        return {
            term: ''
        }
    },
    components: {
        EntryItem: defineAsyncComponent(() => import('../components/EntryItem.vue'))
    },
    computed: {
        entriesByTerm() {
            return this.getEntriesByTerm(this.term);
        },
        ...mapGetters('journal', ['getEntriesByTerm'])
    }
}
</script>

<style lang="scss" scoped>
.entry-list-container {
    border-right: 1px solid #2c3e50;
    height: calc(100vh - 56px);
}

.entry-scrollarea {
    height: calc(100vh - 110px);
    overflow: auto;
}
</style>