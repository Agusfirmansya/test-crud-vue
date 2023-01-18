<template>
    <div class="container my-3">
        <div v-if="!viewForm" class="card p-2 my-1">
        <h3>{{ note.judul }}</h3>
        <p>{{ note.catatan }}</p>
        </div>
    

        <button @click='edit(note)' class="btn btn-primary">Edit</button>
        <form v-if="viewForm">
        <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label" >Judul:</label>
                <input type="text" class="form-control" placeholder="Judul Catatan" maxlength="130" v-model="form.judul">
                <p>Sisa Karakter: {{ 130-form.judul.length }}</p>
            </div>
            <div class="mb-3">
                <label for="exampleFormControlTextarea1" class="form-label" >Catatan:</label>
                <textarea class="form-control" rows="3" maxlength="600" v-model="form.catatan"></textarea>
                <p>Sisa Karakter: {{ 600-form.catatan.length }}</p>
            </div>
            <input type="submit" @click='updateData(form)' class="btn btn-success">
        </form>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    data(){
        return{
            note:[],
            a:this.$route.params,
            viewForm: false,
            form: {
                judul:'',
                catatan:''
            }
        }
    },
    methods: {
        loadData(){
            axios.get('http://localhost:3000/Notes/'+this.a.id)
                .then((res)=>{
                this.note=res.data
                })
                .catch(()=>{
                    alert('error loading data')
                })
        },
        edit(note){
            this.form.judul=note.judul
            this.form.catatan=note.catatan
            if (this.viewForm===true){
                this.viewForm= false
            } else {
                this.viewForm= true
            }
        },
        updateData(form){
            axios.put('http://localhost:3000/Notes/'+this.a.id, {
                judul: this.form.judul,
                catatan: this.form.catatan
            })
            .then((res)=>{
                this.loadData()
                this.form.judul=''
                this.form.catatan=''
            })
            .catch((e)=>{
                alert(e)
            })
        }
    },
    mounted(){
        this.loadData()
    }
    
}
</script>