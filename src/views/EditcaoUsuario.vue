<template>
    <div class="container">
        <h1>Edicao de Usuário</h1>
        <hr>
        <div>
            <div v-if="error != undefined" class="notification is-danger">
                <button class="delete" @click="fecharErro"></button>
                {{error}}
            </div>
            <div v-if="success != undefined" class="notification is-success">
                <button class="delete" @click="fecharSucesso"></button>
                {{success}}
            </div>
            <div class="field">
                <label class="label has-text-left">Nome</label>
                <div class="control">
                    <input class="input" 
                    type="text" 
                    placeholder="Digite o nome do usuario"
                    v-model="nome">
                </div>
            </div>
            <div class="field">
                <label class="label has-text-left">Email</label>
                <div class="control">
                    <input class="input" 
                    type="text"
                    v-model="email" 
                    placeholder="Digite o email do usuario">
                </div>
            </div>
            <div class="field is-grouped">
                <div class="control">
                    <button class="button is-success" @click="editar">Editar</button>
                </div>
                <div class="control">
                    <button class="button is-link is-light" @click="limpar">Limpar</button>
                </div>
            </div>
        </div>
        
    </div>
</template>

<script>
import axios from 'axios';
export default {
    name: 'EdicaoUsuario',
    setup() {
        
    },
    created() {
        let token = localStorage.getItem("token");
            //console.log(token);
            let axiosConfig = {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;charset=UTF-8',
                    "Access-Control-Allow-Origin": "*",
                } 
            }
            let url = 'http://localhost:8888/users/' + this.$route.params.id;
            
            axios.get(url, axiosConfig).then(res => {
                console.log(res);
                //this.success = 'Usuário Alterado com Sucesso';
                this.id = res.data.id;
                this.email = res.data.email;
                this.nome = res.data.name;

            }).catch(err => {
                //console.log(err.response);
                console.log(err)
                this.error = err.data.err;
            });  
    },
    data() {
        return {
            id: -1,
            nome: '',
            email: '',
            error: undefined,
            success: undefined
        }   
    },
    methods: {
        fecharSucesso() {
            this.success = undefined;
        },
        fecharErro() {
            this.error = undefined;
        },
        editar() {
            let token = localStorage.getItem("token");
            //console.log(token);
            let axiosConfig = {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;charset=UTF-8',
                    "Access-Control-Allow-Origin": "*",
                } 
            }
            let url = 'http://localhost:8888/users/' + this.id;
            
            axios.put(url, {
                    "name": this.nome, 
                    "email": this.email
            },axiosConfig).then(res => {
                console.log(res);
                this.success = 'Cadastro Atualizado com Sucesso';              
            }).catch(err => {
                //console.log(err.response);
                console.log(err)
                this.error = err.response.data.err;
            });  
        },
        limpar() {
            this.nome =  '';
            this.password = '';
            this.email = '';
        }
    }
}
</script>

<style scoped>

</style>