<template>
    <div class="container">
        <h1>Cadastro de usuarios</h1>
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
            <div class="field">
                <label class="label has-text-left">Senha</label>
                <div class="control">
                    <input class="input" 
                    type="password" 
                    v-model="password"
                    placeholder="Digite a senha do usuario">
                </div>
            </div>
            <div class="field is-grouped">
                <div class="control">
                    <button class="button is-success" @click="cadastrar">Cadastrar</button>
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
    name: 'CadastroUsuario',
    setup() {
        
    },
    data() {
        return {
            nome: '',
            password: '',
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
        cadastrar() {
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

            //console.log( this.nome + ' ' + this.password + ' ' + this.email);
            axios.post('http://localhost:8888/users', {
                    "name": this.nome, 
                    "password" : this.password, 
                    "email": this.email
            },axiosConfig).then(res => {
                console.log(res);
                this.success = 'Cadastro realizado com sucesso';              
            }).catch(err => {
                //console.log(err.response);
                console.log(err)
                this.error = err.data.err;
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