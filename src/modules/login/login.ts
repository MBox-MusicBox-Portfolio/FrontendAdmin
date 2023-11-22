import {Component, Vue} from 'vue-facing-decorator';
import { jwtDecode } from 'jwt-decode';
import * as cookies from '../../utils/cookies'
import Input from '@/components/input/input.vue';
import {useToast} from 'vue-toastification';
import ErrorJson from '../../json/ErrorMessage.json'; 
import {PfButton, PfCheckbox} from '@profabric/vue-components';
import {GoogleProvider, facebookLogin} from '@/utils/oidc-providers';
import { Auth } from '@/utils/axios';


@Component({
    components: {
        'app-input': Input,
        'pf-checkbox': PfCheckbox,
        'pf-button': PfButton
    }
})
export default class Login extends Vue {
    private appElement: HTMLElement | null = null;
    public email: string = '';
    public password: string = '';
    public rememberMe: boolean = false;
    public isAuthLoading: boolean = false;
    private toast = useToast();

    public mounted(): void {
        this.appElement = document.getElementById('app') as HTMLElement;
        this.appElement.classList.add('login-page');
    }

    public unmounted(): void {
        (this.appElement as HTMLElement).classList.remove('login-page');
    }

    public async loginByAuth(): Promise<void> {
        try {
            this.isAuthLoading = true;
            const response = await Auth(this.email, this.password);
            if(await this.checkUserRole(response.data.token) === true){
                cookies.SetCookie("JWTAdminKey", response.data.token); 
                this.toast.success(ErrorJson.AuthMessage.LoginSucceded) 
                this.$store.dispatch('auth/setAuthentication', response.data.token);
                this.isAuthLoading = false;
                this.$router.replace('/admin/');
            }else{
                this.toast.error(ErrorJson.AuthMessage.DeniedAction);
                this.isAuthLoading = false;
                this.$router.replace('/admin/login')
            }
        } catch (error: any) {
            this.toast.error(error.message);
            this.isAuthLoading = false;
        }
    }

    /**
     * Проверяет роль вошедшего пользователя 
     * @param token 
     * @returns true or false 
     */
 public async checkUserRole(token: string): Promise<boolean> {
    try {
      if (token) {
        const decode = JSON.parse(JSON.stringify(await jwtDecode(token)));
        return (decode.Role === "admin" || decode.Role === "super_admin") ? true : false;
      } else {
          this.toast.error("Login modules ::: CheckUserRole methods :" + `${ErrorJson.ErrorWebApplication.NullableArgumentType}`);
      }
     } catch (error) {
          this.toast.error("Login modules ::: CheckUserRole methods :" + `${error}`);
        }
    }
}
