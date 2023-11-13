import {Component, Vue} from 'vue-facing-decorator';
import { jwtDecode } from 'jwt-decode';
import * as cookies from '../../utils/cookies'
import Input from '@/components/input/input.vue';
import authModule from '@/store/auth';
import {useToast} from 'vue-toastification';
import {PfButton, PfCheckbox} from '@profabric/vue-components';
import {GoogleProvider, authLogin, facebookLogin} from '@/utils/oidc-providers';
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
    public isFacebookLoading: boolean = false;
    public isGoogleLoading: boolean = false;
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
                this.toast.success("Login succeeded!") 
                this.$store.dispatch('auth/setAuthentication', response.data.token);
                this.isAuthLoading = false;
                this.$router.replace('/admin/');
            }else{
                this.toast.error("Action denied! Your server role must be higher than user!")
                this.isAuthLoading = false;
                this.$router.replace('/admin/login')
            }
        } catch (error: any) {
            this.toast.error(error.message);
            this.isAuthLoading = false;
        }
    }

    public async loginByFacebook(): Promise<void> {
        try {
            this.isFacebookLoading = true;
            const response = await facebookLogin();
            this.$store.dispatch('auth/setAuthentication', response);
            this.toast.success('Login succeeded');
            this.isFacebookLoading = false;
            this.$router.replace('/');
        } catch (error: any) {
            this.toast.error(error.message);
            this.isFacebookLoading = false;
        }
    }
    
    public async loginByGoogle(): Promise<void> {
        try {
            this.isGoogleLoading = true;
            const response = await GoogleProvider.signinPopup();
            this.$store.dispatch('auth/setAuthentication', response);
            this.toast.success('Login succeeded');
            this.isGoogleLoading = false;
            this.$router.replace('/');
        } catch (error: any) {
            this.toast.error(error.message);
            this.isGoogleLoading = false;
        }
    }
    /**
     * Проверяет роль вошедшего пользователя 
     * @param token 
     * @returns true or false 
     */
    public async checkUserRole(token: string): Promise<boolean> {
        try {
          if (token !== null && token !== undefined) {
            const decode = JSON.parse(JSON.stringify(await jwtDecode(token)));
              if(decode.Role === "admin"){
                 return true
              } else{
                 return false; 
              }
          } else {
            console.error("Login modules ::: checkUserRole function : Empty params");
          }
        } catch (error) {
           console.error("Login modules ::: checkUserRole function :", error);
        }
      }
}
