import mutations from './mutations';
import actions from './actions';
import getters from './getters';
import * as cookie from '../../utils/cookies';
import {IAuthModule} from '@/interfaces/state';
 
const authModule: IAuthModule = {
    namespaced: true,
    state: {
        authentication: cookie.GetCookie("JWTAdminKey") === false ? undefined : cookie.GetCookie("JWTAdminKey") as string
    },
    mutations,
    actions,
    getters
};

console.log("authModule" + authModule.state.authentication);

export default authModule;
