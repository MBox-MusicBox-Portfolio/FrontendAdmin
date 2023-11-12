import {IUser} from '@/interfaces/user';
import {Component, Prop, Vue} from 'vue-facing-decorator';
import MenuItem from '@/components/menu-item/menu-item.vue';
import {PfImage} from '@profabric/vue-components';
import SidebarSearch from '@/components/sidebar-search/sidebar-search.vue';
import {i18n} from '@/translation';

@Component({
    name: 'app-menu-sidebar',
    components: {
        'app-menu-item': MenuItem,
        'app-sidebar-search': SidebarSearch,
        'pf-image': PfImage
    }
})
export default class MenuSidebar extends Vue {
    menu = MENU;

    get authentication(): IUser {
        return this.$store.getters['auth/authentication'];
    }

    get sidebarSkin() {
        return this.$store.getters['ui/sidebarSkin'];
    }
}


/* Add Sidebar Menu */
export const MENU = [
    {
        name: i18n.global.t('labels.dashboard'),
        path: '/admin/'
    },
];
