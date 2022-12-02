import journalApi from "@/api/journalApi"

export const loadEntries = async ({ commit }) => {
    const { data } = await journalApi.get('/entries.json').then(data => data)
    const entries = []
    for(let id of Object.keys(data)) {
        entries.push({
            id,
            ...data[id]
        })
    }

    commit('setEntries', entries)
}

export const updateEntry = async ({ commit }, entry) => {
    const body = {
        text: entry.text,
        date: entry.date,
        picture: entry.picture || ''
    }

    const {data} = await journalApi.put(`/entries/${entry.id}.json`, body).then(data => data)

    const entryUpdated = {
        id: entry.id,
        ...data
    }

    commit('updateEntry', {...entryUpdated})
}

export const createEntry = async () => {

}