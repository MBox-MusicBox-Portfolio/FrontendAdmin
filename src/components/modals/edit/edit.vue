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
                                    <option v-for="items in optionValues" :value="items.id" class="text-dark">
                                         {{ items.name }}
                                    </option>
                                </select>
                            </div>
                            <div class="d-flex justify-content-end">
                                <button class="mr-2 btn btn-primary" @click="Change">Change</button>
                                <button class="btn btn-danger">Cancel</button>
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
import { RolePagination } from '../../../utils/axios';
let modalShow;
export default {
    data() {
       return {
          selected: '',
          optionValues: []
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
    },
    methods: {
        OpenModal() {
            this.modalShow = new Modal(
                document.getElementById('modal-edit'),
            );
            this.modalShow.show();
            console.log(this.modalShow);
        },
        CloseModal() {
            this.modalShow.hide();
        },
        Change(){
          if(this.selected)
          {
             //const a 

          }else{
                
          }
        },
        async loadData() {
           const response = await RolePagination(1,100);
           this.optionValues = response.value || []
        }
    }
};
</script>

<style src="./edit.scss"></style>
