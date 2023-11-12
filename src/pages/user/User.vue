<!-- eslint-disable prettier/prettier -->
<template>
    <div>
        <h3 class="mt-2 ml-2">Users</h3>
        <div class="d-flex align-items-center">
            <!-- Search -->
            <input type="text" class="input-edit mt-3 mb-3 " placeholder="Search user..." v-model="searchText"/>
        </div>
        <div>
            <!-- List-->
            <ul class="list-group ml-2 mr-2">
                <li v-for="item in filteredUsers" :key="item.index"
                    class="list-group-item list-group-item-action d-flex justify-content-between align-items-center mb-2"
                >
                    <div class="d-flex">
                        <p class="mt-2 mr-2 text-darl">{{ item.index }}</p>
                        <p class="mt-2 text-user-name">{{ item.name }}</p>
                        <p class="mt-2 ml-4 text-secondary text-status">
                            Status: <span :class="itemStatusColor(item.index)">{{ item.status }}</span>
                        </p>
                    </div>
                    <div>
                        <button
                            type="button"
                            class="btn btn-primary mr-2"
                            @click="editUser"
                        >
                            Edit
                        </button>
                    </div>
                </li>
            </ul>
        </div>
        <editVue :userName="'User1'"></editVue>
    </div>
</template>

<script>
import editVue from '../../components/modals/edit/edit.vue';
import UserStatus from '../../json/UserStatus.json';
import { AllUsers } from '../../utils/axios';

export default {
    data() {
        return {
            searchText: '',
            UserList: [
                {index: 0, name: 'Slesh', status: 'User'},
                {index: 1, name: 'Abdul', status: 'Musician'},
                {index: 2, name: 'Greka', status: 'Producer'},
                {index: 3, name: 'Romanov', status: 'Blocked'},
                {index: 4, name: 'Breake', status: 'Admin'},
            ]
        }
    },
    methods: {
        editUser() {
            const response = AllUsers(1,1);
            console.log(response);
            editVue.methods.OpenModal();
        },
    },
    components: {
        editVue
    },
    computed: {
        itemStatusColor() {
            return (index) =>{
                const status = this.UserList[index].status;
                return UserStatus[status]
            }
       },
        filteredUsers() {
            const searchText = this.searchText.toLowerCase().trim();
            if (!searchText) {
                return this.UserList;
            } else {
                return this.UserList.filter((item) =>
                item.name.toLowerCase().includes(searchText)
                );
            }
        }
    }
};
</script>

<style src="./user.scss" lang="scss">

</style>
