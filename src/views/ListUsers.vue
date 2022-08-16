<template>
    <div class="container is-widescreen">
        <h1>Painel Administrativo</h1>
        <table class="table">
            <thead>
                <tr>
                    <th>Código</th>
                    <th>Nome</th>
                    <th>Email:</th>
                    <th>Cargo</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="u in users" :key="u.id">
                    <td>{{u.id}}</td>
                    <td>{{u.name}}</td>
                    <td>{{u.email}}</td>
                    <td>{{ cargo(u.role) }}</td>
                    <td>
                        <button class="button is-success">Editar</button> | 
                        <button class="button is-danger" @click="openModal">Deletar</button>
                    </td>
                </tr>
            </tbody>
        </table>
        <div :class="{modal: true, 'is-active' : showModal}">
            <div class="modal-background"></div>
            <div class="modal-card">
                <header class="modal-card-head">
                    <p class="modal-card-title">Confirmar</p>
                    <button class="delete" aria-label="close" @click="hideModal"></button>
                </header>
                <section class="modal-card-body">
                    Você realmente deseja excluir o usuário?
                </section>
                <footer class="modal-card-foot">
                    <button class="button is-danger">Deletar</button>
                    <button class="button" @click="hideModal">Cancelar</button>
                </footer>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    name: 'ListUsers',
    setup() {
        
    },
    created() {
        let token = localStorage.getItem("token");
        let axiosConfig = {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "*",
            }
        }
        axios.get('http://localhost:8888/users', axiosConfig).then(res => {
            console.log(res);
            this.users = res.data;
        }).catch(err => {
            console.log(err);
        })
    },
    data() {
        return {
            users: [],
            showModal: false
        }
    },
    methods: {
      cargo(value) {
        return value == 1 ? 'Admin' : 'Usuario';
      },
      hideModal() {
        this.showModal = false;
      },
      openModal() {
        this.showModal = true;
      }
    } 
}
</script>

<style scoped>

</style>