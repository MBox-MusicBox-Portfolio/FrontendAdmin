<template>
    <div>
        <h3 class="mt-2 ml-2">Group</h3>
        <div class="d-flex align-items-center">
            <!-- Search -->
            <input type="text" class="input-edit mt-3 mb-3 " placeholder="Search group..." v-model="searchText"/>
        </div>
        <div>
            <!-- List-->
            <ul class="list-group ml-2 mr-2">
                <li v-for="item in filteredUsers" :key="item.index"
                    class="list-group-item list-group-item-action d-flex justify-content-between align-items-center mb-2"
                >
                    <div class="d-flex">
                        <p class="mt-2 mr-2">{{ item.index }}</p>
                        <p class="ml-2 mr-2">Group: </p>
                        <img class="img-group" :src="item.group_img">
                        <p class="mt-2 text-user-name">{{ item.name }}</p>
                        <p class="mt-2 ml-4 text-secondary text-status">
                            Status: <span :class="itemStatusColor(item.index)">{{ item.status }}</span>
                        </p>
                        <div class="d-flex">
                            <p class="ml-2 mr-2">Producer: </p>
                            <img class="img-group" :src="item.img_url">
                            <p class="mt-2 mr-2 ">{{ item.producer }}</p>
                        </div>
                    </div>
                    <div>
                        <button
                            type="button"
                            class="btn btn-primary mr-2"
                            @click="OpenGroup(item.group_img)"
                        >
                            Open
                        </button>
                    </div>
                </li>
            </ul>
        </div>
        <OpenModal></OpenModal>
    </div>
</template>

<script>
import GroupStatus from '../../json/GroupStatus.json';
import OpenModal from '../../components/modals/open/open.vue';

export default {
    data() {
        return {
            searchText: '',
            groupList: [
                {index: 0, group_img: 'https://pngimg.com/uploads/kfc/kfc_PNG20.png', name: 'AdminStyleGroup', status: 'Approved', img_url: 'https://mir-s3-cdn-cf.behance.net/project_modules/1400/8bd40410950369.5ad46da3d2dd1.jpg', producer:'Henk'},
                {index: 1, group_img: 'https://logos-download.com/wp-content/uploads/2016/02/BMW_dark_logo.jpg', name: 'Grek1aPrivate', status: 'Pending', img_url: 'https://openclipart.org/image/800px/328181', producer:'Den'},
                {index: 2, group_img: 'https://i.pinimg.com/736x/6d/53/92/6d53922f97204aab280e32ae4f66668b--gorilla-tatto-gorilla-logo.jpg', name: 'TestGroupName', status: 'Blocked', img_url: 'https://image.freepik.com/free-vector/logotype_23-2148155478.jpg', producer:'Tiestov'},
                {index: 3, group_img: 'https://img.freepik.com/premium-photo/instagram-camera-logotype-black-background-3d-illustration_339569-1475.jpg?w=2000', name: 'ChtotoTamTest', status: 'Rejected', img_url: 'http://www.designbolts.com/wp-content/uploads/2018/09/stunning-logotype-examples-2018-19.jpg', producer:'Tester'},
            ]
        }
    },
    components: {
        OpenModal
    },
    methods: {
        OpenGroup(gp_img) {
            OpenModal.data().group.img_url = gp_img;
            OpenModal.methods.OpenModal();
        }
    },
    computed: {
        itemStatusColor() {
            return (index) => {
                const status = this.groupList[index].status;
                return GroupStatus[status]; // Corrected this.GroupStatus to GroupStatus
            };
        },
        filteredUsers() {
            const searchText = this.searchText.toLowerCase().trim();
            if (!searchText) {
                return this.groupList; // Corrected from this.testUser to this.groupList
            } else {
                return this.groupList.filter((item) =>
                    item.name.toLowerCase().includes(searchText)
                );
            }
        }
    }
}
</script>

<style src="./group.scss" lang="scss">

</style>
