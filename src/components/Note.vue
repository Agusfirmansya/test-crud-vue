<template>
    <div class="container my-3">
        <button @click="showForm()" type="button" class="btn btn-secondary">Tambah Catatan</button>
        <form v-if="viewForm">
            <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label">Judul:</label>
                <input type="text" class="form-control" placeholder="Judul Catatan" maxlength="130" v-model="form.judul">
                <p>Sisa Karakter: {{ 130-form.judul.length }}</p>
            </div>
            <div class="mb-3">
                <label for="exampleFormControlTextarea1" class="form-label">Catatan:</label>
                <textarea class="form-control" rows="3" maxlength="600" v-model="form.catatan"></textarea>
                <p>Sisa Karakter: {{ 600-form.catatan.length }}</p>
            </div>
            <input type="submit" @click="postNote()" class="btn btn-success">
        </form>
        <input type="text" placeholder="cari catatan" v-model="cari" class="form-control my-3">
        <h3>Daftar Catatan</h3>
        <table class="table my-3">
            <thead>
                <tr>
                <th scope="col">#</th>
                <th scope="col">Judul</th>
                <th scope="col">Catatan</th>
                <th scope="col">Aksi</th>
                </tr>
            </thead>
            <tbody v-for="(notes,index) in notes" >
                <tr v-if="cariJudul(notes)">
                <th scope="col">{{ index+1 }}</th>
                <td v-if="!(notes.judul.length<20)"> {{ notes.judul.slice(0,20) }} <router-link :to="{name: 'detail', params: { id: notes.id }}">selengkapnya</router-link></td>
                <td v-if="(notes.judul.length<20)"> {{ notes.judul }}</td>
                <td v-if="!(notes.catatan.length<20)">{{ notes.catatan.slice(0,20) }} <router-link :to="{name: 'detail', params: { id: notes.id }}">selengkapnya</router-link> </td>
                <td v-if="(notes.catatan.length<20)">{{ notes.catatan }} </td>
                <td>
                    <router-link :to="{name: 'detail', params: { id: notes.id }}"><button type="button" class="btn btn-info">Detail</button></router-link>
                    <button @click="deletePost(notes)" type="button" class="btn btn-danger">Delete</button>
                </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        data(){
            return{
                notes: [],
                viewForm: false,
                cari:'',
                form: {
                    judul: '',
                    catatan: ''
                }
            }
        },

        methods: {
            showForm() {
                if (this.viewForm === false){
                    return this.viewForm = true
                } else {
                    return this.viewForm =  false
                }
            },
            loadData() {
                axios.get('http://localhost:3000/Notes')
                .then((res)=>{
                this.notes=res.data
                })
                .catch(()=>{
                    alert('error loading data')
                })
            },
            postNote () {
                axios.post('http://localhost:3000/Notes',this.form)
                .then((res)=>{
                    this.loadData()
                    this.form.judul=''
                    this.form.catatan=''
                })
            },
            deletePost(note){
                axios.delete('http://localhost:3000/notes/' + note.id)
                .then((res)=>{
                this.loadData()

                })
                .catch((e)=>{
                alert(e)
                })
            },
            cariJudul(notes) {
                let a = notes.judul
                let b = this.cari
                if (a.includes(b)){
                    return true
                } else if(b==''){
                    return true
                } else {
                    return false
                }
            }
            
        },

        mounted() {
            this.loadData();
        }
    }
</script>

<style>
textarea {
    resize: none;
}

</style>