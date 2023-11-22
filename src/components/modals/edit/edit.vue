<template>
    <div>
        <form>
            <div class="modal" id="modal-edit">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <img :src="photo" class="img-fluid rounded-circle user-image" alt="Avatar" />
                            <p class="fw-bold user-name ">User: {{ userName }}</p>
                            <p class="fw-bold role">Role:{{ currentRoleName}}</p>
                        </div>
                        <div class="modal-body">
                            <div>
                                <p class="text-edit-label m-0">Roles</p>
                                <select v-model="selected" class="mb-3 mt-1 pl-2 form-select form-select-sm text-muted" aria-label=".form-select-sm example">
                                    <option disabled value="">Select server roles</option>
                                    <option v-for="items in optionValues" :key="items.id" :value="items.name" class="text-dark">
                                         {{items.name}}
                                    </option>
                                </select>
                            </div>
                            <div class="d-flex justify-content-end">
                                <button class="mr-2 btn btn-primary" @click.prevent="Change">Change</button>
                                <button class="btn btn-danger" @click.prevent="CloseModal">Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
import '../../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../../../node_modules/bootstrap/dist/js/bootstrap.esm';
import { Modal } from '../../../../node_modules/bootstrap/dist/js/bootstrap.esm';
//import {useToast} from 'vue-toastification';
import { RolePagination , ChangeRole} from '../../../utils/axios';
import {useToast} from 'vue-toastification';

let modalShow;
let toast = useToast();

export default {
    data() {
       return {
          selected:'',
          optionValues: [],
          selectedKey: null,
       };
    },
    props:{
        photo:"",
        currentRoleName:"",
        userName:"",
        userId:"",
    },
    created() {
        this.loadData();
        console.table(this.optionValues);
    },
    methods: {
        FindRoleId(roleName){
            this.optionValues.forEach(proxyObject => {
            proxyObject.name === roleName ? this.selectedKey = proxyObject.id : null; 
         });
        },
        OpenModal(user) {
            this.modalShow = new Modal(
                document.getElementById('modal-edit'),
            );
            this.modalShow.show();
        },
        CloseModal() {
            this.modalShow.hide();
        },
        async Change(){
            if(this.selected)
            {
               this.FindRoleId(this.selected); 
               let newRole = await ChangeRole(this.userId,this.selectedKey,this.selected); // => Parms:  userId:string, roleId:selectedKey, roleName: selected
               //this.toast.success("Success: "+newRole);
               console.log("Success:" + newRole);
               this.CloseModal();
            }else{
               //this.toast.error("Edit modal :: Change func:: Empty params"); 
               console.error("Edit modal :: Change func:: Empty params");
            }
        },
        async loadData() {
           const response = await RolePagination(1,100);
           this.optionValues = response || []; 
           console.table(this.optionValues);
        }
    }
};
</script>

<style src="./edit.scss"></style>
